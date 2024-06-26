import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  Modal,
  ActivityIndicator,
} from "react-native";
import { styles, colors } from "@/primitives";
import { useNavigation, Screens } from "@/navigation";
import { getNewProjectInfo } from "./projects";
import type { ProjectInfo } from "./projects";
import { cleanText } from "@/utlis/generalUtils";

import { getProjectsFromStorage, setProjectToStorage } from "@/asyncStorage";

export function ProjectSelectScreen() {
  const navigation = useNavigation<Screens.ProjectSelect>();

  const [projects, setProjects] = useState<ProjectInfo[]>([]);
  const [isLoadingProject, setIsLoadingProject] = useState(false);
  useEffect(() => {
    async function fetchProjects() {
      const projects = await getProjectsFromStorage();
      setProjects(projects);
    }
    fetchProjects();
  }, []);

  async function addProject() {
    setTimeout(() => {
      setIsLoadingProject(true);
    }, 200);

    let newProject = await getNewProjectInfo();
    if (newProject !== "NoScript") {
      newProject = newProject as ProjectInfo;
      newProject = {
        ...(newProject as ProjectInfo),
        characters: newProject.characters.map((character) =>
          cleanText(character)
        ),
      } as ProjectInfo;

      setProjectToStorage(newProject);
      setProjects([...projects, newProject]);
    }
    if (newProject) {
      setTimeout(() => {
        setIsLoadingProject(false);
      }, 200);
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
          <Pressable
            key={index}
            onPress={item.onPress}
            unstable_pressDelay={100}
            style={({ pressed }) => [
              styles.project,
              pressed && styles.projectPressed,
            ]}
          >
            <Text
              style={styles.projectText}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {item.text}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
      <Modal
        transparent={true}
        visible={isLoadingProject}
        animationType="fade"
        statusBarTranslucent
      >
        <View style={styles.overlay}>
          <View style={styles.loadingBox}>
            <ActivityIndicator size={40} color={colors.textColor} />
            <Text style={styles.loadingText}>Loading Script</Text>
            <Text style={styles.loadingText}>
              Please note this can take up to two minutes
            </Text>
          </View>
        </View>
      </Modal>
      <Pressable
        style={({ pressed }) => [
          styles.addProject,
          pressed && styles.addProjectPressed,
        ]}
        onPress={addProject}
      >
        <Text style={styles.addProjectText}>+</Text>
      </Pressable>
    </View>
  );
}
