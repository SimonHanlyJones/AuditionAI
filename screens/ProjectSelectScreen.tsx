import { View, ScrollView, Pressable, Text} from "react-native";
import { styles } from "@/primitives";
import { useState } from "react";
import { useNavigation, Screens } from "@/navigation";
import { getProjects } from "./projects";

import { ScriptAnalysisComponentDemoComponent } from '@/components/testButtons';

export function ProjectSelectScreen() {
  const navigation = useNavigation<Screens.ProjectSelect>();

  const [projects, setProjects] = useState(getProjects());

  const projectItems = projects.map((project) => ({
    text: project.title,
    onPress: () => navigation.navigate("CharacterSelect", { project }),
  }));

  return (
    <View style={styles.screenContainer}>
      <ScrollView fadingEdgeLength={50}>
        {projectItems.map((item, index) => (
          <Pressable key={index} onPress={item.onPress} style={({pressed}) => [styles.project, pressed && styles.projectPressed]}>
              <Text style={styles.projectText} numberOfLines={1} adjustsFontSizeToFit>{item.text}</Text>
          </Pressable>
      ))}
      </ScrollView>
      {/* <ScriptAnalysisComponentDemoComponent /> */}
    </View>
  );
};
