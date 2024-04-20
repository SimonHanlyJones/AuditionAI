import { Text, View } from "react-native";
import { styles, colors } from "@/primitives";
import { useContext } from "react";
import { TabContext } from "./TabContext";

export function PerformTab() {
  const tabContext = useContext(TabContext);

  if (tabContext === undefined) return;

  return <View style={styles.screenContainer}></View>;
}
