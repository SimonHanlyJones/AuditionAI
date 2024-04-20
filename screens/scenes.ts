export interface SceneInfo {
  number: number;
  scene: string;
}

export interface SceneScriptInfo {
  dialogue: {
    character: string;
    text: string;
    gender: string;
  }[];
}
