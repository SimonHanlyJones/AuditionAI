import { useCallback } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { View } from "react-native";
import { abortGemini } from "@/utlis/geminiUtlis";
import { useNavigation } from "@react-navigation/native";

function HardwareBackButtonHandler() {
  const navigation = useNavigation();
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log("HARDWARE Back button pressed");
        abortGemini();
        navigation.goBack();
        return true; // blocks default behavior to proceed.
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  return <View></View>;
}

export default HardwareBackButtonHandler;
