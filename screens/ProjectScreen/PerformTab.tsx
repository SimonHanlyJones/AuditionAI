import { ActivityIndicator, Text, View } from "react-native";
import LineLearning from "@/components/LineLearning";
import DialogueList from "@/components/PerformDialogueList";
import { TabContext } from "./TabContext";
import { useContext, useState } from "react";
import { styles, colors } from "@/primitives";

export function PerformTab() {
  const tabContext = useContext(TabContext);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

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
        userCharacter={tabContext?.info.character.name}
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
