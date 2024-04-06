import React from 'react';
import { Button } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';

const GetPDFButton = () => {
  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
    });

    if (result.type === 'success') {
      console.log(result.uri);
      // Handle the PDF URI (e.g., display it, upload it, etc.)
    }
  };

  return <Button title="Get PDF" onPress={pickDocument} />;
};

export default GetPDFButton;