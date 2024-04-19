import { ActivityIndicator, Text, View, Button } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
import LineLearning from "@/components/LineLearning";
import { TabContext, SceneScript } from "./TabContext";
import { useContext, useEffect, useState } from "react";
import { styles, colors } from "@/primitives";
import { useRoute, Screens } from "@/navigation";

// export type TabContextInfo = {
//   project: ProjectInfo;
//   character: CharacterInfo;
//   scene: SceneInfo;
//   sceneScript?: SceneScript;
//   sceneScriptLoading: boolean;
//   voicesLoading: boolean;
// };

// export type SceneScript = {
//   dialogue: {
//     character: string;
//     text: string;
//     gender: string;
//     uri?: string;
//     voice?: string;
//   }[];
// };

export function PerformTab() {
  const tabContext = useContext(TabContext);
  const [userDialogues, setUserDialogues] = useState({});

  useEffect(() => {
    if (
      tabContext &&
      tabContext?.info &&
      tabContext?.info?.sceneScript &&
      !tabContext?.info?.voicesLoading
    ) {
      console.log("Voice data received:", tabContext.info.sceneScript);
    }
  }, [tabContext?.info.sceneScript]);

  // get the user dialogues
  useEffect(() => {
    type userCharacterDialogue = { [key: number]: string };

    async function getUserCharacterDialogue(
      sceneScript: SceneScript,
      userCharacter: string
    ): Promise<userCharacterDialogue> {
      const result: userCharacterDialogue = {};

      if (!userCharacter || !sceneScript || !sceneScript.dialogue) {
        return result;
      }

      sceneScript.dialogue.forEach(function (dialogue, index) {
        if (dialogue.character && dialogue.character === userCharacter) {
          result[index] = dialogue.text;
        }
        // console.log(index, dialogue);
      });

      return result;
    }
    if (
      !tabContext?.info.sceneScriptLoading &&
      tabContext?.info.sceneScript &&
      tabContext?.info.sceneScript.dialogue &&
      tabContext?.info.character.name
    )
      setUserDialogues(
        getUserCharacterDialogue(
          tabContext?.info.sceneScript,
          tabContext?.info.character.name
        )
      );
  }, [tabContext?.info.sceneScriptLoading]);

  if (tabContext?.info.voicesLoading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size={40} color={colors.textColor} />
        <Text style={styles.loadingText}>Loading AI Actors</Text>
      </View>
    );
  }

  if (!tabContext?.info.sceneScript?.dialogue) {
    // Add a return statement to handle cases where dialog is not available
    return (
      <View style={styles.screenContainer}>
        <Text style={styles.sceneCharacterName}>No script data available.</Text>
      </View>
    );
  }

  // if we have the voices, play them, and show the next userDialogue

  return (
    <View style={BASE_STYLES.screenContainer}>
      <LineLearning />
      <Text style={styles.sceneCharacterName}>
        This tab will also need the new script, and will use the trickier
        voice/listening tech
      </Text>
    </View>
  );
}
