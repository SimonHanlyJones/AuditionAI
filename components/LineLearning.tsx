import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
// import LineLearning from "@/components/LineLearning";
import { SceneScript } from "@/screens/ProjectScreen/TabContext";
import { useEffect, useState, useCallback, useRef } from "react";
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
  useEffect(() => {
    // Effect to handle starting the play when isPlaying is set to true
    if (isPlaying && playRequested.current) {
      playRequested.current = false; // Reset the request flag
      playAllVoices(); // Call the function only after isPlaying is confirmed to be true
    }
  }, [isPlaying]);

  const [waitingForUser, setWaitingForUser] = useState(false);
  const [continuePlaying, setContinuePlaying] = useState(() => () => {});

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
    setIsPlaying(false);
    setWaitingForUser(false);
    setContinuePlaying(() => () => {});
    props.setCurrentLineIndex(0);
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

    if (dialogue.length > 0) {
      for (let i = 0; i < dialogue.length; i++) {
        if (!isPlaying) {
          // Direct check on isPlaying state
          console.log("Playback stopped.");
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
              line.uri
            );
            await playAudio(line.uri);
          } catch (error) {
            console.error(`Failed to play audio for line: ${error}`);
          }
        }
      }
    }
    setIsPlaying(false);
    console.log("Finished Performance");
    props.setCurrentLineIndex(0);
  }
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
      {isPlaying && waitingForUser && (
        <Button title="Continue Playing" onPress={() => continuePlaying()} />
      )}
    </View>
  );
}

export default LineLearning;
