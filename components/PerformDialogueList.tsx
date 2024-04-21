import React, { useRef } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
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
};

const DialogueList = (props: PerformDialogueProps) => {
  const flatListRef = useRef<FlatList>(null);

  // Render each item in the FlatList
  const renderItem = ({ item }: { item: Dialogue }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.character}>{item.character.toUpperCase()}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={props.script.dialogue}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.character}-${index}`}
        ref={flatListRef}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ height: 50, backgroundColor: "transparent" }} />
        }
        ListFooterComponent={
          <View style={{ height: 50, backgroundColor: "transparent" }} />
        }
      />
      <LinearGradient
        colors={["rgba(255,255,255,1)", "transparent"]}
        style={[styles.fade, { top: 0 }]}
        pointerEvents="none" // Ensures touch events pass through the gradient
      />
      <LinearGradient
        colors={["transparent", "rgba(255,255,255,1)"]}
        style={[styles.fade, { bottom: 0 }]}
        pointerEvents="none" // Ensures touch events pass through the gradient
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  character: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
  },
  text: {
    fontSize: 14,
    color: "white",
  },
  fade: {
    position: "absolute",
    width: "100%",
    height: 50,
    zIndex: 1,
  },
});

export default DialogueList;
