import { ActivityIndicator, Text, View, Button } from "react-native";
import { playAudio } from "@/utlis/voiceUtlis";
import LineLearning from "@/components/LineLearning";
import DialogueList from "@/components/PerformDialogueList";
import { TabContext, SceneScript } from "./TabContext";
import { SetStateAction, useContext, useEffect, useState } from "react";
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

export function PerformTab() {
  const tabContext = useContext(TabContext);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  // useEffect(() => {
  //   if (
  //     tabContext &&
  //     tabContext?.info &&
  //     tabContext?.info?.sceneScript &&
  //     !tabContext?.info?.voicesLoading
  //   ) {
  //     console.log("Voice data received:", tabContext.info.sceneScript);
  //   }
  // }, [tabContext?.info.sceneScript]);

  if (tabContext?.info.voicesLoading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size={40} color={colors.textColor} />
        <Text style={styles.loadingText}>Loading AI Actors</Text>
      </View>
    );
  }

  if (!tabContext?.info.sceneScript?.dialogue) {
    // Add a return statement to handle cases where dialog is not available
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.sceneCharacterName}>No script data available.</Text>
      </View>
    );
  }

  // return statement for when we have voices and dialogue
  return (
    <View style={styles.screenContainer}>
      <DialogueList
        script={tabContext?.info.sceneScript}
        currentLineIndex={currentLineIndex}
        setCurrentLineIndex={setCurrentLineIndex}
        selectedCharacterName={tabContext?.info.character.name}
      />
      <LineLearning
        sceneScript={tabContext?.info.sceneScript}
        userCharacter={tabContext?.info.character.name}
        currentLineIndex={currentLineIndex}
        setCurrentLineIndex={setCurrentLineIndex}
      />
    </View>
  );
}
