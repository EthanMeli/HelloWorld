// styles/profile.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 0,
    paddingTop: 16
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  lessonNumber: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  snippet: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  lessonButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonButtonText: {
    color: COLORS.white,
    fontWeight: "600",
  },
  listContent: {
    paddingBottom: 100
  },
  chatContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  messageContainer: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  leftMessage: {
    alignItems: 'flex-start',
  },
  rightMessage: {
    alignItems: 'flex-end',
  },
  speakerName: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 4,
    marginHorizontal: 12,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  leftBubble: {
    backgroundColor: COLORS.cardBackground,
    borderBottomLeftRadius: 4,
  },
  rightBubble: {
    backgroundColor: COLORS.textSecondary,
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  leftTranslationText: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    opacity: 0.7,
  },
  rightTranslationText: {
    fontSize: 12,
    color: COLORS.white,
    fontStyle: 'italic',
    opacity: 0.7,
  },
});

export default styles;