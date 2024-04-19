import { createContext } from "react";
import { type ProjectInfo } from "../projects";
import { type CharacterInfo } from "../characters";
import { type SceneInfo } from "../scenes";

export type TabContextInfo = {
  project: ProjectInfo;
  character: CharacterInfo;
  scene: SceneInfo;
  sceneScript?: SceneScript;
  sceneScriptLoading: boolean;
  voicesLoading: boolean;
};

export type SceneScript = {
  dialogue: {
    character: string;
    text: string;
    gender: string;
    uri?: string;
    voice?: string;
  }[];
};

type SetTabContextInfo = (info: TabContextInfo) => void;

export const TabContext = createContext<
  { info: TabContextInfo; setInfo: SetTabContextInfo } | undefined
>(undefined);
