import {
  ProjectSelectScreen,
  CharacterSelectScreen,
  SceneSelectScreen,
  ProjectScreen,
} from "@/screens";
import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import { navigationStyle } from "@/primitives";
import { styles } from "@/primitives";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomHeaderBackButton from "@/components/HeaderBackButton";
import { loadResourcesAndDataAsync } from "./utlis/generalUtils";

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  // UNCOMMENT BELOW TO CLEAR ASYNC STORAGE
  // useEffect(() => {
  //   const clearStorage = async () => {
  //     try {
  //       await AsyncStorage.clear();
  //       console.log("AsyncStorage was cleared!");
  //     } catch (e) {
  //       // handling exception
  //       console.error("Failed to clear the async storage.", e);
  //     }
  //   };

  //   clearStorage();
  // }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  loadResourcesAndDataAsync();

  if (isLoading) {
    return (
      <View style={styles.splashScreen}>
        <StatusBar style="light" />
        <Text style={styles.splashScreenText}>AuditionAI</Text>
      </View>
    );
  }

  return (
    <NavigationContainer theme={navigationStyle}>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="ProjectSelect"
        screenOptions={{
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="ProjectSelect"
          component={ProjectSelectScreen}
          options={{
            title: "Projects",
          }}
        />
        <Stack.Screen
          name="CharacterSelect"
          component={CharacterSelectScreen}
          options={{
            title: "Select Character",
            headerLeft: (props) => <CustomHeaderBackButton {...props} />,
          }}
        />
        <Stack.Screen
          name="SceneSelect"
          component={SceneSelectScreen}
          options={{
            title: "Select Scene",
            headerLeft: (props) => <CustomHeaderBackButton {...props} />,
          }}
        />
        <Stack.Screen
          name="Project"
          component={ProjectScreen}
          options={{
            title: "Project",
            headerLeft: (props) => <CustomHeaderBackButton {...props} />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
