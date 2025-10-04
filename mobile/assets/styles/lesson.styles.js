// styles/lesson.styles.js - Retro 8-bit Edition
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { pixelText } from "../../constants/retroStyles";

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
    // No border radius for 8-bit look
    padding: 16,
    marginBottom: 16,
    // Pixel shadow effect
    shadowColor: COLORS.accent, // Changed to yellow
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 0, // Sharp shadow for pixel effect
    elevation: 4,
    // Retro styling - thick pixelated border
    borderWidth: 3,
    borderColor: COLORS.accent, // Changed to yellow
    // Pixel perfect corners without radius
    borderRightColor: '#888800', // Darker yellow
    borderBottomColor: '#888800', // Darker yellow
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent, // Changed to yellow
    marginBottom: 8,
    fontFamily: "monospace",
    letterSpacing: 2,
    lineHeight: 24,
    textTransform: "uppercase",
    textShadowColor: 'rgba(255, 255, 0, 0.4)', // Changed to yellow shadow
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
    backgroundColor: COLORS.retroOrange, // Changed to orange
    // No border radius for 8-bit look
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // Retro button styling with pixelated border
    borderWidth: 3,
    borderTopColor: "#FF9933", // Lighter orange
    borderLeftColor: "#FF9933", // Lighter orange
    borderRightColor: "#CC5500", // Darker orange
    borderBottomColor: "#CC5500", // Darker orange
    // Pixel shadow effect
    shadowColor: COLORS.retroOrange,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 4,
  },
  lessonButtonText: {
    color: COLORS.black, // Changed to black
    fontWeight: "600",
    fontFamily: "monospace",
    textTransform: "uppercase",
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
    borderWidth: 2,
    elevation: 3,
    // Pixelated shadow
    shadowColor: COLORS.accent, // Changed to yellow
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 0, // Sharp shadow for pixel effect
  },
  leftBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.accent, // Changed to yellow
    borderRightColor: '#888800', // Darker yellow
    borderBottomColor: '#888800', // Darker yellow
  },
  rightBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.retroOrange, // Changed to orange
    borderRightColor: '#CC5500', // Darker orange
    borderBottomColor: '#CC5500', // Darker orange
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
    borderTopColor: 'rgba(255, 255, 0, 0.2)', // Changed to yellow
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
    borderTopColor: 'rgba(255, 102, 0, 0.2)', // Changed to orange
    fontFamily: "monospace",
    letterSpacing: 1,
  },
});

export default styles;