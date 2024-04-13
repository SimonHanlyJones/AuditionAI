import { SceneInfo } from "./scenes";

import { getCharacterAnalysis } from "@/utlis/apiUtlis";

export interface CharacterInfo {
  name: string;
  characterOverview: string;
  personalityTraits?: { trait: string; description: string }[];
  physicalTraits?: { trait: string; description: string }[];
  costumeChoices: string,
  mainRelationships?: {
    name: string;
    relationship: string;
    description: string;
  }[];
  emotionalCharacterArc?: string;
  importantScenes?: {scene: string, description: string}[];
  sceneAppearances?: SceneInfo[];
  otherInsights?: string;
}

export async function getCharacterInfo(projectScript: string, characterName: string): Promise<CharacterInfo> {
  const jsonResponse = await getCharacterAnalysis(projectScript, characterName);
  const character: CharacterInfo = {...{name: characterName}, ...jsonResponse} as CharacterInfo;
  return character

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
  "Character Overview":
    "Elizabeth Bennet is a highly intelligent, quick-witted, independent-minded young woman with a sharp tongue and a lively spirit. She is the second of five Bennet sisters, and she is determined to marry for love and not for money or social status.",
  "Personality Traits": [
    {
      Trait: "Intelligence",
      Description:
        "Elizabeth is highly intelligent and well-read. She is quick-witted and has a sharp tongue, which she uses to challenge and outwit others.",
    },
    {
      Trait: "Independence",
      Description:
        "Elizabeth is fiercely independent. She does not conform to societal expectations and she is not afraid to speak her mind.",
    },
    {
      Trait: "Spirit",
      Description:
        "Elizabeth is full of life and spirit. She is always up for a good time and she loves to laugh and dance.",
    },
    {
      Trait: "Stubbornness",
      Description:
        "Elizabeth can be stubborn at times. She is not afraid to stand up for what she believes in, even if it means going against the grain.",
    },
  ],
  "Physical Traits":
    "Elizabeth is described as being attractive, with a good figure and fine features. She has dark hair and eyes, and a lively expression.",
  "Costume Choices":
    "Elizabeth's wardrobe should reflect her personality and her station in life. She should wear simple, yet elegant dresses that are appropriate for the Regency era. Her costumes should also be comfortable and allow her to move freely and easily.",
  "Main Relationships": [
    {
      Name: "Mr. Darcy",
      Relationship: "Elizabeth's love interest",
      Description:
        "Mr. Darcy is a wealthy, handsome, and eligible bachelor. He is initially attracted to Elizabeth's intelligence and wit, but he is also put off by her pride and prejudice. Over time, however, he comes to realize that she is a woman of great worth and he falls in love with her.",
    },
    {
      Name: "Jane Bennet",
      Relationship: "Elizabeth's older sister",
      Description:
        "Jane is Elizabeth's confidante and best friend. She is a beautiful and gentle woman who is loved by all who know her.",
    },
    {
      Name: "Mr. Collins",
      Relationship: "Elizabeth's cousin",
      Description:
        "Mr. Collins is a pompous and obsequious clergyman who is obsessed with social status. He proposes to Elizabeth, but she rejects him because she finds him to be ridiculous.",
    },
  ],
  "Emotional/Character Arc":
    "Elizabeth undergoes a significant emotional journey throughout the course of the novel. She begins as a proud and prejudiced young woman, but she gradually learns to let go of her pride and to see the world in a more open-minded way. She also learns to love Mr. Darcy, despite his initial arrogance and pride.",
  "Important Scenes": [
    {
      Scene: "Elizabeth's first meeting with Mr. Darcy",
      Description:
        "Elizabeth and Mr. Darcy meet at a ball. Elizabeth is initially put off by Mr. Darcy's pride and arrogance, but she is also intrigued by his intelligence and wit.",
    },
    {
      Scene: "Elizabeth's rejection of Mr. Collins's proposal",
      Description:
        "Elizabeth rejects Mr. Collins's proposal because she finds him to be ridiculous.",
    },
    {
      Scene: "Elizabeth's visit to Pemberley",
      Description:
        "Elizabeth visits Mr. Darcy's estate, Pemberley, and she is impressed by its beauty and grandeur. She also begins to see Mr. Darcy in a new light.",
    },
    {
      Scene: "Elizabeth's acceptance of Mr. Darcy's proposal",
      Description:
        "Elizabeth accepts Mr. Darcy's proposal because she has come to realize that she loves him.",
    },
  ],
  "Scene Appearances": [
    {
      Number: "1",
      Scene:
        "Elizabeth walks through a field of tall meadow grass. She is reading a novel entitled 'First Impressions'.",
    },
    {
      Number: "2",
      Scene:
        "Elizabeth jumps up onto a wall and crosses the moat by walking a wooden plank duck board.",
    },
    {
      Number: "3",
      Scene:
        "Elizabeth walks passed the back of the house where, through an open window to the library, we see her mother and father, Mr and Mrs Bennet.",
    },
    {
      Number: "4",
      Scene: "Elizabeth enters the house.",
    },
    {
      Number: "5",
      Scene: "Elizabeth and Mr. Darcy meet at a ball.",
    },
    {
      Number: "6",
      Scene: "Elizabeth rejects Mr. Collins's proposal.",
    },
    {
      Number: "7",
      Scene: "Elizabeth visits Mr. Darcy's estate, Pemberley.",
    },
    {
      Number: "8",
      Scene: "Elizabeth accepts Mr. Darcy's proposal.",
    },
  ],
  "Other Insights":
    "Elizabeth Bennet is a complex and well-developed character. She is a strong and independent woman who is not afraid to stand up for what she believes in. She is also a kind and compassionate person who is always there for her friends and family.",
};
