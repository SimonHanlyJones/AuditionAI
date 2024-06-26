import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { compareTwoStrings } from "string-similarity";

import { SceneScriptInfo } from "@/screens/scenes";
import JSON5 from "json5";

/**
 * Calls the 'Hello World' test function in Firebase Functions and retrieves the response message.
 * Useful for testing the Firebase infrastructure in a way that is decoupled from the Gemini API
 *
 * @return {Promise<string>} The response message from the 'Hello World' function.
 */
export async function callHelloWorldFunction() {
  const response = await fetch("https://helloworld-7dxvm6ugja-uc.a.run.app", {
    headers: {
      Authorization: "duckduck",
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const message = await response.text();
  console.log(message);
  return message;
}
/**
 * Function to get a pdf or txt file from the file system.
 *
 * PDF files are converted to text using an API call to the Firebase function "pdfToText".
 *
 * Text files are returned as is.
 * @return {Promise<any>}
 */
export const getScriptAndConvert = async () => {
  let result = await DocumentPicker.getDocumentAsync({
    type: ["application/pdf", "text/plain"], // Allow both PDF and text files
  });

  if (
    result &&
    result.canceled === false &&
    result.assets &&
    result.assets.length > 0
  ) {
    console.log(result.assets[0].uri);
    // Determine the file type and call the appropriate function
    const fileType = result.assets[0].mimeType;
    let results;
    if (fileType === "application/pdf") {
      results = await uploadPdfForExtraction(result.assets[0].uri);
    } else if (fileType === "text/plain") {
      const fileUri = result.assets[0].uri;
      let fileContent = await FileSystem.readAsStringAsync(fileUri);
      // Replace square brackets with round brackets
      fileContent = fileContent.replace(/\[/g, "(").replace(/\]/g, ")");

      results = fileContent;
    }
    return results;
  }
};

/**
 * Asynchronously uploads a PDF for extraction and returns the extracted text data.
 *
 * @param {string} pdfUri - The URI of the PDF to be uploaded for extraction
 * @return {Promise<string>} The extracted text data from the PDF
 */
async function uploadPdfForExtraction(pdfUri: string) {
  try {
    const response = await fetch(pdfUri);
    const blob = await response.blob();

    // Emulator URL
    // const url = 'http://127.0.0.1:5001/audition-a-i-ak9x5l/us-central1/getScriptAndConvert';

    // Firebase URL
    const url = "https://getscriptandconvert-7dxvm6ugja-uc.a.run.app";

    const binaryResponse = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "duckduck", // Your auth token or method
        "Content-Type": "application/pdf",
      },
      body: blob,
    });

    if (binaryResponse.ok) {
      const textData = await binaryResponse.json();
      console.log("Extracted text:", textData.text);
      return textData.text;
    } else {
      console.error("Failed to extract text:", binaryResponse.statusText);
    }
  } catch (error) {
    console.error("Error sending PDF:", error);
  }
}

/**
 * Performs an asynchronous API call to the Firebase Function backend, which is a wrapper for the Gemini service
 * to generate content based on a given script and prompt.
 *
 * This is a helper function to call the Gemini service, and is intended for use in other functions which are exported for use.
 *
 * @param {string} script - The script input for the Gemini service.
 * @param {string} prompt - The prompt input for the Gemini service.
 * @return {string} The generated content based on the script and prompt.
 */
let controller = new AbortController();

export function abortGemini() {
  controller.abort();
}

async function callGemini(script: string, prompt: string) {
  // url for local function emulation
  // const url = `http://127.0.0.1:5001/audition-a-i-ak9x5l/us-central1/callGemini`;
  const url = `https://callgemini-7dxvm6ugja-uc.a.run.app`;

  controller = new AbortController(); // Create a new controller for the new request

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "duckduck",
      },
      body: JSON.stringify({ prompt: prompt, script: script }),
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error("API call failed:", response.statusText);
      throw new Error(`API call failed: ${response.statusText}`);
    }
    const data = await response.json();

    // Check for meaningful AI output
    if (
      !data.candidates ||
      data.candidates.length === 0 ||
      !data.candidates[0].content ||
      !data.candidates[0].content.parts ||
      data.candidates[0].content.parts.length === 0 ||
      !data.candidates[0].content.parts[0].text
    ) {
      if (data.candidates[0].finishReason === "RECITATION") {
        throw new Error("RECITATION_ERROR");
      }
      console.error("No meaningful AI output found: ", data);
      throw new Error("No meaningful AI output found.");
    }

    // If there is meaningful AI output, extract it
    const content = data.candidates[0].content.parts[0].text;

    return content;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Fetch request was aborted by the client.");
      return undefined; // Optionally handle aborted state differently in your app
    }
    console.error("Error during API call:", error);
    throw error;
  }
}
/**
 * Retrieves the title and characters from a script using the callGemini API via the Firebase Function instance and parsing the response into JSON.
 *
 * @param {string} script - The script to analyze and extract title and characters from.
 * @return {Promise<object>} A promise that resolves to an object with the title and characters extracted from the script.
 */
