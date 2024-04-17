import { ActivityIndicator, Text, View, ScrollView } from "react-native";
import { styles, colors } from "@/primitives";
// import { BASE_STYLES } from "@/primitives";
import { useContext, useEffect } from "react";
import { TabContext } from "./TabContext";

export function ScriptTab() {
  const tabContext = useContext(TabContext);

  useEffect(() => {
    if (tabContext && tabContext?.info && tabContext?.info?.sceneScript) {
      console.log(
        "New Scene script data received:",
        tabContext.info.sceneScript,
      );
    }
  }, [tabContext?.info.sceneScript]);

  if (tabContext?.info.sceneScriptLoading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size={40} color={colors.textColor} />
        <Text style={styles.loadingText}>Loading Script</Text>
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

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        {tabContext.info.sceneScript.dialogue.map((item, index) => (
          <View key={index}>
            <Text style={styles.sceneCharacterName}>{item.character}</Text>
            <Text style={styles.sceneDialogText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
