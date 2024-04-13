import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { useNavigation, useRoute, Screens } from "@/navigation";
import { getCharacterInfo } from "./characters";

export async function SceneSelectScreen() {
  const navigation = useNavigation<Screens.SceneSelect>();
  const route = useRoute<Screens.SceneSelect>();
  const { characterName, project } = route.params;

  const character = await getCharacterInfo(project.script, characterName);

  const characterScenes = character.sceneAppearances || []

  const scenesItems = characterScenes.map((scene) => ({
      text: scene.scene,
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