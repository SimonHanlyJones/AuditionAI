import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { useNavigation, useRoute, Screens } from "@/navigation";
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

  const scenesItems = characterScenes.map((scene) => ({
      text: scene.title,
      onPress: () =>
        navigation.navigate("Project", {
          project,
          character,
          scene,
        }),
  }));

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        {scenesItems.map((item, index) => (
          <Pressable key={index} onPress={item.onPress} style={({pressed}) => [styles.scene, pressed && styles.scenePressed]}>
              <Text style={styles.sceneText} numberOfLines={1} ellipsizeMode={'tail'}>{item.text}</Text>
          </Pressable>
      ))}
      </ScrollView>
    </View>
  );
}
