import * as DocumentPicker from 'expo-document-picker';

import * as FileSystem from 'expo-file-system';



/**
 * Calls the 'Hello World' test function in Firebase Functions function and retrieves the response message.
 *
 * @return {Promise<string>} The response message from the 'Hello World' function.
 */
export async function callHelloWorldFunction() {
    const response = await fetch('https://helloworld-7dxvm6ugja-uc.a.run.app', {
        headers: {
            'Authorization': 'duckduck',
        }
    });
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const message = await response.text();
    console.log(message);
    return message;
  }
  export const getScriptAndConvert = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'text/plain'], // Allow both PDF and text files
    });
    
    if (result && result.canceled === false && result.assets && result.assets.length > 0) {
      console.log(result.assets[0].uri);
      // Determine the file type and call the appropriate function
      const fileType = result.assets[0].mimeType;
      let results;
      if (fileType === 'application/pdf') {
        results = await uploadPdfForExtraction(result.assets[0].uri);
      } else if (fileType === 'text/plain') {
        const fileUri = result.assets[0].uri;
        const fileContent = await FileSystem.readAsStringAsync(fileUri);
        results = fileContent; 
      }
      return results;
    }
};


export async function uploadPdfForExtraction(pdfUri: string) {
    try {
      const response = await fetch(pdfUri);
      const blob = await response.blob();
      
      const binaryResponse = await fetch('https://extractpdftext-7dxvm6ugja-uc.a.run.app'
      , {
        method: 'POST',
        headers: {
          'Authorization': 'duckduck', // Your auth token or method
          'Content-Type': 'application/pdf',
        },
        body: blob,
      });
  
      if (binaryResponse.ok) {
        const textData = await binaryResponse.json();
        console.log('Extracted text:', textData.text);
        return textData.text;
      } else {
        console.error('Failed to extract text:', binaryResponse.statusText);
      }
    } catch (error) {
      console.error('Error sending PDF:', error);
    }
  }


async function callGemini(script : string, prompt : string) {
  // url for local funciton emulation
  // const url = `http://127.0.0.1:5001/audition-a-i-ak9x5l/us-central1/callGemini`;
  
  const url = `https://callgemini-7dxvm6ugja-uc.a.run.app`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authorization' : 'duckduck'
      },
      body: JSON.stringify({ 'prompt': prompt , 'script': script}),
    });
  
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`);
    }
  
    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error during API call:', error);
    throw error;
  }

};
export async function getTitleAndCharacters(script: string) {
  const prompt = `Read the following script, determine its title and the characters in the script and give me a json object in this format {"title": ..., "characters": [...]} with no explanation. The script is: `
  const response = await callGemini(script, prompt)
  console.log("get title and characters", response)
  return await parseJSONString(response);
}

export async function getAnalysis(script: string, characterName: string) {
  const prompt = `You are my acting coach. I am cast to play ${characterName} in the script attached. I want a full breakdown of this character, derived exclusively from the script provided. Your goal is to provide me every insight I need to bring ${characterName} with emotional honesty and inegrity. I can only do this if you provide insight into ${characterName} and explain them in detail. Please analyze the script and give me a JSON object with the following headings:
  1. **Character Overview**: Provide an overview of ${characterName} as depicted in the script. Include any notable features that facilitate an understanding of their identity and their purpose in the narrative.

  2. **Personality Traits**: Based on the script, list the key personality traits of ${characterName}, include a description of how each of these traits influence their behavior in the story.
  
  3. **Physical Traits**: Describe ${characterName}'s physical appearance and attributes as depicted in the script. Include any notable features that are crucial to portraying the character effectively.
  
  4. **Costume Choices**: Suggest appropriate costume choices for ${characterName} that reflect their personality, era, and role in the story, as per the script. Mention any specific wardrobe items that are significant to the character's identity.
  
  5. **Main Relationships**: Enumerate ${characterName}'s main relationships with other characters in the script. Explain how these relationships evolve throughout the story and their impact on ${characterName}.
  
  6. **Emotional/Character Arc**: Outline the emotional or character arc of ${characterName} as described in the script. Detail the key developments and transformations the character undergoes, and how these changes are pivotal to the narrative.
  
  7. **Important Scenes**: Identify and explain the scenes from the script where ${characterName} experiences significant change or development. Describe the context of these scenes and how they contribute to the character's arc. Explore the nuance of the scenes and ${characterName}'s perspective in detail, deliver as much insight as possible to your actor.
  
  8. **Scene Appearances**: An ordered list every scene from the script in which ${characterName} appears, provide a number that corresponds to the order in which the scene appears and a brief description of each scene to enable the actor to understand the context of the scene me to idenify it.

  9. **Other insights**: Provide any additional insights or background information that can enchance my performance.
  
  The JSON object should be structured as follows:
  
  {
      "CharacterOverview:": ...,
      "PersonalityTraits": [{Trait: ..., Description: ...}],
      "PhysicalTraits": ...,
      "CostumeChoices": ...,
      "MainRelationships": [{"Name": ...}, {"Relationship": ...}, {"Description": ...}],
      "EmotionalCharacterArc": ...,
      "ImportantScenes": [{"Scene": ..., "Description": ...}],
      "SceneAppearances": [{"Number": ...,"Scene": ...}],
      "Otherinsights": ...
  }
  
  Please provide the analysis with no additional explanation, ensuring all insights are derived from the script content I have attached. Provide valid JSON in the format above.`;

  console.log("analysis sent, waiting for response")
  var response = await callGemini(script, prompt)
  console.log("response recived, parsing JSON")
  response = await fixJSONGeminiCall(response)
  console.log("parsed JSON: ", response)
  return await parseJSONString(response);
}

export async function fixJSONGeminiCall(json: string) {
  const prompt = `Validate and fix the following JSON string, return only the corrected JSON and no additional characters: `
  const response = await callGemini(json, prompt)
  console.log("fix json result: ", response)
  return response
}

async function parseJSONString(jsonString: string) {
  try {
    // console.log("raw string", jsonString)
    const trimmedJsonString = await trimJSONString(jsonString);
    // console.log("trimmed string", trimmedJsonString)
    return JSON.parse(trimmedJsonString);
  } catch (error) {
    throw new Error("Invalid JSON string");
  }
}
async function trimJSONString(jsonString: string) {
  const startIndex = jsonString.indexOf('{');
  const endIndex = jsonString.lastIndexOf('}');

  if (startIndex === -1 || endIndex === -1) {
    throw new Error("Cannot find JSON start and end markers");
  }

  return jsonString.substring(startIndex, endIndex + 1);
}