import { getScriptAndConvert, getTitleAndCharacters } from '@/utlis/apiUtlis';

export interface ProjectInfo {
  title: string;
  script: string; // text or path to script
  characters: string[];
}

export async function getNewProjectInfo() {
  const script = await getScriptAndConvert();
  const titleAndCharacters = await getTitleAndCharacters(script);

  if (!titleAndCharacters.characters || !titleAndCharacters.title || !script) {
    throw new Error('Missing information from API');
  }

  const newProject: ProjectInfo = {
    title: titleAndCharacters.title,
    script: script,
    characters: titleAndCharacters.characters,
  };
  return newProject
}


export function getProjects(): ProjectInfo[] {
  
  // TODO: get projects from storage
  // TEMP: returning hard coded data
  return [
    {
      title: "Dude Where's my Car",
      script: "",
      characters: ["Elizabeth Bennet", "Mr Bennet", "Mrs Bennet"],
    },
    {
      title: "Step Brothers",
      script: "",
      characters: ["Elizabeth Bennet", "Mr Bennet", "Mrs Bennet"],
    },
    {
      title: "Sister Act 2: More Sister Act 1",
      script: "",
      characters: ["Elizabeth Bennet", "Mr Bennet", "Mrs Bennet"],
    },
  ];
}
