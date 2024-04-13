import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { useNavigation, useRoute, Screens } from "@/navigation";

export function CharacterSelectScreen() {
  const navigation = useNavigation<Screens.CharacterSelect>();
  const route = useRoute<Screens.CharacterSelect>();
  const { project } = route.params;

  console.log("project", project);

  const charactersItems = project.characters.map((character) => ({

    
    text: character,
    onPress: () =>
      navigation.navigate("SceneSelect", {
        project,
        characterName: character,
      }),
  }));

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        {charactersItems.map((item, index) => (
          <Pressable key={index} onPress={item.onPress} style={({pressed}) => [styles.character, pressed && styles.characterPressed]}>
              <Text style={styles.characterText} adjustsFontSizeToFit>{item.text}</Text>
          </Pressable>
      ))}
      </ScrollView>
    </View>
  );
}
