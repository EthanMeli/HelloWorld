// styles/lesson.styles.js - Retro 8-bit Edition
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { pixelText, pixelBorders } from "../../constants/retroStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingHorizontal: 16,
    paddingBottom: 0,
    paddingTop: 16,
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
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 8,
    fontFamily: "monospace",
    letterSpacing: 2,
    lineHeight: 24,
    textTransform: "uppercase",
    textShadowColor: 'rgba(0, 255, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
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
    marginVertical: 10,
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
    color: COLORS.accent,
    marginBottom: 4,
    marginHorizontal: 12,
    ...pixelText.basic,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    // No border radius for pixel look
    ...pixelBorders.thin,
    borderWidth: 2,
    elevation: 3,
    // Pixelated shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 0, // Sharp shadow for pixel effect
  },
  leftBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.primary,
    borderRightColor: '#006600', // Darker shade
    borderBottomColor: '#006600', // Darker shade
  },
  rightBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.secondary,
    borderRightColor: '#660066', // Darker shade
    borderBottomColor: '#660066', // Darker shade
  },
  messageText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 6,
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  leftTranslationText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 255, 0, 0.2)',
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  rightTranslationText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 0, 255, 0.2)',
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});

export default styles;