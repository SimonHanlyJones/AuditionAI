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
  scriptErrorMessage?: string;
};

export type Dialogue = {
  character: string;
  text: string;
  gender: string;
  uri?: string;
  voice?: string;
};

export type SceneScript = {
  dialogue: Dialogue[];
};

type SetTabContextInfo = (info: TabContextInfo) => void;

export const TabContext = createContext<
  { info: TabContextInfo; setInfo: SetTabContextInfo } | undefined
>(undefined);