export async function getTitleAndCharacters(script: string) {
  const prompt = `Read the following script, determine its title and the characters in the script and give me a json object in this format with no explanation:
  {
      "title": string,
      "characters": [string]
  } 
  Ensure that characters are listed only once even if they are called different things in the script, use the name for a character which is most commonly used within the script. Ensure that the titles and characters have normal formatting and case.
  
  SCRIPT:`;

  console.log("PROMPT:", prompt);
  console.log("script length:", script.length);
  console.log("title and characters request sent");
  const response = await callGemini(script, prompt);
  if (!response) {
    return undefined;
  }
  console.log("get title and characters response:", response);
  return await parseJSONString(response);
}

/**
 * Retrieves an analysis of a character from a script by sending a prompt to a Gemini API via our Firebase Functions and parsing the response into JSON.
 *
 * @param {string} script - The script content to analyze.
 * @param {string} characterName - The name of the character to analyze.
 * @return {Promise<any>} A Promise that resolves to a JSON object containing insights about the character based on the script content.
 */

export async function getCharacterAnalysis(
  script: string,
  characterName: string
) {
  const prompt = `You are my acting coach. I am cast to play ${characterName} in the script attached. I want a full breakdown of this character, derived exclusively from the script provided. Your goal is to provide me every insight I need to bring ${characterName} with emotional honesty and integrity. I can only do this if you provide insight into ${characterName} and explain them in detail. Please analyze the script and give me a JSON object with the following headings:
  
  2. **Personality Traits**: Based on the script, list the key personality traits of ${characterName}, include a description of how each of these traits influence their behavior in the story.
  
  3. **Physical Traits**: Describe ${characterName}'s physical appearance and attributes as depicted in the script. Include any notable features that are crucial to portraying the character effectively.
  
  4. **Costume Choices**: Suggest appropriate costume choices for ${characterName} that reflect their personality, era, and role in the story, as per the script. Mention any specific wardrobe items that are significant to the character's identity.
  
  5. **Main Relationships**: Enumerate ${characterName}'s main relationships with other characters in the script. Explain how these relationships evolve throughout the story and their impact on ${characterName}.
  
  6. **Emotional/Character Arc**: Outline the emotional or character arc of ${characterName} as described in the script. Detail the key developments and transformations the character undergoes, and how these changes are pivotal to the narrative.
  
  7. **Important Scenes**: Identify and explain the scenes from the script where ${characterName} experiences significant change or development. Describe the context of these scenes and how they contribute to the character's arc. Explore the nuance of the scenes and ${characterName}'s perspective in detail, deliver as much insight as possible to your actor.
  
  8. **Scene Appearances**: An ordered list every scene from the script in which ${characterName} appears, provide a number that corresponds to the order in which the scene appears and a brief description of each scene to enable the actor to identify it. Make sure that the description is not a technical title, but an informal/informative summary of the scene.

  9. **Other insights**: Provide any additional insights or background information that can enhance my performance.
  
  The JSON object should be structured as follows:
  
  {
    "characterOverview": "string",
    "personalityTraits": [
      {
        "trait": "string",
        "description": "string"
      }
    ],
    "physicalTraits": [
      {
        "trait": "string",
        "description": "string"
      }
    ],
    "costumeChoices": "string",
    "mainRelationships": [
      {
        "name": "string",
        "relationship": "string",
        "description": "string"
      }
    ],
    "emotionalCharacterArc": "string",
    "importantScenes": [
      {
        "scene": "string",
        "description": "string"
      }
    ],
    "sceneAppearances": [
      {
        "number": int,
        "scene": "string"
      }
    ],
    "otherInsights": "string"
  }
  
  Please provide the analysis with no additional explanation, ensuring all insights are derived from the script content I have attached. Provide valid JSON in the format above do not add and fields or add any text that is not valid JSON.
  
  SCRIPT:
  `;
  console.log("PROMPT:", prompt);
  console.log("script length:", script.length);

  console.log("analysis request sent, waiting for response");
  var response = await callGemini(script, prompt);
  if (!response) {
    return undefined;
  }

  console.log("response received, parsing JSON");
  // response = await fixJSONGeminiCall(response)
  // console.log("parsed JSON: ", response)
  return await parseJSONString(response);
}

/**
 * Asynchronously calls the Gemini API via our Firebase Functions to validate and fix the provided JSON string, then returns the corrected JSON.
 *
 * @param {string} json - The JSON string to be validated and fixed.
 * @return {Promise<string>} The corrected JSON string.
 */
export async function fixJSONGeminiCall(json: string) {
  const prompt = `Validate and fix the following JSON string, return only the corrected JSON and no additional characters: `;
  const response = await callGemini(json, prompt);
  console.log("fix json result: ", response);
  return response;
}

function cleanJsonString(jsonString: string) {
  // Replace single quotes with double quotes
  jsonString = jsonString.replace(/'/g, '"');

  // Remove trailing commas
  jsonString = jsonString.replace(/,\s*}/g, "}");
  jsonString = jsonString.replace(/,\s*]/g, "]");

  // Add any additional clean up rules here

  return jsonString;
}

