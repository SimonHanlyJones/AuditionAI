# Audition AI
Simon Hanly-Jones

Ryan Mann

Emmanuel Isaac

Google Cloud ID: audition-a-i-ak9x5l
Google Firebase ID: audition-a-i-ak9x5l

Welcome to Audition AI powered by Google Gemini AI and Vertex AI.

Video Demo: [https://youtu.be/tX6t81S99ko](https://youtu.be/NcFlTRPA6xw)

## Core features

This project aims to help actors learn about characters in order to prepare for performances and auditions. The concept is to provide the actor with three tools:
1. An informative breakdown of their chosen character
2. The full text of any scene that they wish to rehearse
3. A teleprompter like service to help with rehearsing and learning lines

We have made a React-Native android app that leverages Gemini AI (Gemini Pro 1.5) and Vertex AI (voice synthesis) to achieve this.

### Character Breakdown
<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/730b69a4-662d-4c1e-ae0c-004456ed1139" width="300">

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/070e550b-7a16-46e7-9268-e4ccba416239" width="300">

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/b1c4db59-ba61-4508-a4dc-9d5b90eca123" width="300">

The idea is to give the actor a comprehensive picture of their character so that they can portray them in a way that makes sense with the rest of the story .

The actor is provided with a detailed breakdown of their chosen character with the following headings:
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

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/5a471791-38d7-4572-ac90-3ffd382606d1" width="300">

We then provide the actor with the script from any scene that they wish to learn/ analyse. This is provided for easy access and convenience for the actor so that they can focus only on the next scene they have to perform.
#### How is it done?
Again Gemini Pro 1.5 is provided the entire script, and asked to return a specific scene in a JSON format.
### Performance/ Line Learning

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/283b1ad2-d52c-4052-932a-c0171a100ea2" width="300">

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/987aa165-190a-49a9-901f-cb9f9eeca30e" width="300">

The final core feature of our app is performance/ line learning. The objective is to allow actors to practice their scenes with AI actors so they can learn their lines more easily. We provide a unique voice id to each 'non-player character' which then uses Vertex AI's voice synthesis model to generate a consistent voice for that character.
When it is the user's turn to perform a line we use Speech to Text functionality to identify when the user is finished talking and the other AI actors should proceed. 
## User Flow
The user is first promoted to select a script, usually from a play or movie, from their device.

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/c0b9dbf1-b67f-4232-91ce-2f0d4f2700a2" width="300">
<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/e0ddf2d7-458e-43c9-b4d0-dc336fde8699" width="300">

This will present the user a list of the characters in the script, the user then chooses their character.

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/cda55018-f396-4ee7-89fe-36e1e071cde4" width="300">

The user then chooses their audition scene, or the scene they they want to practice.

<img src="https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/a4004884-6720-46d2-bd56-b962a6f2260b" width="300">

The core functions shown above are then made available to the user.

## Technical Details
As mentioned above, the app relies on;
1. React Native on the frontend, HTTPS requests are made to the backend
2. Google Firebase Functions are used as a backend wrapper, to securely store the API keys for Gemini AI and Vertex AI. These functions take the HTTPS requests from the frontend, and format them and pass them to the Google API's for Gemini AI and Vertex AI. In this way, the API keys are not exposed to the user.  
### Data Flowchart
The flow data is shown on this flowchart:

![AudtionAI - Data-Flow](https://github.com/SimonHanlyJones/AuditionAI/assets/46434944/6bf53749-73a5-41ab-ab75-ee6bfa3743fd)


### React Native Environment notes
The project uses React Native Expo with EAS. Expo is a platform that abstracts away much of the native code requirements of react native. EAS is an addition feature that allows the use of additional libraries. 

# Installation Instructions
## Preferred Method
1. Our preferred method of installation is for the user to directly download and install the APK file available at this link on their Android phone. This will install our app AuditionAI, which can be run like any other android app without the need for any additional steps
https://expo.dev/accounts/simonhj/projects/AuditionAI/builds/390407f3-12fe-4794-944c-668c2cefa674

2. Download this text file on your phone which contains a script of Romeo and Juliet, which can be used as a demo script for our app's features
   https://drive.google.com/file/d/1oXoQR_ajyewGfu8FnUcBAi_l1jH_nTod/view?usp=sharing

## Non-preferred method: Download Build and Clone Repo
While it is preferred that the user download an run the preview APK at the above link on their android phone, it is also possible to recreate the development environment with the steps below:

### Download development build

1. Set up your computer as an Expo Development Environment by following the steps on this website: https://reactnative.dev/docs/environment-setup?package-manager=yarn&guide=quickstart
2. Install the expo go app on your android phone from the play store. 

3. Download and install this development build of Audition AI, this is a testing build which requires a connection to a computer to work
   https://expo.dev/accounts/simonhj/projects/AuditionAI/builds/e21c87f5-ec7c-4869-aa90-f88ac3ded879

4. Clone this repo on your computer in bash or powershell
```
  git clone https://github.com/SimonHanlyJones/AuditionAI.git
```
5. On your computer computer in bash or powershell enter the project directory
```
	cd AuditionAI
```
5. On your computer install the neccisary dependancies
```
	yarn install
```
6. Connect your android phone with a USB cable 
7. Start the development server, which will launch the app on the phone.
```
	yarn run android
```
8. Download this text file onto your phone which contains a script of Romeo and Juliet, which can be used as a demo script for our app's features
https://drive.google.com/file/d/1oXoQR_ajyewGfu8FnUcBAi_l1jH_nTod/view?usp=sharing
