import React from "react";
import { useNavigation } from "@react-navigation/native";
import { abortGemini } from "@/utlis/geminiUtlis";
import { HeaderBackButton } from "@react-navigation/elements";
// Custom Back Button component
function CustomHeaderBackButton() {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log("Header back button pressed");
    abortGemini();
    navigation.goBack();
  };

  return <HeaderBackButton onPress={handlePress} />;
}
export default CustomHeaderBackButton;
