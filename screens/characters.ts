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
): Promise<CharacterInfo> {
  const jsonResponse = await getCharacterAnalysis(projectScript, characterName);
  const character: CharacterInfo = {
    ...{ name: characterName },
    ...jsonResponse,
  } as CharacterInfo;
  return character;
}
