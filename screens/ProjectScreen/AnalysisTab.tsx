import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { useContext } from "react";
import { type CharacterInfo } from "../characters";
import { TabContext } from "./TabContext";

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

  const analysisItemsMap = analysisItems.map((item) => ({
    text: item.text,
    onPress: item.onPress,
      }),
  );

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        {analysisItemsMap.map((item, index) => (
          <Pressable key={index} onPress={item.onPress} style={({pressed}) => [styles.analysis, pressed && styles.analysisPressed]}>
              <Text style={styles.analysisText} numberOfLines={1} adjustsFontSizeToFit>{item.text}</Text>
          </Pressable>
      ))}
      </ScrollView>
    </View>
  );
}
