import { StyleSheet } from "react-native";

export const colors = {
  background: "#130526",
  border: '#59428C',
  flash: '#761DF2',
  textColor: '#F2EFE9'
};

export const styles = StyleSheet.create({
  splashScreen: {
    alignItems: "center",
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderTopWidth: 1,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "100%"
  },
  splashScreenText: {
    color: colors.textColor,
    fontSize: 40,
    textShadowColor: 'rgba(256, 256, 256, 0.2)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 5,
  },
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
    fontSize: 16,
    margin: 10,
  },
  h2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginTop: 15
  },
  h2Text: {
    color: colors.textColor,
    fontSize: 18,
    fontWeight: 'bold',
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
    fontStyle: 'normal',
    fontWeight: 'bold',
    textTransform: 'capitalize',
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
    position: 'absolute',
    right: 24,
    width: 66,
  },
  addProjectPressed: {
    backgroundColor: colors.flash,
  },
  addProjectText: {
    color: colors.textColor,
    fontSize: 36,
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
  overlay: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 150,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 150
  },
  modal: {
    alignItems: 'center',
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 10,
    width: '100%'
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
