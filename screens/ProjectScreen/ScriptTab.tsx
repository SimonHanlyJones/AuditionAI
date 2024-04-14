import { Text, View } from "react-native";
import { styles } from "@/primitives";
// import { BASE_STYLES } from "@/primitives";
import { useContext, useEffect } from "react";
import { TabContext } from "./TabContext";

// export type TabContextInfo = {
//   project: ProjectInfo;
//   character: CharacterInfo;
//   scene: SceneInfo;
//   sceneScript?: {
//     dialog: { character: string; text: string; gender: string }[];
//   };
//   sceneScriptLoading: boolean;
// };


export function ScriptTab() {
  const tabContext = useContext(TabContext);

  useEffect(() => {
    if (tabContext && tabContext?.info && tabContext?.info?.sceneScript) {
      console.log('New Scene script data received:', tabContext.info.sceneScript);
    };
  }, [tabContext?.info.sceneScript]);
  
    if (tabContext?.info.sceneScriptLoading) {
      return (
        <View style={styles.screenContainer}>
          <Text style={styles.sceneCharacterName}>Loading...</Text>
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
        {tabContext.info.sceneScript.dialogue.map((item, index) => (
          <View key={index}>
            <Text style={styles.sceneCharacterName}>
              {item.character.toUpperCase()}
            </Text>
            <Text style={styles.sceneDialogText}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    );
  }