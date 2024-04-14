import { View, ScrollView, Pressable, Text } from "react-native";
import { styles } from "@/primitives";
import { useState } from "react";
import { useNavigation, Screens } from "@/navigation";
import { getProjects, getNewProjectInfo } from "./projects";

import { ScriptAnalysisComponentDemoComponent, HelloWorldButtonFromAPI, VoiceTestButton } from '@/components/testButtons';

export function ProjectSelectScreen() {
  const navigation = useNavigation<Screens.ProjectSelect>();

  const [projects, setProjects] = useState(getProjects());

  async function addProject() {
    const newProject = await getNewProjectInfo();
    if (newProject) {
      setProjects([...projects, newProject]);
    }
  }

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
      <Pressable style={({pressed}) => [styles.addProject, pressed && styles.addProjectPressed]} onPress={addProject}>
        <Text style={styles.addProjectText}>+</Text>
      </Pressable>
      {/* <HelloWorldButtonFromAPI /> */}
      <VoiceTestButton />
    </View>
  );
};
