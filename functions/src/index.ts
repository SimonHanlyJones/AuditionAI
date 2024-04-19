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

import { getScriptAndConvert } from './pdfFunctions';
export { getScriptAndConvert };

import { callGemini } from './geminiFunctions';
export { callGemini };


import { callVoiceAPI } from './voiceGenFunctions';
export { callVoiceAPI };


// https://firebase.google.com/docs/functions/typescript

// Define the secret
const googleGeminiApiKey = functions.params.defineSecret('GOOGLE_GEMINI_API_KEY');
const googleVoiceApiKey = functions.params.defineSecret('GOOGLE_VOICE_API_KEY');

exports.helloWorld = functions.https.onRequest({ secrets: [googleGeminiApiKey, googleVoiceApiKey]},(request: any, response: any) => {
    
    if (request.headers.authorization === "duckduck") {
        var res = ''
        if (googleGeminiApiKey.value()) {
            const genApiKey = googleGeminiApiKey.value()
            if (genApiKey) logger.info("API loaded");
            res = res + "genAPIKey loaded "
        }

        if (googleVoiceApiKey.value()) {
            const voiceApiKey = googleVoiceApiKey.value()
            if (voiceApiKey) logger.info("API loaded");
            res = res + "voiceAPIKey loaded "
        }
        
        // const apiKey = googleGeminiApiKey.value(); // Access the secret value
        // Use the API key as needed, but don't log or expose it
        res = res + "Hello from Firebase!"
        logger.info("Hello logs", {structuredData: true});
        response.send(res);
    } else {
        response.status(401).send("Unauthorized");
    }
});


