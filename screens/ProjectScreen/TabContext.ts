import { createContext } from "react";
import { type ProjectInfo } from "../projects";
import { type CharacterInfo } from "../characters";
import { type SceneInfo } from "../scenes";

export type TabContextInfo = {
  project: ProjectInfo;
  character: CharacterInfo;
  scene: SceneInfo;
  sceneScript?: {
    dialog: { character: string; text: string; gender: string }[];
  };
  sceneScriptLoading: boolean;
};

type SetTabContextInfo = (info: TabContextInfo) => void;

export const TabContext = createContext<
  { info: TabContextInfo; setInfo: SetTabContextInfo } | undefined
>(undefined);
