import Voice from "@react-native-voice/voice";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);

interface VoiceRecognitionResult {
  error?: string;
  text?: string;
}

export const startVoiceRecognition =
  async (): Promise<VoiceRecognitionResult> => {
    // Clean up any existing listeners before starting a new session
    Voice.removeAllListeners();

    return new Promise((resolve, reject) => {
      // Set up the event handlers
      const onSpeechResults = (e: any) => {
        Voice.removeAllListeners(); // Clean up after getting results
        if (e.value && e.value.length > 0) {
          resolve({ text: e.value[0] }); // Resolve with the first result
        } else {
          reject({ error: "No speech recognized." });
        }
      };

      const onSpeechError = (error: any) => {
        Voice.removeAllListeners(); // Clean up after an error
        reject({ error: error.error.message });
      };

      // Attach event listeners
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;

      // Start voice recognition
      Voice.start("en-US").catch((err) => {
        Voice.removeAllListeners(); // Ensure cleanup on failure to start
        reject({ error: err.message });
      });
    });
  };
