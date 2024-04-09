import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/core";

export function CharacterSelectScreen() {
  const navigation =
    useNavigation<NavigationProp<Record<string, object | undefined>>>();

  return (
    <View style={styles.container}>
      <Text>CHARACTER SELECT</Text>
      <Button title="GO BACK" onPress={() => navigation.navigate("Project")} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
