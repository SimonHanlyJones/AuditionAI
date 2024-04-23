import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";
import { SceneScript, Dialogue } from "@/screens/ProjectScreen/TabContext";

interface ValidVoices {
  [key: string]: string;
}

const validVoices: ValidVoices = {
  "en-GB-Neural2-C": "FEMALE",
  "en-GB-Neural2-B": "MALE",
  "en-GB-Neural2-A": "FEMALE",
  "en-GB-Neural2-D": "MALE",
  "en-AU-Neural2-A": "FEMALE",
  "en-AU-Neural2-B": "MALE",
  "en-AU-Neural2-C": "FEMALE",
  "en-AU-Neural2-D": "MALE",
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
};

interface PlaybackStatus {
  didJustFinish?: boolean;
  isLoaded?: boolean;
  error?: string;
}
export async function playAudio(uri: string) {
  const soundObject = new Audio.Sound();
  try {
    // Load the audio file from the provided URI
    await soundObject.loadAsync({ uri: uri });
    // Play the audio file
    await soundObject.playAsync();

    // Return a Promise that only resolves when the audio finishes playing
    return new Promise<void>((resolve, reject) => {
      soundObject.setOnPlaybackStatusUpdate(
        (playbackStatus: PlaybackStatus) => {
          if (playbackStatus.didJustFinish) {
            // Resolve the promise when the audio has finished playing
            soundObject.unloadAsync(); // Cleanup the sound object
            resolve();
          } else if (!playbackStatus.isLoaded) {
            // Check if there is an error
            if (playbackStatus.error) {
              console.log(`Playback error: ${playbackStatus.error}`);
              soundObject.unloadAsync(); // Cleanup the sound object
              reject(new Error(`Playback error: ${playbackStatus.error}`));
            }
          }
        }
      );
    });
  } catch (error) {
    console.error("Error loading or playing sound:", error);
    soundObject.unloadAsync(); // Ensure cleanup on error
    throw error; // Rethrow if you want to handle this error outside the function
  }
}
async function getUniqueFilename() {
  const date = new Date();
  // Format date as 'YYYYMMDD_HHMMSSmmm'
  const dateString = date
    .toISOString()
    .replace(/T/g, "_")
    .replace(/:/g, "")
    .replace(/-/g, "")
    .replace(/\..+/, (match) => match.substring(1, 4)); // Extract only the first 3 digits of the milliseconds

  return `audio_${dateString}.mp3`;
}

async function saveFileFromBase64(base64AudioContent: any) {
  const filename = await getUniqueFilename(); // Generate a unique filename based on the current datetime
  const filePath = `${FileSystem.documentDirectory}${filename}`;

  try {
    await FileSystem.writeAsStringAsync(filePath, base64AudioContent, {
      encoding: FileSystem.EncodingType.Base64,
    });
    console.log(`Audio content written to file: ${filePath}`);
    return filePath;
  } catch (error) {
    console.error("Error writing file:", error);
    throw error;
  }
}

export async function synthesizeVoiceFromTextApiCall(
  text: string,
  voiceName: string,
  gender: string
): Promise<string> {
  if (!text || !voiceName || !gender || !validateVoice(voiceName, gender)) {
    console.error(
      `Voice API call input error: text: ${text}, voiceName: ${voiceName}, gender: ${gender}`
    );
    throw new Error(
      `Voice API call input error: text: ${text}, voiceName: ${voiceName}, gender: ${gender}`
    );
  }
  // const url = `http://127.0.0.1:5001/audition-a-i-ak9x5l/us-central1/callVoiceAPI`
  const url = `https://callvoiceapi-7dxvm6ugja-uc.a.run.app`;

  const requestBody = {
    text: text,
    voiceName: voiceName,
    gender: gender,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "duckduck",
      },
      body: JSON.stringify(requestBody),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log(
        `Speech synthesized for text: ${text}, voiceName: ${voiceName}, gender: ${gender}`
      );
      // The audio content is in base64 in responseData.audioContent
      // const audioBuffer = Buffer.from(responseData.audioContent, 'base64');
      const filePath = await saveFileFromBase64(responseData.audioContent);
      return filePath;
    } else {
      throw new Error(
        `API request failed with status ${response.status}: ${responseData.error.message}`
      );
      return "";
    }
  } catch (error) {
    console.error("Error during API call:", error);
    return "";
  }
}

function validateVoice(voice: string, gender: string): boolean {
  return validVoices[voice] === gender;
}

function deepCopySceneScript(sceneScript: SceneScript): SceneScript {
  return {
    dialogue: sceneScript.dialogue.map((dialogueItem) => ({
      character: dialogueItem.character,
      text: dialogueItem.text,
      gender: dialogueItem.gender,
      uri: dialogueItem.uri,
      voice: dialogueItem.voice,
    })),
  };
}

export async function addVoiceIDToSceneScript(
  sceneScriptOriginal: SceneScript,
  userCharacter: string
): Promise<SceneScript> {
  // deepcopy script to avoid mutating original
  const sceneScriptCopy = deepCopySceneScript(sceneScriptOriginal);
  // dynamically generate voice arrays
  let maleVoices: string[] = [];
  let femaleVoices: string[] = [];

  for (const [voiceID, gender] of Object.entries(validVoices)) {
    if (gender === "MALE") {
      maleVoices.push(voiceID);
    } else if (gender === "FEMALE") {
      femaleVoices.push(voiceID);
    }
  }

  let maleVoiceIndex = 0;
  let femaleVoiceIndex = 0;

  let characterMapping: { [key: string]: string } = {};

  for (let line of sceneScriptCopy.dialogue) {
    if (
      userCharacter.toUpperCase() !== line.character.toUpperCase() &&
      line.character.toUpperCase() !== "STAGE DIRECTIONS" &&
      line.character.toUpperCase() !== "STAGE DIRECTION" &&
      !line.uri
    ) {
      if (line.character.toUpperCase() in characterMapping) {
        line.voice = characterMapping[line.character.toUpperCase()];
      } else if (line.gender.toUpperCase() === "MALE") {
        characterMapping[line.character.toUpperCase()] =
          maleVoices[maleVoiceIndex];
        line.voice = maleVoices[maleVoiceIndex];
        maleVoiceIndex = (maleVoiceIndex + 1) % maleVoices.length;
      } else {
        characterMapping[line.character.toUpperCase()] =
          femaleVoices[femaleVoiceIndex];
        line.voice = femaleVoices[femaleVoiceIndex];
        femaleVoiceIndex = (femaleVoiceIndex + 1) % femaleVoices.length;
      }
    }
  }
  console.log("characterMapping: ", characterMapping);
  return sceneScriptCopy;
}

export async function getVoiceAndAddUriToSceneScript(
  sceneScriptOriginal: SceneScript,
  userCharacter: string
): Promise<SceneScript> {
  // deepcopy script to avoid mutating original
  const sceneScriptCopy = deepCopySceneScript(sceneScriptOriginal);
  // Synthesize voice for each line

  for (let line of sceneScriptCopy.dialogue) {
    if (
      userCharacter !== line.character &&
      line.character !== "Stage Directions".toLowerCase() &&
      line.character !== "STAGE DIRECTION".toLowerCase() &&
      line.gender &&
      line.voice &&
      validateVoice(line.voice, line.gender) &&
      !line.uri
    ) {
      line.uri = await synthesizeVoiceFromTextApiCall(
        line.text,
        line.voice,
        line.gender
      );
    }
  }
  return sceneScriptCopy;
}
