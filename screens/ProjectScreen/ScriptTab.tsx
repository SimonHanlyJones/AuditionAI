import { Text, View } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { useContext } from "react";
import { TabContext } from "./TabContext";

export function ScriptTab() {
  const tabContext = useContext(TabContext);

  return (
    <View style={BASE_STYLES.screenContainer}>
      {tabContext?.info.sceneScriptLoading ? (
        <Text>Loading...</Text>
      ) : (
        <Text>WE HAVE A SCRIPT</Text>
      )}
    </View>
  );
}
