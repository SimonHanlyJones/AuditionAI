import * as FileSystem from "expo-file-system";
import { Audio } from "expo-av";

export async function playAudio(uri: string) {
  const soundObject = new Audio.Sound();
  try {
    // Load the audio file from the URI
    await soundObject.loadAsync({ uri: uri });

    // Play the loaded audio file
    await soundObject.playAsync();

    // Optional: When the audio finishes playing, unload the sound from memory
    soundObject.setOnPlaybackStatusUpdate(async (playbackStatus) => {
      if (!playbackStatus.isLoaded) {
        // Check if there was an error
        if (playbackStatus.error) {
          console.log(`Playback error: ${playbackStatus.error}`);
          throw new Error(`Playback error: ${playbackStatus.error}`);
        }
      } else {
        // PlaybackStatus is loaded and may have additional properties
        if (playbackStatus.didJustFinish) {
          await soundObject.unloadAsync();
        }
      }
    });

    return soundObject; // Returning soundObject in case you need to control it outside this function
  } catch (error) {
    console.error("Error loading or playing sound:", error);
    throw error; // Rethrow if you want to handle this error outside the function
  }
}
async function getUniqueFilename() {
  const date = new Date();
  // Format date as 'YYYYMMDD_HHMMSS'
  const dateString = date
    .toISOString()
    .replace(/:/g, "")
    .replace(/\..+/, "")
    .replace(/T/g, "_")
    .replace(/-/g, "");
  return `audio_${dateString}.mp3`;
}

async function saveFileFromBase64(base64AudioContent: any) {
  const filename = getUniqueFilename(); // Generate a unique filename based on the current datetime
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
  gender: string,
): Promise<string> {
  if (!text || !voiceName || !gender || !validateVoice(voiceName, gender)) {
    console.error(
      `Voice API call input error: text: ${text}, voiceName: ${voiceName}, gender: ${gender}`,
    );
    throw new Error(
      `Voice API call input error: text: ${text}, voiceName: ${voiceName}, gender: ${gender}`,
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
        `Speech synthesized for text: ${text}, voiceName: ${voiceName}, gender: ${gender}`,
      );
      // The audio content is in base64 in responseData.audioContent
      // const audioBuffer = Buffer.from(responseData.audioContent, 'base64');
      const filePath = await saveFileFromBase64(responseData.audioContent);
      return filePath;
    } else {
      throw new Error(
        `API request failed with status ${response.status}: ${responseData.error.message}`,
      );
      return "";
    }
  } catch (error) {
    console.error("Error during API call:", error);
    return "";
  }
}

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
