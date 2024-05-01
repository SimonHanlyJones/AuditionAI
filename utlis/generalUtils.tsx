import { SceneScript, Dialogue } from "@/screens/ProjectScreen/TabContext";

export function consolidateDialogue(sceneScript: SceneScript): SceneScript {
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

export function cleanDialog(sceneScript: SceneScript): SceneScript {
  const updatedDialogues = sceneScript.dialogue
    .map((dialogue) => {
      return {
        ...dialogue,
        character: cleanText(dialogue.character),
        text: cleanText(dialogue.text),
      };
    })
    .filter((dialogue) => dialogue.text.length > 0);

  return {
    dialogue: updatedDialogues,
  };
}

export function cleanText(text: string): string {
  return text
    .replace(/\s+/g, " ") // replace multiple spaces with a single space
    .replace(/\(.*?\)/g, "") // removing () brackets and included text
    .replace(/\[.*?\]/g, "") // removing [] brackets and included text
    .trim();
}
