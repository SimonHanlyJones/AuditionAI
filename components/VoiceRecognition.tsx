import React, { useState, useEffect } from "react";
import { Button, Text, View, LogBox } from "react-native";
import Voice from "@react-native-voice/voice";
import { styles, colors } from "@/primitives";

LogBox.ignoreLogs(["new NativeEventEmitter"]);

interface VoiceRecognitionProps {
  waitingForUser: boolean;
  setWaitingForUser: (value: boolean) => void;
  onResult: (text: string) => void;
  onError: (error: string) => void;
}

function VoiceRecognition(props: VoiceRecognitionProps) {
  const [isListening, setIsListening] = useState(false);
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
    setIsListening(false);
  };

  const onSpeechError = (error: any) => {
    console.log("Speech recognition error:", error);
    if (error && error.error.message === "7/No match") {
      // Handle the timeout
      Voice.start("en-AU");
      //   setIsListening(false);
    } else {
      setIsListening(false);
    }
  };

  //   start voice regonition when waitingForUser is true
  useEffect(() => {
    if (props.waitingForUser) {
      startListening();
    }
  }, [props.waitingForUser]);

  //   if we have recongised text, and we are wating for user, then we can let the user continue and clear the text

  useEffect(() => {
    if (isListening) {
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechError = onSpeechError;
    }
    if (!isListening) {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, [isListening]);

  const startListening = () => {
    Voice.start("en-AU");
    setIsListening(true);
  };

  async function stopListening() {
    await Voice.stop();
    setIsListening(false);
  }

  return (
    <View>
      <Button
        title={isListening ? "Stop Listening" : "Start Listening"}
        onPress={isListening ? stopListening : startListening}
      />
      <Text style={styles.text}>Recognized Text: {recognizedText}</Text>
    </View>
  );
}

export default VoiceRecognition;
