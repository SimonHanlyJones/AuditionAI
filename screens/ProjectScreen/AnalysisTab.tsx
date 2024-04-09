import { View } from "react-native";
import { ButtonList } from "@/components/ButtonList";
import { useContext } from "react";
import { type CharacterInfo } from "../characters";
import { TabContext } from "./TabContext";
import { BASE_STYLES } from "@/primitives";

function addItemIfInfoPresent(
  analysisItems: { text: string; onPress: () => void }[],
  character: CharacterInfo,
  infoKey: string,
  infoTitle: string
) {
  if (infoKey in character) {
    analysisItems.push({
      text: infoTitle,
      onPress: () => {
        console.log(infoTitle + ":", character[infoKey as keyof CharacterInfo]);
      },
    });
  }
}

export function AnalysisTab() {
  const tabContext = useContext(TabContext);
  if (tabContext === undefined) return;

  const { project, character, scene } = tabContext.info;

  const analysisItems: { text: string; onPress: () => void }[] = [];
  addItemIfInfoPresent(
    analysisItems,
    character,
    "personalityTraits",
    "Personality Traits"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "physicalTraits",
    "Physical Traits"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "mainRelationships",
    "Main Relationships"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "characterArc",
    "Character Arc"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "otherInsights",
    "Other Insights"
  );
  return (
    <View style={BASE_STYLES.screenContainer}>
      <ButtonList
        items={analysisItems.map((item) => ({
          text: item.text,
          onPress: item.onPress,
        }))}
      />
    </View>
  );
}
