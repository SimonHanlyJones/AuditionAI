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
  // TODO?: we might want to just remove/modify brackets for the text-to-speech
  const updatedDialogues = sceneScript.dialogue.map((dialogue) => {
    const newText = dialogue.text
      .replace(/\s+/g, " ") // replace multiple spaces with a single space
      .replace(/\(.*?\)/g, "") // removing () brackets and included text
      .replace(/\[.*?\]/g, "") // removing [] brackets and included text
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
