

import { callHelloWorldFunction, getScriptAndConvert, getAnalysis, getTitleAndCharacters } from '@/utlis/apiUtlis';

import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';


export const HelloWorldButtonFromAPI = () => {
  return <Button title="Call API" onPress={callHelloWorldFunction} />;
};

export const getScriptAndConvertButton = () => {
  return <Button title="get PDF ot Txt Script" onPress={getScriptAndConvert} />;
};

export const getTitleAndCharactersButton = (script: string) => {
  return <Button title="Get Title and Characters" onPress={() => getTitleAndCharacters(script)} />;
}

export const getAnalysisButton = (script: string, character: string) => {
  return <Button title="Provide a Character and get an Analysis" onPress={() => getAnalysis(script, character)} />;
};


export const ScriptAnalysisComponentDemoComponent = () => {
  const [script, setScript] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [characters, setCharacters] = useState<string[]>([]);
  const [selectedCharacter, setSelectedCharacter] = useState<string>('');
  const [analysis, setAnalysis] = useState<any>(null);

  const handleScriptSelection = async () => {
    // Your logic to select and set the script
    const selectedScript = await getScriptAndConvert();
    setScript(selectedScript);
  };

  const fetchTitleAndCharacters = async () => {
    if (!script) {
      alert("Please select a script first.");
      return;
    }
    const response = await getTitleAndCharacters(script);

  
    // Initialize characterArray as an empty array

    let characterArray: string[] = [];
  
    if (response) {
      // If characters is a string, try parsing it as JSON
      try {
        setTitle(response.title || 'No title');
        const parsed = response.characters;
        // Ensure the parsed result is an array
        if (Array.isArray(parsed)) {
          characterArray = parsed;
        }
      } catch (error) {
        console.error('Parsing error: ', error);
      }
    } else if (Array.isArray(response.characters)) {
      // If characters is already an array, use it directly
      characterArray = response.characters;
    }
  
    // Now characterArray should be an array
    setCharacters(characterArray);
    if (characterArray.length > 0) {
      setSelectedCharacter(characterArray[0]);
    } else {
      // Handle the case where no valid characters are available
      console.error('No valid characters found');
    }
  };
  const performAnalysis = async () => {
    if (!selectedCharacter || !script) {
      alert("Please select a script and a character.");
      return;
    }
    try {
      const analysisData = await getAnalysis(script, selectedCharacter);
      setAnalysis(analysisData);  // Update the state with the fetched analysis data
      console.log(analysisData);
    } catch (error) {
      console.error('Error performing analysis:', error);
      // Handle errors, e.g., display an error message
    }
  };
  return (
    <View>
      <Button title="Get PDF or Txt Script" onPress={handleScriptSelection} />
      {script && (
        <Button title="Get Title and Characters" onPress={fetchTitleAndCharacters} />
      )}
      {characters.length > 0 && (
        <View>
          <Text>{title} -Select a Character:</Text>
          <Picker
            selectedValue={selectedCharacter}
            onValueChange={(itemValue: any, itemIndex: any) =>
              setSelectedCharacter(itemValue)
            }>
            {characters.map((character, index) => (
              <Picker.Item key={index} label={character} value={character} />
            ))}
          </Picker>
          <Button
            title="Provide a Character and get an Analysis"
            onPress={performAnalysis}
            />
            {analysis && (
              <View>
                <Text>Character Overview: {analysis.CharacterOverview}</Text>
              </View>
            )}
        </View>
      )}
    </View>
  );
};

