/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
const functions = require('firebase-functions/v2');



const PDFParser = require('pdf2json');

// https://firebase.google.com/docs/functions/typescript

// Define the secret
const googleGeminiApiKey = functions.params.defineSecret('GOOGLE_GEMINI_API_KEY');

exports.helloWorld = functions.https.onRequest({ secrets: [googleGeminiApiKey]},(request: any, response: any) => {
    
    if (request.headers.authorization === "duckduck") {
        if (googleGeminiApiKey.value()) {
            const genApiKey = googleGeminiApiKey.value()
            if (genApiKey) logger.info("API loaded");
        }

        // const apiKey = googleGeminiApiKey.value(); // Access the secret value
        // Use the API key as needed, but don't log or expose it
        logger.info("Hello logs", {structuredData: true});
        response.send("Hello from Firebase! The API Key is secured.");
    } else {
        response.status(401).send("Unauthorized");
    }
});




export const getScriptAndConvert = functions.https.onRequest(async (request: any, response: any) => {
    if (request.headers.authorization === "duckduck") {
        try {

            const pdfParser = new PDFParser();

            pdfParser.on("pdfParser_dataError", (err: Error) => {
                console.error(err);
                response.status(500).send(`Failed to extract text from PDF: ${err.message}`);
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
                    console.log('Conversion successful!');
                });
            

            const pdfBuffer = new Uint8Array(request.body);
            pdfParser.parseBuffer(pdfBuffer);
        } catch (error: any) {
            console.error(error);
            response.status(500).send(`Failed to extract text from PDF: ${error.message}`);
        }
    } else {
        response.status(401).send("Unauthorized");
    }
});

// Gemini Helper functions
async function generateContent(contents: any) {
    // const model = "gemini-pro"
    const model = "gemini-1.5-pro-latest"
    

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${googleGeminiApiKey.value()}`;

    logger.info("url", url);
    logger.info("contents", contents);
    const safetySettings = await packSafetySettings();
    
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            contents: contents, 
            safetySettings: safetySettings
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error during API call:', error);
      throw error;
    }
  }

async function sendOneShotAPIRequest(prompt: string, script: string) {
    try {
        const oneShotContents = await packPrompt(prompt, script);
        const response = await generateContent(oneShotContents);
        return response;
    } catch (error) {
        console.error('Error in sendOneShotAPIRequest:', error);
        throw error;
    }
}

async function packPrompt(prompt: string, script: string) {
    const oneShotContents = [
        {"parts": [{"text": prompt + script}]}
    ];
    return oneShotContents;
}

async function packSafetySettings() {
    const safetySettings = [
        {
          "category": "HARM_CATEGORY_HARASSMENT",
          "threshold": "BLOCK_NONE"
        },
        {
          "category": "HARM_CATEGORY_HATE_SPEECH",
          "threshold": "BLOCK_NONE"
        },
        {
          "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          "threshold": "BLOCK_NONE"
        },
        {
          "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
          "threshold": "BLOCK_NONE"
        }
      ];
      return safetySettings;
    };

export const getTitleAndCharacters = functions.https.onRequest({ secrets: [googleGeminiApiKey]}, async (request: any, response: any) => {

        // console.info("This is a info message.");
        // console.warn("This is an warn message.");
        if (request.method === "POST" && request.headers.authorization === "duckduck") {
            const prompt = request.body.prompt;
            const script = request.body.script;
            
            const aiResponse = await sendOneShotAPIRequest(prompt, script)
            response.send(aiResponse);
        } else {
            response.status(401).send("Unauthorized");
        }
    });


export const callGemini = functions.https.onRequest({ timeoutSeconds: 500, secrets: [googleGeminiApiKey]}, async (request: any, response: any) => {

    if (request.method === "POST" && request.headers.authorization === "duckduck") {
        const prompt = request.body.prompt;
        const script = request.body.script;
        
        const aiResponse = await sendOneShotAPIRequest(prompt, script)
        response.send(aiResponse);
    } else {
        response.status(401).send("Unauthorized");
    }
});