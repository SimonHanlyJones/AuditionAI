import { Text, View } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { useContext } from "react";
import { TabContext } from "./TabContext";

export function PerformTab() {
  const tabContext = useContext(TabContext);

  if (tabContext === undefined) return;

  return (
    <View
      style={{
        ...BASE_STYLES.screenContainer,
        ...{ backgroundColor: "white" },
      }}
    >
      <View>
        <Text>Character: {tabContext.info.character.name}</Text>
        <Text>Scene: {tabContext.info.scene.scene}</Text>
      </View>
      <Text>
        This tab will also need the new script, and will use the trickier
        voice/listening tech
      </Text>
    </View>
  );
}
