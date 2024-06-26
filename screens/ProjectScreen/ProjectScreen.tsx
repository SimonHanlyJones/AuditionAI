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
import {
  addVoiceIDToSceneScript,
  getVoiceAndAddUriToSceneScript,
} from "@/utlis/voiceUtlis";
import { consolidateDialogue, cleanDialog } from "@/utlis/generalUtils";
import HardwareBackButtonHandler from "@/components/BackButtonHandler";

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
    voicesLoading: true,
    scriptErrorMessage: undefined,
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

            sceneScript = await getSceneText(
              project.script,
              scene.scene,
              scene.number,
              character.name
            );
            console.log("POST await getting scene text");
          } catch (error) {
            console.error("Failed to fetch scene text:", error);

            if (
              error instanceof Error &&
              error.message.includes("RECITATION_ERROR")
            ) {
              setTabContext((prevContext) => ({
                ...prevContext,
                scriptErrorMessage:
                  "RECITATION ERROR FROM GEMINI AI - Please select a different scene or try again",
              }));
            } else {
              setTabContext((prevContext) => ({
                ...prevContext,
                scriptErrorMessage:
                  "ERROR - Please select a different scene or try again",
              }));
            }
          }
        } else {
          sceneScript = sceneScriptFromStorage;
        }

        if (sceneScript) {
          sceneScript = consolidateDialogue(sceneScript); // adjacent dialogue added to same characters
          sceneScript = cleanDialog(sceneScript);

          setTabContext((prevContext) => ({
            ...prevContext,
            sceneScript,
            sceneScriptLoading: false,
          }));
          console.log("Scene Script set:", sceneScript);
        }
      }
    };
    fetchSceneText();
  }, [project?.script, scene?.scene]);

  // useEffect to get voices
  useEffect(() => {
    const updateVoiceMappingAndSynthesizeVoice = async () => {
      if (
        !tabContext.sceneScriptLoading &&
        tabContext.sceneScript &&
        tabContext.sceneScript.dialogue.length > 0 &&
        tabContext.character
      ) {
        const sceneScriptWithVoiceMap = await addVoiceIDToSceneScript(
          tabContext.sceneScript,
          tabContext.character.name
        );
        const sceneScriptWithVoices = await getVoiceAndAddUriToSceneScript(
          sceneScriptWithVoiceMap,
          tabContext.character.name
        );

        setSceneScriptToStorage(
          project.title,
          character.name,
          scene.scene,
          sceneScriptWithVoices
        );

        setTabContext((prevContext) => ({
          ...prevContext,
          sceneScript: sceneScriptWithVoices,
          voicesLoading: false,
        }));

        console.log("Updated sceneScriptWithVoices:", sceneScriptWithVoices);
      }
    };

    updateVoiceMappingAndSynthesizeVoice();
  }, [tabContext.sceneScriptLoading]);

  useEffect(() => {
    console.log("Updating context");
  }, [tabContext]);

  if (tabContext === undefined) return;

  return (
    <TabContext.Provider value={{ info: tabContext, setInfo: setTabContext }}>
      <HardwareBackButtonHandler />
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
