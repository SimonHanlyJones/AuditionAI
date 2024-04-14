import { StyleSheet } from "react-native";

const colors = {
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
  addProject: {
    marginHorizontal: 30,
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
});
