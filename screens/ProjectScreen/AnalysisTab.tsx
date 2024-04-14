import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { type CharacterInfo } from "../characters";
import { TabContext } from "./TabContext";

function addItemIfInfoPresent(
  analysisItems: { text: string; onPress: () => void }[],
  character: CharacterInfo,
  infoKey: string,
  infoTitle: string,
  iconName?: string
) {
  if (infoKey in character) {
    analysisItems.push({
      text: infoTitle,
      onPress: () => {
        console.log(infoTitle + ":", character[infoKey as keyof CharacterInfo]);
      },
      icon: iconName
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
    "characterOverview",
    "Character Overview",
    "account"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "personalityTraits",
    "Personality Traits",
    "head"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "physicalTraits",
    "Physical Traits",
    "arm-flex"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "costumeChoices",
    "Costume Choices",
    "hanger"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "mainRelationships",
    "Main Relationships",
    "account-multiple"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "emotionalCharacterArc",
    "Character Arc",
    "map-marker-path"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "sceneAppearances",
    "Scene Appearances",
    "forest"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "importantScenes",
    "Important Scenes",
    "chat-alert"
  );
  addItemIfInfoPresent(
    analysisItems,
    character,
    "otherInsights",
    "Other Insights",
    "lightbulb-on"
  );

  const analysisItemsMap = analysisItems.map((item) => ({
    text: item.text,
    onPress: item.onPress,
    icon: item.icon
    }),
  );

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        <View style={styles.analysisContainer}>
          {analysisItemsMap.map((item, index) => (
            <Pressable key={index} onPress={item.onPress} style={({pressed}) => [styles.analysis, pressed && styles.analysisPressed]}>
                <MaterialCommunityIcons style={styles.analysisIcon} name={item.icon} size={40} />
                <Text style={styles.analysisText} numberOfLines={2} adjustsFontSizeToFit>{item.text}</Text>
            </Pressable>
        ))}
      </View>
      </ScrollView>
    </View>
  );
}
