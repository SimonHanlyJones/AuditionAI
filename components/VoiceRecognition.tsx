import React, { useState, useEffect } from "react";
import { View, LogBox } from "react-native";
import Voice from "@react-native-voice/voice";

LogBox.ignoreLogs(["new NativeEventEmitter"]);

interface VoiceRecognitionProps {
  isListening: boolean; // The state passed from the parent
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  onResult: (text: string) => void;
  onPartialResult: (text: string) => void;
  onError: (error: string) => void;
}

function VoiceRecognition(props: VoiceRecognitionProps) {
  // const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [partialText, setPartialText] = useState("");

  const handleRecognizedText = (recognizedText: string) => {
    // console.log(recognizedText);
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

  const onSpeechPartialResults = (e: any) => {
    // console.log("Partial speech results.");
    if (e.value && e.value.length > 0) {
      setPartialText(e.value[0]); // Update partial text state
      props.onPartialResult(e.value[0]);
    }
  };

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    if (props.isListening) {
      Voice.onSpeechResults = onSpeechResults;
      Voice.onSpeechPartialResults = onSpeechPartialResults;
      Voice.onSpeechError = onSpeechError;
      startListening();
    }
    if (!props.isListening) {
      stopListening();
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

  return <View></View>;
}

export default VoiceRecognition;
