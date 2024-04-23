import React, { useState, useEffect } from "react";
import { Button, Text, View, LogBox } from "react-native";
import Voice from "@react-native-voice/voice";
import { styles, colors } from "@/primitives";

LogBox.ignoreLogs(["new NativeEventEmitter"]);

interface VoiceRecognitionProps {
  isListening: boolean; // The state passed from the parent
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onResult: (text: string) => void;
  onError: (error: string) => void;
}

function VoiceRecognition(props: VoiceRecognitionProps) {
  // const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");

  const handleRecognizedText = (recognizedText: string) => {
    console.log(recognizedText);
    setRecognizedText(recognizedText);

    props.onResult(recognizedText);
  };

  const onSpeechResults = (e: any) => {
    console.log("Speech results.");
    if (e.value && e.value.length > 0) {
      const recognizedText = e.value[0];
      handleRecognizedText(recognizedText);
    }
    props.setIsListening(false);
  };

  const onSpeechError = (error: any) => {
    console.log("Speech recognition error:", error);
    if (error && error.error.message === "7/No match") {
      // Handle the timeout
      props.setIsListening(false);
    } else {
      props.setIsListening(false);
    }
  };

  //   if we have recongised text, and we are wating for user, then we can let the user continue and clear the text

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (props.isListening) {
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;
      startListening();
    }
    if (!props.isListening) {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [props.isListening]);

  const startListening = () => {
    Voice.start("en-AU");
  };

  async function stopListening() {
    await Voice.stop();
    props.setIsListening(false);
  }

  // return (
  //   <View>
  //     <Button
  //       title={props.isListening ? "Stop Listening" : "Start Listening"}
  //       onPress={
  //         props.isListening ? stopListening : () => props.setIsListening(true)
  //       }
  //     />
  //     <Text style={styles.text}>Recognized Text: {recognizedText}</Text>
  //   </View>
  // );
}

export default VoiceRecognition;
