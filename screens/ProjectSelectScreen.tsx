import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useNavigation, Screens } from "@/navigation";
import { COLORS, PALETTE, BASE_STYLES } from "@/primitives";
import { getProjects } from "./projects";
import { ButtonList } from "@/components/ButtonList";

import { ScriptAnalysisComponentDemoComponent } from '@/components/testButtons';

export function ProjectSelectScreen() {
  const navigation = useNavigation<Screens.ProjectSelect>();

  const [projects, setProjects] = useState(getProjects());

  return (
    <View style={BASE_STYLES.screenContainer}>
      <ScriptAnalysisComponentDemoComponent />
      <ButtonList
        items={projects.map((project) => ({
          text: project.title,
          onPress: () => navigation.navigate("CharacterSelect", { project }),
        }))}
      />
      {/* TODO: below button should have a modal popup which handles the 'add project' flow */}
      <View style={{ width: "100%" }}>
        <TouchableOpacity style={styles.addProjectButton}>
          <Text
            style={{ color: PALETTE.DARKEST, fontSize: 18, fontWeight: "bold" }}
          >
            Add Project
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addProjectButton: {
    backgroundColor: COLORS.importantPrimary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    margin: 8,
  },
});
