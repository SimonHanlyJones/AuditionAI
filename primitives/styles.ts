import { StyleSheet } from "react-native";

const colors = {
  black: "#000000",
  flashGreen: '#B9FFE1',
  textGreen: '#95FFE6'
};

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.black,
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  addProject: {
    marginHorizontal: 30,
  },
  addProjectText: {
    color: colors.textGreen,
    fontSize: 30,
  },
  project: {
    alignItems: "center",
    borderColor: colors.textGreen,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15
  },
  projectPressed: {
    backgroundColor: colors.flashGreen,
  },
  projectText: {
    color: colors.textGreen,
    fontSize: 18
  },
  character: {
    alignItems: "center",
    borderColor: colors.textGreen,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15
  },
  characterPressed: {
    backgroundColor: colors.flashGreen,
  },
  characterText: {
    color: colors.textGreen,
    fontSize: 18
  },
  scene: {
    alignItems: "center",
    borderColor: colors.textGreen,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15
  },
  scenePressed: {
    backgroundColor: colors.flashGreen,
  },
  sceneText: {
    color: colors.textGreen,
    fontSize: 16
  },
  analysis: {
    alignItems: "center",
    borderColor: colors.textGreen,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    marginTop: 15,
    padding: 15
  },
  analysisPressed: {
    backgroundColor: colors.flashGreen,
  },
  analysisText: {
    color: colors.textGreen,
    fontSize: 18
  },
});
