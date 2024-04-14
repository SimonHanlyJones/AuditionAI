import {
  ProjectSelectScreen,
  CharacterSelectScreen,
  SceneSelectScreen,
  ProjectScreen,
} from "@/screens";
import { useState, useEffect } from "react";
import { View, Text} from "react-native";
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { navigationStyle } from "@/primitives";
import { styles } from "@/primitives";

import { getScriptAndConvert } from "./utlis/apiUtlis";

const Stack = createStackNavigator();

export default function App() {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashScreen}>
        <Text style={styles.splashScreenText}>AuditionAI</Text>
      </View>
    );
  }

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
            title: "Projects"
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
