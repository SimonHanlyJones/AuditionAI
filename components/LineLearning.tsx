import { styles } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
// import LineLearning from "@/components/LineLearning";
import { SceneScript } from "@/screens/ProjectScreen/TabContext";
import { useEffect, useState, useCallback, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Voice from "@react-native-voice/voice";
import stringSimilarity from "string-similarity";
import VoiceRecognition from "./VoiceRecognition";

import { View, Text, Button, Pressable } from "react-native";

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
  return (
    <View style={styles.performButtons}>
      <Pressable
        onPress={() => resetPerformance()}
        style={({ pressed }) => [
          styles.performButton,
          pressed && styles.performButtonPressed,
        ]}
      >
        <MaterialCommunityIcons
          style={styles.performIcon}
          name={"replay"}
          size={36}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          playRequested.current = true;
          setIsPlaying(true);
        }}
        style={({ pressed }) => [
          styles.performButton,
          pressed && styles.performButtonPressed,
        ]}
        disabled={isPlaying}
      >
        <MaterialCommunityIcons
          style={
            isPlaying
              ? [styles.performIcon, { opacity: 0.2 }]
              : styles.performIcon
          }
          name={"play"}
          size={36}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          pausePerformance();
        }}
        style={({ pressed }) => [
          styles.performButton,
          pressed && styles.performButtonPressed,
        ]}
        disabled={!isPlaying}
      >
        <MaterialCommunityIcons
          style={
            !isPlaying
              ? [styles.performIcon, { opacity: 0.2 }]
              : styles.performIcon
          }
          name={"pause"}
          size={36}
        />
      </Pressable>
      {/* {isPlaying && waitingForUser && (
        <Button title="Continue Playing" onPress={() => continuePlaying()} />
      )} */}
      {/* <VoiceRecognition
        waitingForUser={waitingForUser}
        setWaitingForUser={setWaitingForUser}
        onResult={handleVoiceResult}
        onError={handleVoiceError}
      /> */}
    </View>
  );
}

export default LineLearning;
