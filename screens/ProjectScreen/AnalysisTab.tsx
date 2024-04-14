import { useState } from "react";
import { View, ScrollView, Pressable, Text, Modal, TouchableWithoutFeedback} from "react-native";
import { styles } from "@/primitives";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { type CharacterInfo } from "../characters";
import { TabContext } from "./TabContext";

export function AnalysisTab() {
  const tabContext = useContext(TabContext);
  if (tabContext === undefined) return;

  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalData, setModalData] = useState(undefined);

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
          setModalTitle(infoTitle);
          setModalData(character[infoKey]);
          setShowAnalysisModal(true);
          // console.log(infoTitle + ":", character[infoKey as keyof CharacterInfo]);
        },
        icon: iconName
      });
    }
  }

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
      <Modal transparent={true} visible={showAnalysisModal} animationType="fade" onRequestClose={() => setShowAnalysisModal(false)} statusBarTranslucent>
        <TouchableWithoutFeedback onPress={() => setShowAnalysisModal(false)}>
          <View style={styles.overlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modal}>
                <View style={styles.h2}>
                  <Text style={styles.h2Text}>{modalTitle}</Text>
                </View>
                <ScrollView fadingEdgeLength={50}>
                {typeof modalData === 'string' && (
                  <View style={styles.textBox}>
                      <Text style={styles.text}>{modalData}</Text>
                  </View>
                )}
                {typeof modalData === 'object' && (
                  modalData.map((item, index) => (
                    <View key={index} style={styles.textBox}>
                      {Object.entries(item).map(([key, value]) => (
                        <View key={key} style={styles.textItem}>
                          <Text style={styles.text}><Text style={styles.textKey}>{key}:</Text> {value}</Text> 
                        </View>
                      ))}
                    </View>
                  ))
                )}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
