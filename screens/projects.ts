export interface ProjectInfo {
  title: string;
  script: string; // text or path to script
  characters: string[];
}

export function getProjects(): ProjectInfo[] {
  // TODO: get projects from storage
  // TEMP: returning hard coded data
  return [
    {
      title: "Pride and Prejudice",
      script: "",
      characters: ["Elizabeth Bennet", "Mr Bennet", "Mrs Bennet"],
    },
  ];
}
