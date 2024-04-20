import { ActivityIndicator, Text, View, Button } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { playAudio } from "@/utlis/voiceUtlis";
// import LineLearning from "@/components/LineLearning";
import { TabContext, SceneScript } from "@/screens/ProjectScreen/TabContext";
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
type UserCharacterDialogue = { [key: number]: string };
function LineLearning() {
  const tabContext = useContext(TabContext);

  // get the user dialogues
  const [userDialogues, setUserDialogues] = useState<UserCharacterDialogue>({});
  const [sortedUserDialogueIndexes, setSortedUserDialogueIndexes] = useState<
    string[]
  >([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentUserLineIndex, setCurrentUserLineIndex] = useState(0);
  const [nextUserLine, setNextUserLine] = useState<string>("");

  useEffect(() => {
    if (userDialogues) {
      console.log("userDialogues:", userDialogues);
      console.log("sortedUserDialogueIndexes:", sortedUserDialogueIndexes);
    }
  }, [userDialogues]);

  useEffect(() => {
    if (
      tabContext &&
      tabContext?.info &&
      tabContext?.info.sceneScript &&
      tabContext?.info.sceneScript.dialogue &&
      tabContext?.info.sceneScript.dialogue.length > 0 &&
      sortedUserDialogueIndexes &&
      currentLineIndex < tabContext?.info.sceneScript.dialogue.length
    ) {
      if (
        currentLineIndex >
        parseInt(sortedUserDialogueIndexes[currentUserLineIndex])
      )
        setCurrentUserLineIndex(currentUserLineIndex + 1);

      parseInt(sortedUserDialogueIndexes[currentUserLineIndex]);
    }

    if (currentUserLineIndex in userDialogues) {
      setNextUserLine(userDialogues[currentUserLineIndex]);
    }
  }, [currentLineIndex, sortedUserDialogueIndexes]);

  useEffect(() => {
    async function getUserCharacterDialogue(
      sceneScript: SceneScript,
      userCharacter: string
    ): Promise<UserCharacterDialogue> {
      let result: UserCharacterDialogue = {};

      if (!userCharacter || !sceneScript || !sceneScript.dialogue) {
        return result;
      }

      sceneScript.dialogue.forEach(function (dialogue, index) {
        if (dialogue.character && dialogue.character === userCharacter) {
          result[index] = dialogue.text;
        }
        // console.log(index, dialogue);
      });
      const sortedIndexes = Object.keys(result).sort(
        (a, b) => parseInt(a) - parseInt(b)
      );
      setUserDialogues(result);
      setSortedUserDialogueIndexes(sortedIndexes);

      return result;
    }
    if (
      !tabContext?.info.sceneScriptLoading &&
      tabContext?.info.sceneScript &&
      tabContext?.info.sceneScript.dialogue &&
      tabContext?.info.character.name
    )
      getUserCharacterDialogue(
        tabContext?.info.sceneScript,
        tabContext?.info.character.name
      );
  }, [tabContext?.info.sceneScriptLoading]);

  async function playAllVoices() {
    console.log("Starting Performance");

    if (
      tabContext &&
      tabContext.info &&
      tabContext?.info.sceneScript &&
      tabContext?.info.sceneScript.dialogue &&
      userDialogues
    ) {
      for (let i = 0; i < tabContext?.info.sceneScript.dialogue.length; i++) {
        const line = tabContext?.info.sceneScript.dialogue[i];
        setCurrentLineIndex(i);
        if (line.uri) {
          try {
            // console.log("playing text:" + line.text, " line uri", line.uri);
            await playAudio(line.uri);
          } catch (error) {
            console.error(`Failed to play audio for line: ${error}`);
          }
        }
      }
    }
    console.log("Finished Performance");
  }
  return (
    <View>
      <Text>Press the button to start the performance:</Text>
      {nextUserLine && (
        <Text style={styles.sceneCharacterName}>{nextUserLine}</Text>
      )}
      <Button
        title="Play Dialogue"
        onPress={function () {
          playAllVoices();
        }}
      />
    </View>
  );
}

export default LineLearning;
