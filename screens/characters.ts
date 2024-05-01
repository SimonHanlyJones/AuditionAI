import { SceneInfo } from "./scenes";

import { getCharacterAnalysis } from "@/utlis/geminiUtlis";

export interface CharacterInfo {
  name: string;
  characterOverview?: string;
  personalityTraits?: { trait: string; description: string }[];
  physicalTraits?: { trait: string; description: string }[];
  costumeChoices?: string;
  mainRelationships?: {
    name: string;
    relationship: string;
    description: string;
  }[];
  emotionalCharacterArc?: string;
  importantScenes?: { scene: string; description: string }[];
  sceneAppearances?: SceneInfo[];
  otherInsights?: string;
}
export async function getCharacterInfo(
  projectScript: string,
  characterName: string
): Promise<CharacterInfo | undefined> {
  try {
    const jsonResponse = await getCharacterAnalysis(
      projectScript,
      characterName
    );
    if (jsonResponse) {
      const character: CharacterInfo = {
        ...{ name: characterName },
        ...jsonResponse,
      };
      return character;
    } else {
      return undefined; // Return undefined if the response doesn't exist or is invalid
    }
  } catch (error) {
    console.error("Error fetching character analysis:", error);
    return undefined; // Return undefined in case of an error
  }
}
