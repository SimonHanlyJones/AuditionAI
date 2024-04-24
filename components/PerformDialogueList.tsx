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
  userCharacter: string;
};

const DialogueList = (props: PerformDialogueProps) => {
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    flatListRef.current.scrollToIndex({
      animated: true,
      index: props.currentLineIndex,
      viewPosition: 0.5,
    });
  }, [props.currentLineIndex]);

  // Render each item in the FlatList
  const renderItem = ({ item, index }: { item: Dialogue; index: number }) => (
    <View
      style={[
        styles.performItem,
        item.character.toUpperCase() === "STAGE DIRECTIONS" && {
          display: "none",
        },
      ]}
    >
      <Text
        style={[
          styles.performCharacter,
          props.currentLineIndex === index && { opacity: 1 },
          !item.character
            .toUpperCase()
            .startsWith(props.userCharacter.toUpperCase()) && {
            color: colors.textHighlight,
          },
        ]}
      >
        {item.character.toUpperCase()}
      </Text>
      <Text
        style={[
          styles.performLine,
          props.currentLineIndex === index && { opacity: 1 },
          !item.character
            .toUpperCase()
            .startsWith(props.userCharacter.toUpperCase()) && {
            color: colors.textHighlight,
          },
        ]}
        numberOfLines={16}
        adjustsFontSizeToFit
      >
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
      fadingEdgeLength={250}
    />
  );
};

export default DialogueList;
