import { View, ScrollView, Pressable, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { styles } from "@/primitives";
import { useNavigation, useRoute, Screens } from "@/navigation";
import { getCharacterInfo } from "./characters";

export function CharacterSelectScreen() {
  const navigation = useNavigation<Screens.CharacterSelect>();
  const route = useRoute<Screens.CharacterSelect>();
  const { project } = route.params;

  const [isLoadingCharacter, setIsLoadingCharacter] = useState(false);
  useEffect(() => {});

  const charactersItems = project.characters.map((characterName) => {
    return {
      text: characterName,
      onPress: async () => {
        setIsLoadingCharacter(true);
        const character = await getCharacterInfo(project.script, characterName);
        navigation.navigate("SceneSelect", {
          project,
          character,
        });
        setIsLoadingCharacter(false); // TODO?: this might be causing gross flashing before the navigation happens
      },
    };
  });

  return (
    <View style={styles.screenContainer}>
      {isLoadingCharacter ? (
        <Text
          style={{
            ...styles.characterText,
            ...{ textAlign: "center", marginTop: 100 },
          }}
          adjustsFontSizeToFit
        >
          ...Loading Character...
        </Text>
      ) : (
        <ScrollView fadingEdgeLength={50}>
          {charactersItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.onPress}
              style={({ pressed }) => [
                styles.character,
                pressed && styles.characterPressed,
              ]}
            >
              <Text style={styles.characterText} adjustsFontSizeToFit>
                {item.text}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
