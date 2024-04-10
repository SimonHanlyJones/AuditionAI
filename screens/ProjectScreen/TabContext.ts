import { createContext } from "react";
import { type ProjectInfo } from "../projects";
import { type CharacterInfo } from "../characters";
import { type SceneInfo } from "../scenes";

type TabContextInfo = {
  project: ProjectInfo;
  character: CharacterInfo;
  scene: SceneInfo;
};

type SetTabContextInfo = (info: TabContextInfo) => void;

export const TabContext = createContext<
  { info: TabContextInfo; setInfo: SetTabContextInfo } | undefined
>(undefined);
