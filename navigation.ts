import { ProjectInfo } from "@/screens/projects";
import { CharacterInfo } from "@/screens/characters";
import { SceneInfo } from "@/screens/scenes";

import {
  useNavigation as useReactNavigation,
  useRoute as useReactRoute,
  ParamListBase,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export enum Screens {
  ProjectSelect = "ProjectSelect",
  CharacterSelect = "CharacterSelect",
  SceneSelect = "SceneSelect",
  Project = "Project",
}

interface NavigatorParamList extends ParamListBase {
  ProjectSelect: undefined;
  CharacterSelect: { project: ProjectInfo };
  SceneSelect: { project: ProjectInfo; character: CharacterInfo };
  Project: {
    project: ProjectInfo;
    character: CharacterInfo;
    scene: SceneInfo;
  };
}

export const useNavigation = <T extends Screens>(): StackNavigationProp<
  NavigatorParamList,
  T
> => {
  return useReactNavigation();
};

export const useRoute = <T extends Screens>(): {
  key: string;
  name: T;
  params: NavigatorParamList[T];
} => {
  return useReactRoute();
};
