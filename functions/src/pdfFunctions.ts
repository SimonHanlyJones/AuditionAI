import * as logger from "firebase-functions/logger";
const functions = require('firebase-functions/v2');

const PDFParser = require('pdf2json');

export const getScriptAndConvert = functions.https.onRequest(async (request: any, response: any) => {
    if (request.headers.authorization === "duckduck") {
        try {

            const pdfParser = new PDFParser();

            pdfParser.on("pdfParser_dataError", (err: Error) => {
                console.error(err);
                response.status(500).send(`Failed to extract text from PDF : ${err.message}`);
            });

            pdfParser.on("pdfParser_dataReady", (pdfData: any) => {
                
                    const textContent = pdfData.Pages.map((page: any) => {
                        return page.Texts.map((text: any) => {
                            return text.R.map((char: any) => char.T).join('');
                        }).join('');
                    }).join('\n');
                
                    const jsonData = {
                        text: decodeURIComponent(textContent)
                    };
                
                    response.send(JSON.stringify(jsonData, null, 2));
                    logger.log('Conversion successful!');
                });
            

            const pdfBuffer = new Uint8Array(request.body);
            pdfParser.parseBuffer(pdfBuffer);
        } catch (error: any) {
            logger.error(error);
            response.status(500).send(`Failed to extract text from PDF: ${error.message}`);
        }
    } else {
        response.status(401).send("Unauthorized");
    }
});
