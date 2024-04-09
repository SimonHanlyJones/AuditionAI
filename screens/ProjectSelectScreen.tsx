import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core";
import { COLORS, PALETTE } from "@/primitives/colors";

const Projects = [
  { id: "1", name: "Project 1" },
  { id: "2", name: "Project 2" },
  { id: "3", name: "Project 3" },
  // Add more projects as needed
];

export function ProjectSelectScreen() {
  const navigation =
    useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        {[0, 1, 2].map((i) => {
          return (
            <TouchableOpacity
              onPress={() => console.log(`${i} Pressed!`)}
              style={{
                backgroundColor: COLORS.contentPrimary,
                height: 60,
                margin: 4,
                borderColor: COLORS.contentSecondary,
                borderWidth: 4,
              }}
              key={i}
            />
          );
        })}
      </View>
      <View style={{ height: 80 }}>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.importantPrimary,
            borderRadius: 10,
            padding: 10,
            margin: 10,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("CharacterSelect")}
        >
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
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
  },
});
