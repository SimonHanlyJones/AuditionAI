import {
  ProjectSelectScreen,
  CharacterSelectScreen,
  ProjectScreen,
} from "@/screens";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { COLORS } from "./primitives/colors";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator
        initialRouteName="ProjectSelect"
        screenOptions={{
          cardStyle: { backgroundColor: COLORS.screenBackground },
        }}
      >
        <Stack.Screen
          name="ProjectSelect"
          component={ProjectSelectScreen}
          options={{ title: "Projects" }}
        />
        <Stack.Screen
          name="CharacterSelect"
          component={CharacterSelectScreen}
          options={{ title: "Select Character" }}
        />
        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          options={{ title: "Project" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
