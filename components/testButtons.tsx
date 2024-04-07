import React from 'react';
import { Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { callHelloWorldFunction } from '@/utlis/apiUtlis';

const HelloWorldButtonFromAPI = () => {
  const pickDocument = async () => {
    
  };

  return <Button title="Call API" onPress={callHelloWorldFunction} />;
};

export default HelloWorldButtonFromAPI;