function preprocessAIGeneratedJSON(output: string) {
  // Escape special characters and fix common JSON string issues
  const cleanedOutput = output.replace(/\\([\s\S])|(")/g, "\\$1$2");
  return cleanedOutput;
}

/**
 * Asynchronously parses a JSON string after trimming, and handles any errors by throwing an "Invalid JSON string" error.
 *
 * @param {string} jsonString - The JSON string to be parsed
 * @return {Promise<any>} A promise that resolves to the parsed JSON object
 */
async function parseJSONString(jsonString: string) {
  try {
    let string = await trimJSONString(jsonString);
    string = preprocessAIGeneratedJSON(string);

    return JSON5.parse(string);
  } catch (error) {
    try {
      const fixedJsonString = await fixJSONGeminiCall(jsonString);
      const retrimmedJsonString = await trimJSONString(fixedJsonString);
      // const recleanedJsonString = cleanJsonString(retrimmedJsonString);
      return JSON5.parse(retrimmedJsonString); // Attempt to parse the corrected JSON
    } catch (innerError) {
      // If parsing the corrected JSON also fails, throw an error
      throw new Error(
        "JSON parsing failed after attempting to fix: " + innerError
      );
    }
  }
}
/**
 * Trims the input JSON string, removing any leading or trailing characters that are not part of the JSON object.
 *
 * @param {string} jsonString - The input JSON string to be trimmed.
 * @return {string} The trimmed JSON string.
 */
async function trimJSONString(jsonString: string) {
  const cleanedJsonString = jsonString
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  const startIndex = cleanedJsonString.indexOf("{");
  const endIndex = cleanedJsonString.lastIndexOf("}");

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("Cannot find JSON start and end markers");
  }

  return cleanedJsonString.substring(startIndex, endIndex + 1);
}

async function parseSceneOutput(jsonString: string) {
  try {
    let string = JSON5.parse(jsonString);
    string = { dialogue: string };

    return string;
  } catch (error) {
    throw new Error("JSON parsing failed after attempting to fix: " + error);
  }
}

export async function getSceneText(
  script: string,
  sceneDescription: string,
  sceneNumber: number,
  userCharacter: string
): Promise<SceneScriptInfo | undefined> {
  const prompt = `Your job is to read the script set out below, identify the scene that matches this description: 
  
  ${sceneDescription} where the character "${userCharacter}" appears.

  You must parse the full text of this scene into a JSON object with the following headings:
  [
      {
        "character": "string",
        "text": "string",
        "gender": "string"
      }
  ]
  
  
  Provide the related dialog for each character until that scene is complete, and any stage directions as a separate character named 'STAGE DIRECTIONS'. Identify the gender of the character as 'MALE', 'FEMALE' or 'UNKNOWN' with no deviation. Provide this with no additional explanation. Ensure character names are consistent throughout without added words or explanations and that one character is named ${userCharacter}. Start and end the scene in the proper place. Provide valid list of JSON in the format above.
  
  SCRIPT:
  `;
  console.log("PROMPT:", prompt);
  console.log("script length:", script.length);

  console.log("Scene script request sent, waiting for response");
  var response = await callGemini(script, prompt);
  if (response === undefined) {
    return undefined;
  }
  console.log("response received, attempting to parse JSON");
  console.log("response: ", response);

  response = await parseSceneOutput(response);
  console.log("parsed JSON");

  if (!response.dialogue) {
    console.error("Dialog missing from response", response);
  }

  // make sure the user character is in the script
  if (!checkForUserCharacter(response, userCharacter)) {
    console.log("User character not found in scene script, trying to force it");
    response = getCorrectUserCharacter(response, userCharacter);
  }
  // Throw error if no user character found
  if (!checkForUserCharacter(response, userCharacter)) {
    console.error("User character not found in scene script", response);
  }

  return response;
}

function checkForUserCharacter(
  sceneScript: SceneScriptInfo,
  userCharacter: string
): boolean {
  for (let line of sceneScript.dialogue) {
    if (line.character.toUpperCase() === userCharacter.toUpperCase()) {
      console.log("user character match");
      return true;
    }
  }
  console.log("no user character match");

  return false;
}

export function getCorrectUserCharacter(
  sceneScript: SceneScriptInfo,
  userCharacter: string
): SceneScriptInfo {
  const characters = [
    ...new Set(
      sceneScript.dialogue.map((line) => line.character.toLocaleUpperCase())
    ),
  ];
  const stringDeltas = characters.map((character) =>
    compareTwoStrings(character, userCharacter.toLocaleUpperCase())
  );

  const bestMatchIndex = stringDeltas.indexOf(Math.max(...stringDeltas));
  const bestMatch = characters[bestMatchIndex];

  console.log("user character", userCharacter);
  console.log("best match", bestMatch);

  return {
    dialogue: sceneScript.dialogue.map((line) => {
      return {
        ...line,
        character:
          line.character === bestMatch ? userCharacter : line.character,
      };
    }),
  };
}
