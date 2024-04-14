import { Text, View } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { useContext } from "react";
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
  
    if (tabContext?.info.sceneScriptLoading) {
      return (
        <View style={BASE_STYLES.screenContainer}>
          <Text>Loading...</Text>
        </View>
      );
    }
  
    if (!tabContext?.info.sceneScript?.dialog) {
      // Add a return statement to handle cases where dialog is not available
      return (
        <View style={BASE_STYLES.screenContainer}>
          <Text>No script data available.</Text>
        </View>
      );
    }
  
    return (
      <View style={BASE_STYLES.screenContainer}>
        {tabContext.info.sceneScript.dialog.map((item, index) => (
          <View key={index}>
            <Text style={BASE_STYLES.sceneCharacterName}>
              {item.character.toUpperCase()}
            </Text>
            <Text style={BASE_STYLES.sceneDialogText}>
              {item.text}
            </Text>
          </View>
        ))}
      </View>
    );
  }