import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { AnalysisTab } from "./AnalysisTab";
import { ScriptTab } from "./ScriptTab";
import { PerformTab } from "./PerformTab";
import { useRoute, useNavigation, Screens } from "@/navigation";
import { TabContext, type TabContextInfo } from "./TabContext";
import { getSceneText } from "@/utlis/geminiUtlis";
import {
  getSceneScriptFromStorage,
  setSceneScriptToStorage,
} from "@/asyncStorage";
import type { SceneScriptInfo } from "@/screens/scenes";

const Tabs = createBottomTabNavigator();

export function ProjectScreen() {
  const route = useRoute<Screens.Project>();
  const navigation = useNavigation<Screens.Project>();
  const { project, character, scene } = route.params;

  useEffect(
    () =>
      navigation.setOptions({
        title: project.title,
      }),
    []
  );

  const [tabContext, setTabContext] = useState<TabContextInfo>({
    project,
    character,
    scene,
    sceneScriptLoading: true,
  });

  /**
   * When script and scene are loaded in, fetch the scene text
   *
   * Retrieves the scene script based on the project script and scene ID.
   *
   *
   * @return {Promise<void>} Async function with no explicit return value
   */
  useEffect(() => {
    const fetchSceneText = async () => {
      if (project?.script && scene?.scene) {
        let sceneScript: SceneScriptInfo | undefined = undefined;
        const sceneScriptFromStorage = await getSceneScriptFromStorage(
          project.title,
          character.name,
          scene.scene
        );

        if (sceneScriptFromStorage === undefined) {
          try {
            console.log("PRE await getting scene text");

            sceneScript = await getSceneText(project.script, scene.scene);
            console.log("POST await getting scene text");

            setSceneScriptToStorage(
              project.title,
              character,
              scene.scene,
              sceneScript
            );
          } catch (error) {
            console.error("Failed to fetch scene text:", error);
          }
        } else {
          sceneScript = sceneScriptFromStorage;
        }

        setTabContext((prevContext) => ({
          ...prevContext,
          sceneScript,
          sceneScriptLoading: false,
        }));
        console.log("Scene Script set:", sceneScript);
      }
    };

    fetchSceneText();
  }, [project?.script, scene?.scene]);

  useEffect(() => {
    console.log("Updating context:", tabContext);
  }, [tabContext]);

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
            paddingBottom: 8,
          },
          tabBarStyle: {
            height: 64,
            marginBottom: 0,
            paddingVertical: 5,
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
            headerShown: false,
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
            headerShown: false,
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
            headerShown: false,
          }}
        />
      </Tabs.Navigator>
    </TabContext.Provider>
  );
}
