import * as logger from "firebase-functions/logger";
const functions = require('firebase-functions/v2');

const googleGeminiApiKey = functions.params.defineSecret('GOOGLE_GEMINI_API_KEY');

async function generateContent(prompt: string, script: string) {

    const contents = {"parts": [{"text": prompt + script}]}
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
            safetySettings: safetySettings,
            generationConfig: {
                response_mime_type: "application/json",
              },
        }),
      });
  
      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
        logger.error('Error during API call:', error);
        throw error;
    }
  }

  export const callGemini = functions.https.onRequest({ timeoutSeconds: 500, secrets: [googleGeminiApiKey]}, async (request: any, response: any) => {
    if (request.method === "POST" && request.headers.authorization === "duckduck") {
        try {
            const prompt = request.body.prompt;
            const script = request.body.script;
            const aiResponse = await generateContent(prompt, script);
            response.send(aiResponse);
        } catch (error) {
            // Log the error and send a generic error message to the user
            logger.error('Failed to handle Gemini API request:', error);
            response.status(500).send({
                error: "There was a problem processing your request: " + error
            });
        }
    } else {
        response.status(401).send("Unauthorized");
    }
});

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
