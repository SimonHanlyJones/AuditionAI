import { StyleSheet } from "react-native";

export const colors = {
  background: "#130526",
  border: '#59428C',
  flash: '#761DF2',
  textColor: '#F2EFE9'
};

export const styles = StyleSheet.create({
  screenContainer: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "column",
    width: "100%"
  },
  loadingBox: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  loadingText: {
    color: colors.textColor,
    margin: 10,
  },
  addProject: {
    alignItems: "center",
    backgroundColor: colors.border,
    borderColor: colors.border,
    borderRadius: 35,
    borderWidth: 2,
    bottom: 20,
    height: 70,
    justifyContent: "center",
    position: 'absolute',
    right: 20,
    width: 70,
  },
  addProjectPressed: {
    backgroundColor: colors.flash,
  },
  addProjectText: {
    color: colors.textColor,
    fontSize: 30,
  },
  project: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16
  },
  projectPressed: {
    backgroundColor: colors.flash,
  },
  projectText: {
    color: colors.textColor,
    fontSize: 16
  },
  character: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16
  },
  characterPressed: {
    backgroundColor: colors.flash,
  },
  characterText: {
    color: colors.textColor,
    fontSize: 16
  },
  scene: {
    alignItems: "center",
    borderColor: colors.border,
    borderBottomWidth: 1,
    justifyContent: "center",
    padding: 16
  },
  scenePressed: {
    backgroundColor: colors.flash,
  },
  sceneText: {
    color: colors.textColor,
    fontSize: 16
  },
  analysisContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  analysis: {
    alignItems: "center",
    aspectRatio: 1,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: "center",
    marginHorizontal: 15,
    margin: 10,
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
    textAlign: 'center'
  },
  ////////////////////////////////////////
  sceneDialogText: {
    color: colors.textColor,
    fontSize: 16,
    marginVertical: 10
  },
  sceneCharacterName: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5
  }
  
});
