import * as logger from "firebase-functions/logger";
const functions = require("firebase-functions/v2");

const googleVoiceApiKey = functions.params.defineSecret("GOOGLE_VOICE_API_KEY");

interface ValidVoices {
  [key: string]: string;
}
function validateVoice(voice: string, gender: string): boolean {
  const validVoices: ValidVoices = {
    "en-US-Casual-K": "MALE",
    "en-US-Journey-D": "MALE",
    "en-US-Journey-F": "FEMALE",
    "en-US-Neural2-A": "MALE",
    "en-US-Neural2-C": "FEMALE",
    "en-US-Neural2-D": "MALE",
    "en-US-Neural2-E": "FEMALE",
    "en-US-Neural2-F": "FEMALE",
    "en-US-Neural2-G": "FEMALE",
    "en-US-Neural2-H": "FEMALE",
    "en-US-Neural2-I": "MALE",
    "en-US-Neural2-J": "MALE",
    "en-GB-Neural2-A": "FEMALE",
    "en-GB-Neural2-B": "MALE",
    "en-GB-Neural2-C": "FEMALE",
    "en-GB-Neural2-D": "MALE",
    "en-AU-Neural2-A": "FEMALE",
    "en-AU-Neural2-B": "MALE",
    "en-AU-Neural2-C": "FEMALE",
    "en-AU-Neural2-D": "MALE",
  };

  return validVoices[voice] === gender;
}

// interface VoiceRequest {
//     text: string;
//     voiceName: string;
//     gender: 'MALE' | 'FEMALE' | 'UNKNOWN';
//   }

function validateVoiceRequest(request: any): boolean {
  return (
    request &&
    typeof request.text === "string" &&
    typeof request.voiceName === "string" &&
    ["MALE", "FEMALE", "UNKNOWN"].includes(request.gender)
  );
}

export const callVoiceAPI = functions.https.onRequest(
  { timeoutSeconds: 500, secrets: [googleVoiceApiKey] },
  async (request: any, response: any) => {
    if (
      !request.body.text ||
      !request.body.voiceName ||
      !request.body.gender ||
      !validateVoiceRequest(request.body)
    ) {
      response.status(400).send("Missing parameters");
      return;
    } else if (!validateVoice(request.body.voiceName, request.body.gender)) {
      response.status(400).send("Invalid voice");
      return;
    } else if (request.headers.authorization != "duckduck") {
      response.status(400).send("Unauthorized");
      return;
    } else if (request.method === "POST") {
      try {
        const aiResponse = await synthesizeText(
          request.body.text,
          request.body.voiceName,
          request.body.gender
        );
        if (aiResponse.success) {
          response.status(200).send(aiResponse);
        } else {
          response.status(500).send(aiResponse);
        }
      } catch (error) {
        // Log the error and send a generic error message to the user
        logger.error("Failed to handle Voice API request:", error);
        response.status(500).send({
          error: "There was a problem processing your request: " + error,
        });
      }
    } else {
      response.status(401).send("Unauthorized");
    }
  }
);
async function synthesizeText(text: string, voiceName: string, gender: string) {
  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${googleVoiceApiKey.value()}`;

  const requestBody = {
    input: { text: text },
    voice: {
      languageCode: voiceName.slice(0, 5),
      name: voiceName,
      ssmlGender: gender,
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Assume responseData.audioContent contains the base64-encoded audio
      return {
        success: true,
        audioContent: responseData.audioContent,
        message: "Audio successfully synthesized",
      };
    } else {
      return {
        success: false,
        message: `API request failed with status ${response.status}: ${responseData.error.message}`,
      };
    }
  } catch (error) {
    console.error("Error during API call:", error);
    return {
      success: false,
      message: "Failed to call Text to Speech API: " + error,
    };
  }
}
