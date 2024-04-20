import AsyncStorage from "@react-native-async-storage/async-storage";
import type { ProjectInfo } from "./screens/projects";
import type { CharacterInfo } from "./screens/characters";
import type { SceneScriptInfo } from "./screens/scenes";

// TODO: make this hacky storage more robust
const STORAGE_PREFIX = "auditionAIData_";
const SEPARATOR = "_@_";

async function storeData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(STORAGE_PREFIX + key, jsonValue);
  } catch (e) {
    console.log("Failed to store data", key, value);
  }
}

async function retrieveData<T>(key: string): Promise<T | undefined> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_PREFIX + key);
    return jsonValue != null ? (JSON.parse(jsonValue) as T) : undefined;
  } catch (e) {
    return undefined;
  }
}

const getAllKeys = async () => {
  try {
    const keys = (await AsyncStorage.getAllKeys())
      .filter((key) => key.startsWith(STORAGE_PREFIX))
      .map((key) => key.replace(STORAGE_PREFIX, ""));
    console.log("Stored keys:", keys);
    return keys;
  } catch (e) {
    console.log("Failed to fetch the keys", e);
  }
};

export async function getProjectsFromStorage(): Promise<ProjectInfo[]> {
  const allRecords = (await getAllKeys()) || [];

  const allProjects = allRecords.filter(
    (record) => !record.includes(SEPARATOR)
  );

  const allProjectInfo = await Promise.all(
    allProjects.map((project) => {
      return retrieveData<ProjectInfo>(project);
    })
  );
  return allProjectInfo.filter((project) => project !== null) as ProjectInfo[];
}

export async function getCharacterFromStorage(
  projectTitle: string,
  characterName: string
): Promise<CharacterInfo | undefined> {
  return retrieveData<CharacterInfo>(
    `${projectTitle}${SEPARATOR}${characterName}`
  );
}

export async function getSceneScriptFromStorage(
  projectTitle: string,
  characterName: string,
  scene: string
): Promise<SceneScriptInfo | undefined> {
  return retrieveData<SceneScriptInfo>(
    `${projectTitle}${SEPARATOR}${characterName}${SEPARATOR}${scene}`
  );
}

export async function setProjectToStorage(project: ProjectInfo): Promise<void> {
  storeData<ProjectInfo>(project.title, project);
}

export async function setCharacterToStorage(
  projectTitle: string,
  character: CharacterInfo
): Promise<void> {
  storeData<CharacterInfo>(
    projectTitle + SEPARATOR + character.name,
    character
  );
}

export async function setSceneScriptToStorage(
  projectTitle: string,
  characterName: string,
  scene: string,
  sceneScript: SceneScriptInfo
): Promise<void> {
  storeData<SceneScriptInfo>(
    projectTitle + SEPARATOR + characterName + SEPARATOR + scene,
    sceneScript
  );
}
