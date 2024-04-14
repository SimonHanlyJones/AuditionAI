import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AnalysisTab } from "./AnalysisTab";
import { ScriptTab } from "./ScriptTab";
import { PerformTab } from "./PerformTab";
import { useRoute, Screens } from "@/navigation";
import { TabContext, type TabContextInfo } from "./TabContext";
import { getSceneText } from "@/utlis/apiUtlis";

const Tabs = createBottomTabNavigator();

export function ProjectScreen() {
  const route = useRoute<Screens.Project>();
  const { project, character, scene } = route.params;

  const [tabContext, setTabContext] = useState<TabContextInfo>({
    project,
    character,
    scene,       // Initialize sceneScript as null
    sceneScriptLoading: true // Initial loading state
  });

  useEffect(() => {
    const fetchSceneText = async () => {
      if (project?.script && scene?.scene) {
        try {
          const sceneScript = await getSceneText(project.script, scene.scene);
          setTabContext(prevContext => ({
            ...prevContext,
            sceneScript,
            sceneScriptLoading: false
          }));
        } catch (error) {
          console.error('Failed to fetch scene text:', error);
          setTabContext(prevContext => ({
            ...prevContext,
            sceneScriptLoading: false
          }));
        }
      } 
    };

    fetchSceneText();
  }, [project?.script, scene?.scene]); 

  if (tabContext === undefined) return;

  return (
    <TabContext.Provider value={{ info: tabContext, setInfo: setTabContext }}>
      <Tabs.Navigator
        initialRouteName="Analysis"
        screenOptions={{
          headerTitleAlign: "center",
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: "bold",
          },
          tabBarStyle: {
            height: 64,
            paddingVertical: 6,
          },
        }}
      >
        <Tabs.Screen
          name="Analysis"
          component={AnalysisTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="analytics-sharp" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="Script"
          component={ScriptTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="script-text"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Perform"
          component={PerformTab}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="microphone-variant"
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </TabContext.Provider>
  );
}
