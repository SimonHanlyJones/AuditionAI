# Audition AI
Ryan Mann
Simon Hanly-Jones
Emmanuel Isaac

Welcome to Audition AI powered by Google Gemini AI and Vertex AI.

## Core features

This project aims to help actors learn about characters in order to prepare for performances and auditions. The concept is to provide the actor with three tools:
1. An informative breakdown of their chosen character
2. The full text of any scene that they wish to rehearse
3. A teleprompter like service to help with rehearsing and learning lines

We have made a React-Native android app that leverages Gemini AI (Gemini Pro 1.5) and Vertex AI (voice synthesis) to achieve this.

### Character Breakdown

INSERT SCREENSHO

The idea is to give the actor a comprehensive picture of their character so that they can portray them in a way that makes sense with the rest of the story .

The actor is proved with a detailed breakdown of their chosen character with the following headings:
1. Character Overview
2. Personality Traits
3. Physical Traits
4. Costume Choices 
5. Main Relationships
6. Character Arc
7. Scene Appearances
8. Important Scenes
9. Other Insights

#### How is it done?
The character analysis is obtained by using Gemini Pro 1.5. The entire script for the project is passed into the model with a prompt requesting the analysis. This makes use of the industry leading context size of Gemini Pro 1.5. Other models would simply not be able to analyse the entire script.

Gemini Pro 1.5 returns a JSON object containing the Character Analysis organised under the heading set out above. It has demonstrated very reliable character analysis.
### Scene Extraction

SCREENSHOT

We then provide the actor with the  script from any scene that they wish to learn/ analyse. This is provided for easy access and convenience for the actor so that they can focus only on the next scene they have to perform.
#### How is it done?
Again Gemini Pro 1.5 is provided the entire script, and asked to return a specific scene in a JSON format.
### Performance/ Line Learning

SCREENSHOT

The final core feature of our app is performance/ Line Learning. The objective is to allow actors to practice their scenes with AI actors so they  can learn their lines more easily. We provide a unique voice id to each 'non-player character' which then uses Vertex AI's voice synthesis model to generate a consistent voice for that character.
When it is the user's turn to perform a line we use Speech to Text functionality to identify when the user is finished talking and the other AI actors should proceed. 
## User Flow
The user is first promoted to select a script, usually from a play or movie, from their device.

SCREENSHOT

This will the present the user a list of the characters in the script, the user then choses their character.

SCREENSHOT

The user then choses their audition scene, or the scene they they want to practice.

SCREENSHOT

The core functions show above are then made available to the user.

## Technical Details
As mentioned above, the app relies on;
1. React Native on the frontend, HTTPS requests are made to the backend
2. Google Firebase Functions are used as a backend wrapper, to securely store the API keys for for Gemini AI and Vertex AI. These functions take the HTTPS requests from the frontend, and format them and pass them to the Google API's for Gemini AI and Vertex AI. In this way, the API keys are not exposed to the user.  
### Data Flowchart
The flow data is shown on this flowchart:

FLOWCHART
### React Native Environment notes
The project uses React Native Expo with EAS. Expo is a platform that abstracts away much of the native code requirements of react native. EAS is an addition feature that allows the use of additional libraries. 

# Installation Instructions
