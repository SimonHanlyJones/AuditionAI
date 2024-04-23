import { SceneScript, Dialogue } from "@/screens/ProjectScreen/TabContext";

export async function consolidateDialogue(
  sceneScript: SceneScript
): Promise<SceneScript> {
  const consolidatedDialogue: Dialogue[] = [];
  let lastDialogue: Dialogue | null = null;

  for (const line of sceneScript.dialogue) {
    if (
      lastDialogue &&
      line.character.toUpperCase() === lastDialogue.character.toUpperCase()
    ) {
      // Append the current line's text to the last dialogue in the array with a newline in between
      lastDialogue.text += "\n\n" + line.text;
    } else {
      // Push the lastDialogue to consolidatedDialogue if it's not null
      if (lastDialogue) {
        consolidatedDialogue.push(lastDialogue);
      }
      // Start a new dialogue group
      lastDialogue = { ...line };
    }
  }

  // Don't forget to push the last dialogue group if it exists
  if (lastDialogue) {
    consolidatedDialogue.push(lastDialogue);
  }

  return { dialogue: consolidatedDialogue };
}

export async function removeTextInBrackets(
  sceneScript: SceneScript
): Promise<SceneScript> {
  const updatedDialogues = sceneScript.dialogue.map((dialogue) => {
    const newText = dialogue.text
      .replace(/\(.*?\)/g, "")
      .replace(/\[.*?\]/g, "")
      .trim();
    return {
      ...dialogue,
      text: newText,
    };
  });

  return {
    dialogue: updatedDialogues,
  };
}
