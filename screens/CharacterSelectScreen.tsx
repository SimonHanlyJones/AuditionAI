import {
  View,
  ScrollView,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { styles, colors } from "@/primitives";
import { useNavigation, useRoute, Screens } from "@/navigation";
import { CharacterInfo, getCharacterInfo } from "./characters";
import { setCharacterToStorage, getCharacterFromStorage } from "@/asyncStorage";

export function CharacterSelectScreen() {
  const navigation = useNavigation<Screens.CharacterSelect>();
  const route = useRoute<Screens.CharacterSelect>();
  const { project } = route.params;

  const [isLoadingCharacter, setIsLoadingCharacter] = useState(false);

  const charactersItems = project.characters.map((characterName) => {
    return {
      text: characterName,
      onPress: async () => {
        setIsLoadingCharacter(true);
        let character: CharacterInfo | undefined = undefined;
        const characterFromStorage = await getCharacterFromStorage(
          project.title,
          characterName
        );
        if (characterFromStorage === undefined) {
          character = await getCharacterInfo(project.script, characterName);
          setCharacterToStorage(project.title, character);
        } else {
          character = characterFromStorage;
        }
        navigation.navigate("SceneSelect", {
          project,
          character,
        });
        setTimeout(() => setIsLoadingCharacter(false), 1000); // TODO: hacky delay so that the loading doesn't end before navigation
      },
    };
  });

  return (
    <View style={styles.screenContainer}>
      {isLoadingCharacter ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size={40} color={colors.textColor} />
          <Text style={styles.loadingText}>Loading Character</Text>
        </View>
      ) : (
        <ScrollView fadingEdgeLength={50}>
          {charactersItems.map((item, index) => (
            <Pressable
              key={index}
              onPress={item.onPress}
              unstable_pressDelay={100}
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
