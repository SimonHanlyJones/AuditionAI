import { StyleSheet } from "react-native";

// Original Theme
export const colors = {
  background: "#130526",
  border: "#59428C",
  flash: "#761DF2",
  textColor: "#F2EFE9",
  textHighlight: "#D6BCF9",
};

// Blue Theme
// export const colors = {
//   background: "#010B1E",
//   border: "#003366",
//   flash: "#1D73F2",
//   textColor: "#F2EFE9",
//   textHighlight: "#B0D1F9",
// };

export const navigationStyle = {
  dark: true,
  colors: {
    primary: colors.textColor,
    background: colors.background,
    card: colors.background,
    text: "#FFFFFF",
    border: colors.border,
    notification: "#000000",
  },
};

export const styles = StyleSheet.create({
  splashScreen: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
  },
  splashScreenText: {
    color: colors.textColor,
    fontSize: 40,
    textShadowColor: "rgba(256, 256, 256, 0.2)",
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 5,
  },
  screenContainer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "column",
    width: "100%",
  },
  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  loadingText: {
    color: colors.textColor,
    fontSize: 16,
    margin: 10,
  },
  h2: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    marginTop: 15,
  },
  h2Text: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: "bold",
  },
  textBox: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  text: {
    color: colors.textColor,
    fontSize: 14,
    lineHeight: 20,
  },
  textItem: {
    marginVertical: 3,
  },
  textKey: {
    fontStyle: "normal",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  addProject: {
    alignItems: "center",
    backgroundColor: colors.border,
    borderColor: colors.border,
    borderRadius: 33,
    borderWidth: 2,
    bottom: 24,
    height: 66,
    justifyContent: "center",
    position: "absolute",
    right: 24,
    width: 66,
  },
  addProjectPressed: {
    backgroundColor: colors.flash,
  },
  addProjectText: {
    color: colors.textColor,
    fontSize: 36,
    marginTop: -4,
  },
  project: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16,
  },
  projectPressed: {
    backgroundColor: colors.flash,
  },
  projectText: {
    color: colors.textColor,
    fontSize: 16,
  },
  character: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16,
  },
  characterPressed: {
    backgroundColor: colors.flash,
  },
  characterText: {
    color: colors.textColor,
    fontSize: 16,
  },
  scene: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16,
  },
  scenePressed: {
    backgroundColor: colors.flash,
  },
  sceneText: {
    color: colors.textColor,
    fontSize: 16,
  },
  header: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 12,
  },
  headerCharacter: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: "bold",
    padding: 4,
    textAlign: "center",
  },
  headerScene: {
    color: colors.textColor,
    fontSize: 16,
    padding: 4,
    textAlign: "center",
  },
  analysisContainer: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  analysis: {
    alignItems: "center",
    aspectRatio: 1,
    borderColor: colors.border,
    borderRadius: 20,
    borderWidth: 1,
    justifyContent: "center",
    padding: 10,
    width: 100,
  },
  analysisPressed: {
    backgroundColor: colors.flash,
  },
  analysisIcon: {
    color: colors.textColor,
    margin: 4,
  },
  analysisText: {
    color: colors.textColor,
    fontSize: 12,
    textAlign: "center",
  },
  overlay: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    flex: 1,
    justifyContent: "center",
    paddingBottom: 150,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 150,
  },
  modal: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    width: "100%",
  },
  sceneCharacterName: {
    color: colors.textColor,
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 15,
    marginTop: 15,
    textAlign: "center",
    textTransform: "uppercase",
  },
  sceneDialogText: {
    color: colors.textColor,
    fontSize: 16,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  performItem: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  performCharacter: {
    color: colors.textColor,
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
    textTransform: "uppercase",
    margin: 5,
    opacity: 0.4,
  },
  performLine: {
    color: colors.textColor,
    fontSize: 22,
    fontWeight: "bold",
    opacity: 0.4,
    textAlign: "center",
  },
  performButtons: {
    alignItems: "center",
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
  },
  performButton: {
    alignItems: "center",
    flex: 1,
    height: 60,
    justifyContent: "center",
  },
  performButtonPressed: {
    opacity: 0.4,
  },
  performIcon: {
    color: colors.textColor,
    margin: 0,
  },
});
