import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useState } from "react";
import { AnalysisTab } from "./AnalysisTab";
import { ScriptTab } from "./ScriptTab";
import { PerformTab } from "./PerformTab";
import { useRoute, Screens } from "@/navigation";
import { TabContext } from "./TabContext";
import { COLORS } from "@/primitives/colors";

const Tabs = createBottomTabNavigator();

export function ProjectScreen() {
  const route = useRoute<Screens.Project>();
  const { project, character, scene } = route.params;

  const [tabContext, setTabContext] = useState({
    project,
    character,
    scene,
  });

  if (tabContext === undefined) return;

  return (
    <TabContext.Provider value={{ info: tabContext, setInfo: setTabContext }}>
      <Tabs.Navigator
        initialRouteName="Analysis"
        sceneContainerStyle={{ backgroundColor: COLORS.screenBackground }}
      >
        <Tabs.Screen
          name="Analysis"
          component={AnalysisTab}
          options={{ title: "Character Analysis" }}
        />
        <Tabs.Screen name="Script" component={ScriptTab} />
        <Tabs.Screen name="Perform" component={PerformTab} />
      </Tabs.Navigator>
    </TabContext.Provider>
  );
}
