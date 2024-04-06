const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const apiKey = "AIzaSyAY2iA--u10hRUQQbfruy0iKdyoj-hgp-Q";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// ...

const model = genAI.getGenerativeModel({ model: "MODEL_NAME"});

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

async function getPdfText(pdfPath) {
    const doc = await pdfjsLib.getDocument(pdfPath).promise;
    let finalText = '';

    for (let pageNum = 1; pageNum <= doc.numPages; pageNum++) {
        const page = await doc.getPage(pageNum);
        const textContent = await page.getTextContent();
        const textItems = textContent.items.map(item => item.str).join(' ');
        finalText += `${textItems}\n`;
    }
    console.log(finalText);

    return finalText;
}