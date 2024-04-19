import { ActivityIndicator, Text, View, Button } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
// import LineLearning from "@/components/LineLearning";
import { TabContext, SceneScript } from "@/screens/ProjectScreen/TabContext";
import { useContext, useEffect, useState } from "react";
import { styles, colors } from "@/primitives";
import { useRoute, Screens } from "@/navigation";

// export type TabContextInfo = {
//   project: ProjectInfo;
//   character: CharacterInfo;
//   scene: SceneInfo;
//   sceneScript?: SceneScript;
//   sceneScriptLoading: boolean;
//   voicesLoading: boolean;
// };

// export type SceneScript = {
//   dialogue: {
//     character: string;
//     text: string;
//     gender: string;
//     uri?: string;
//     voice?: string;
//   }[];
// };

function LineLearning() {
  const tabContext = useContext(TabContext);

  async function playVoices() {
    console.log("Starting Performance");

    if (
      tabContext &&
      tabContext.info &&
      tabContext?.info.sceneScript &&
      tabContext?.info.sceneScript.dialogue
    ) {
      for (let line of tabContext?.info.sceneScript.dialogue) {
        if (line.uri) {
          try {
            console.log("playing text:" + line.text, " line uri", line.uri);
            await playAudio(line.uri);
          } catch (error) {
            console.error(`Failed to play audio for line: ${error}`);
          }
        }
      }
    }
    console.log("Finished Performance");
  }
  return (
    <View>
      <Text>Press the button to start the performance:</Text>
      <Button
        title="Play Dialogue"
        onPress={function () {
          playVoices();
        }}
      />
    </View>
  );
}

export default LineLearning;
