import { View, ScrollView, Pressable, Text, Button } from "react-native";
import { styles } from "@/primitives";
import { useState } from "react";
import { useNavigation, Screens } from "@/navigation";
import { getProjects, getNewProjectInfo } from "./projects";

import { ScriptAnalysisComponentDemoComponent } from '@/components/testButtons';

export function ProjectSelectScreen() {
  const navigation = useNavigation<Screens.ProjectSelect>();

  const [projects, setProjects] = useState(getProjects());

  async function addProject() {
    const newProject = await getNewProjectInfo();

    setProjects([...projects, newProject]);
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
      {/* <Button
        onPress={addProject}
        title="+ Add Project"
        color="#007bff"
      />
      <ScriptAnalysisComponentDemoComponent /> */}
    </View>
  );
};
