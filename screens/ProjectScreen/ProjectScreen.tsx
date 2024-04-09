import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core";
import {
  createBottomTabNavigator,
  type BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { AnalysisTab } from "./AnalysisTab";
import { ScriptTab } from "./ScriptTab";
import { PerformTab } from "./PerformTab";

import { COLORS } from "@/primitives/colors";

const Tabs = createBottomTabNavigator();

export function ProjectScreen() {
  const navigation =
    useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return (
    <Tabs.Navigator
      sceneContainerStyle={{ backgroundColor: COLORS.screenBackground }}
    >
      <Tabs.Screen name="Analysis" component={AnalysisTab} />
      <Tabs.Screen name="Script" component={ScriptTab} />
      <Tabs.Screen name="Perform" component={PerformTab} />
    </Tabs.Navigator>
  );
}
