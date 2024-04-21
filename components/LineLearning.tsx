import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
// import LineLearning from "@/components/LineLearning";
import { SceneScript } from "@/screens/ProjectScreen/TabContext";
import { useContext, useEffect, useState, useCallback } from "react";
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
  const [continuePlaying, setContinuePlaying] = useState(() => () => {});

  const waitForUser = useCallback(() => {
    return new Promise<void>((resolve) => {
      setContinuePlaying(() => () => {
        resolve();
      });
    });
  }, []);

  async function playAllVoices() {
    console.log("Starting Performance");
    setIsPlaying(true);

    if (dialogue.length > 0) {
      for (let i = 0; i < dialogue.length; i++) {
        const line = dialogue[i];
        props.setCurrentLineIndex(i);
        if (line.character === userCharacter) {
        } else if (line.uri) {
          try {
            // console.log("playing text:" + line.text, " line uri", line.uri);
            await playAudio(line.uri);
          } catch (error) {
            console.error(`Failed to play audio for line: ${error}`);
          }
        }
      }
    }
    setIsPlaying(false);
    console.log("Finished Performance");
  }
  return (
    <View>
      <Text>Press the button to start the performance:</Text>
      {/* {nextUserLine && (
        <Text style={styles.sceneCharacterName}>{nextUserLine}</Text>
      )} */}
      <Button
        title={isPlaying ? "Playing..." : "Play Dialogue"}
        onPress={playAllVoices}
        disabled={isPlaying}
      />
      {isPlaying && (
        <Button title="Continue Playing" onPress={() => continuePlaying()} />
      )}
    </View>
  );
}

export default LineLearning;
