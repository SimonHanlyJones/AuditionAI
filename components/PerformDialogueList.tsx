import React, { useRef, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { styles, colors } from "@/primitives";
import { LinearGradient } from "expo-linear-gradient";
import { TabContext, SceneScript } from "@/screens/ProjectScreen/TabContext";

type Dialogue = {
  character: string;
  text: string;
  gender: string;
  uri?: string;
  voice?: string;
};

type PerformDialogueProps = {
  script: SceneScript;
  currentLineIndex: number;
  setCurrentLineIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedCharacterName: string;
};

const DialogueList = (props: PerformDialogueProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: Math.max(props.currentLineIndex - 1, 0),
    });
  }, [props.currentLineIndex]);

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: Dialogue }) => (
    <View style={styles.performItem}>
      <Text
        style={
          // TODO: this conditional is not robust, probably should make the item.character data cleaner upstream
          item.character.toLowerCase() ===
          props.selectedCharacterName.toLowerCase()
            ? styles.performSelectedCharacter
            : styles.performCharacter
        }
      >
        {item.character.toUpperCase()}
      </Text>
      <Text style={styles.performLine} adjustsFontSizeToFit>
        {item.text}
      </Text>
    </View>
  );

  return (
    <FlatList
      data={props.script.dialogue}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.character}-${index}`}
      showsVerticalScrollIndicator={false}
      ref={flatListRef}
      fadingEdgeLength={800}
    />
  );
};

export default DialogueList;
