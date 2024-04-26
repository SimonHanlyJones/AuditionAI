import {
  getScriptAndConvert,
  getTitleAndCharacters,
} from "@/utlis/geminiUtlis";

export interface ProjectInfo {
  title: string;
  script: string; // text or path to script
  characters: string[];
}

export async function getNewProjectInfo() {
  const script = await getScriptAndConvert();

  // //////////////////////////////
  if (!script) {
    // alert("No script selected, please select a script.");
    return "NoScript";
  }
  // //////////////////////////////

  const titleAndCharacters = await getTitleAndCharacters(script);

  if (!titleAndCharacters.characters || !titleAndCharacters.title || !script) {
    throw new Error("Missing information from API");
  }

  const newProject: ProjectInfo = {
    title: titleAndCharacters.title,
    script: script,
    characters: titleAndCharacters.characters,
  };
  return newProject;
}
