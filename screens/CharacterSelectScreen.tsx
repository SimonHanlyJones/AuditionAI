import { View } from "react-native";
import { BASE_STYLES } from "@/primitives";
import { ButtonList } from "@/components/ButtonList";
import { useNavigation, useRoute, Screens } from "@/navigation";

export function CharacterSelectScreen() {
  const navigation = useNavigation<Screens.CharacterSelect>();
  const route = useRoute<Screens.CharacterSelect>();
  const { project } = route.params;

  console.log("project", project);

  return (
    <View style={BASE_STYLES.screenContainer}>
      <ButtonList
        items={project.characters.map((character) => ({
          text: character,
          onPress: () =>
            navigation.navigate("SceneSelect", {
              project,
              characterName: character,
            }),
        }))}
      />
    </View>
  );
}
