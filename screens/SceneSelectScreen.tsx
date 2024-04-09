import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState } from "react";
import { ButtonList } from "@/components/ButtonList";
import { useNavigation, useRoute, Screens } from "@/navigation";
import { BASE_STYLES } from "@/primitives";
import { getCharacterInfo } from "./characters";

export function SceneSelectScreen() {
  const navigation = useNavigation<Screens.SceneSelect>();
  const route = useRoute<Screens.SceneSelect>();
  const { characterName, project } = route.params;

  const character = getCharacterInfo(characterName);

  const characterScenes = [
    ...(character.importantScenes || []),
    ...(character.additionalScenes || []),
  ];

  return (
    <View style={BASE_STYLES.screenContainer}>
      <ButtonList
        items={characterScenes.map((scene) => ({
          text: scene.title,
          onPress: () =>
            navigation.navigate("Project", {
              project,
              character,
              scene,
            }),
        }))}
      />
    </View>
  );
}
