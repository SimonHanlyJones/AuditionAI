import {
  ProjectSelectScreen,
  CharacterSelectScreen,
  SceneSelectScreen,
  ProjectScreen,
} from "@/screens";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationStyle } from "@/primitives";
import { styles } from "@/primitives";
import { TouchableOpacity, Text } from "react-native";

import { getScriptAndConvert } from "./utlis/apiUtlis";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer theme={navigationStyle}>
      <Stack.Navigator
        initialRouteName="ProjectSelect"
        screenOptions={{
          headerTitleAlign: 'center'
        }}
      >
        <Stack.Screen
          name="ProjectSelect"
          component={ProjectSelectScreen}
          options={{ 
            title: "Projects", 
            headerRight: () => (
              <TouchableOpacity
                style={styles.addProject}
                onPress={getScriptAndConvert}
              >
                <Text style={styles.addProjectText}>+</Text>
              </TouchableOpacity>
            )
          }}
        />
        <Stack.Screen
          name="CharacterSelect"
          component={CharacterSelectScreen}
          options={{ title: "Select Character" }}
        />
        <Stack.Screen
          name="SceneSelect"
          component={SceneSelectScreen}
          options={{ title: "Select Scene" }}
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
