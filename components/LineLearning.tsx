import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
import { startVoiceRecognition } from "@/utlis/useVoiceRecognition";
// import LineLearning from "@/components/LineLearning";
import { SceneScript } from "@/screens/ProjectScreen/TabContext";
import { useEffect, useState, useCallback, useRef } from "react";

import Voice from "@react-native-voice/voice";
import stringSimilarity from "string-similarity";
import VoiceRecognition from "./VoiceRecognition";
import { styles, colors } from "@/primitives";

import { View, Text, Button } from "react-native";

// export type SceneScript = {
//   dialogue: {
//     character: string;
//     text: string;
//     gender: string;
//     uri?: string;
//     voice?: string;
//   }[];
// };

type Dialogue = {
  character: string;
  text: string;
  gender: string;
  uri?: string;
  voice?: string;
};

type LineLearningProps = {
  sceneScript: SceneScript;
  userCharacter: string;
  currentLineIndex: number;
  setCurrentLineIndex: React.Dispatch<React.SetStateAction<number>>;
};
function LineLearning(props: LineLearningProps) {
  const dialogue = props.sceneScript.dialogue;
  const userCharacter = props.userCharacter;
  const [isPlaying, setIsPlaying] = useState(false);
  const playRequested = useRef(false);
  const isPlayingRef = useRef(isPlaying);
  const [isListening, setIsListening] = useState(false);

  const [waitingForUser, setWaitingForUser] = useState(false);
  const [continuePlaying, setContinuePlaying] = useState(() => () => {});

  // VOICE RECOGNITION

  // const handleVoiceResult = (text: string) => {
  //   if (waitingForUser) {
  //     continuePlaying();
  //     console.log("user should continue", waitingForUser);
  //   }
  //   console.log("Voice recognition result:", text);
  //   // Add logic to compare text or handle the result
  // };
  const handleVoiceResult = useCallback(
    (text: string) => {
      console.log("Voice recognition result:", text);
      if (waitingForUser) {
        console.log("User should continue", waitingForUser); // Logging current state before it changes
        continuePlaying(); // Call the function that resolves the promise
      }
    },
    [waitingForUser, continuePlaying]
  );

  const handleVoiceError = (error: any) => {
    if (waitingForUser) {
      console.log("User should continue", waitingForUser); // Logging current state before it changes
      continuePlaying(); // Call the function that resolves the promise
    }
    // console.error("Voice recognition error:", error);
  };

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    // Effect to handle starting the play when isPlaying is set to true
    if (isPlaying && playRequested.current) {
      playRequested.current = false; // Reset the request flag
      playAllVoices(); // Call the function only after isPlaying is confirmed to be true
    }
  }, [isPlaying]);

  // useEffect to Stop Performance on Unmount
  useEffect(() => {
    return function cleanup() {
      setContinuePlaying(() => () => {});
      setWaitingForUser(false);
      setIsPlaying(false);
      props.setCurrentLineIndex(0);
    };
  }, []);

  function resetPerformance() {
    console.log("resetting performance");
    isPlayingRef.current = false;
    setIsPlaying(false);
    setWaitingForUser(false);
    setContinuePlaying(() => () => {});
    props.setCurrentLineIndex(0);
  }

  function pausePerformance() {
    console.log("resetting performance");
    isPlayingRef.current = false;
    setIsPlaying(false);
    setWaitingForUser(false);
    setContinuePlaying(() => () => {});
  }

  const waitForUser = useCallback(() => {
    setWaitingForUser(true);
    return new Promise<void>((resolve) => {
      setContinuePlaying(() => () => {
        setWaitingForUser(false);
        resolve();
      });
    });
  }, []);

  async function playAllVoices() {
    console.log("Starting Performance, userCharacter: ", userCharacter);

    if (dialogue.length > 0 && props.currentLineIndex < dialogue.length) {
      for (let i = props.currentLineIndex; i < dialogue.length; i++) {
        if (!isPlayingRef.current) {
          // Direct check on isPlaying state
          console.log("Playback stopped or paused.");
          break;
        }
        const line = dialogue[i];
        props.setCurrentLineIndex(i);

        if (line.character.toUpperCase() === userCharacter.toUpperCase()) {
          await waitForUser();
        } else if (line.uri) {
          try {
            console.log(
              "playing text:" + line.character + line.text,
              " line uri",
              line.uri,
              " voiceID: ",
              line.voice
            );
            await playAudio(line.uri);
          } catch (error) {
            console.error(`Failed to play audio for line: ${error}`);
          }
        }
      }
    }
    if (!isPlayingRef.current) {
      console.log("Playback paused.");
    } else {
      setIsPlaying(false);
      console.log("Finished Performance");
      props.setCurrentLineIndex(0);
    }
  }

  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePress = async () => {
    setResult(null); // Reset previous results
    setError(null); // Reset previous errors
    try {
      const recognitionResult = await startVoiceRecognition();
      if (recognitionResult.text) {
        setResult(recognitionResult.text);
      } else {
        console.log("error");
        setError("No speech recognized");
      }
    } catch (err) {
      console.log("error");
      setError(`Error: ${err}`);
    }
  };

  return (
    <View>
      <Text>Press the button to start the performance:</Text>

      <Button
        title={isPlaying ? "Reset Performance" : "Play Dialogue"}
        onPress={
          isPlaying
            ? resetPerformance
            : () => {
                playRequested.current = true;
                setIsPlaying(true);
              }
        }
      />
      {isPlaying && (
        <Button title="Pause Performance" onPress={() => pausePerformance()} />
      )}
      {isPlaying && waitingForUser && (
        <Button title="Continue Playing" onPress={() => continuePlaying()} />
      )}
      {/* <View>
        <Button title="Start Voice Recognition" onPress={handlePress} />
        {result && <Text style={styles.text}>Recognized Text: {result}</Text>}
        {error && <Text style={styles.text}>{error}</Text>}
      </View> */}
      <VoiceRecognition
        isListening={isListening}
        setIsListening={setIsListening}
        onResult={handleVoiceResult}
        onError={handleVoiceError}
      />
    </View>
  );
}

export default LineLearning;
