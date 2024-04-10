import { Text, View } from "react-native";
import { BASE_STYLES } from "@/primitives";

export function PerformTab() {
  return (
    <View style={BASE_STYLES.screenContainer}>
      <Text>
        This tab will also need the new script, and will use the trickier
        voice/listening tech
      </Text>
    </View>
  );
}
