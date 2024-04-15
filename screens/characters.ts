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

  // starting with simple parsing, can do more robust parsing if needed
  // personalityTraits

  // try {
  //   character.personalityTraits = jsonResponse["Personality Traits"].map(
  //     (personalityTraits: { trait: string; description: string }[]) => {
  //       return {
  //         trait: personalityTraits.Trait,
  //         description: personalityTraits.Description,
  //       };
  //     }
  //   );
  // } catch (error) {
  //   console.log("Failed to process personality traits data");
  // }

  // // physicalTraits
  // try {
  //   character.personalityTraits = jsonResponse["Personality Traits"].map(
  //     (personalityTraits) => {
  //       return {
  //         trait: personalityTraits.Trait,
  //         description: personalityTraits.Description,
  //       };
  //     }
  //   );
  // } catch (error) {
  //   console.log("Failed to process physical traits data");
  // }

  // // mainRelationships
  // try {
  //   character.physicalTraits = jsonResponse["Physical Traits"];
  // } catch (error) {
  //   console.log("Failed to process main relationships data");
  // }

  // // characterArc
  // try {
  //   character.characterArc = jsonResponse["Emotional/Character Arc"];
  // } catch (error) {
  //   console.log("Failed to process character arc data");
  // }

  // // importantScenes
  // try {
  //   character.importantScenes = jsonResponse["Important Scenes"].map(
  //     (scene) => {
  //       return {
  //         title: scene.Scene,
  //         description: scene.Description,
  //       };
  //     }
  //   );
  // } catch (error) {
  //   console.log("Failed to process important scenes data");
  // }

  // // additionalScenes
  // try {
  //   character.additionalScenes = jsonResponse["Scene Appearances"].map(
  //     (scene) => {
  //       return {
  //         title: scene.Scene,
  //         description: "",
  //       };
  //     }
  //   );
  // } catch (error) {
  //   console.log("Failed to process additional scenes data");
  // }

  // // otherInsights
  // try {
  //   character.otherInsights = jsonResponse["Other Insights"];
  // } catch (error) {
  //   console.log("Failed to process other insights data");
  // }
}

const CHARACTER_INFO = {
  characterOverview:
    "Elizabeth Bennet is a highly intelligent, quick-witted, independent-minded young woman with a sharp tongue and a lively spirit. She is the second of five Bennet sisters, and she is determined to marry for love and not for money or social status.",
  sceneAppearances: [
    {
      number: 1,
      scene:
        "Elizabeth walks through a field of tall meadow grass. She is reading a novel entitled 'First Impressions'.",
    },
    {
      number: 2,
      scene:
        "Elizabeth jumps up onto a wall and crosses the moat by walking a wooden plank duck board.",
    },
    {
      number: 3,
      scene:
        "Elizabeth walks passed the back of the house where, through an open window to the library, we see her mother and father, Mr and Mrs Bennet.",
    },
    {
      number: 4,
      scene: "Elizabeth enters the house.",
    },
    {
      number: 5,
      scene: "Elizabeth and Mr. Darcy meet at a ball.",
    },
    {
      number: 6,
      scene: "Elizabeth rejects Mr. Collins's proposal.",
    },
    {
      number: 7,
      scene: "Elizabeth visits Mr. Darcy's estate, Pemberley.",
    },
    {
      number: 8,
      scene: "Elizabeth accepts Mr. Darcy's proposal.",
    },
  ],
  otherInsights:
    "Elizabeth Bennet is a complex and well-developed character. She is a strong and independent woman who is not afraid to stand up for what she believes in. She is also a kind and compassionate person who is always there for her friends and family.",
};
