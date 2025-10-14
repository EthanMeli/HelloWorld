// styles/lesson.styles.js - Medieval RPG Edition
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

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
    borderRadius: 12, // Rounded corners for cleaner look
    padding: 16,
    marginBottom: 16,
    // Elegant shadow effect
    shadowColor: COLORS.accent, // Golden shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    // Medieval styling - elegant border
    borderWidth: 2,
    borderColor: COLORS.accent, // Golden border
  },
  lessonInfo: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent, // Golden color
    marginBottom: 8,
    fontFamily: "serif", // More elegant font
    letterSpacing: 0.5,
    lineHeight: 28,
    textTransform: "uppercase",
    textShadowColor: 'rgba(255, 215, 0, 0.3)', // Elegant golden shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  lessonNumber: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
    fontFamily: "serif",
  },
  snippet: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: "serif",
    fontStyle: "italic",
  },
  lessonButton: {
    backgroundColor: COLORS.primary, // Dark goldenrod
    borderRadius: 8, // Rounded corners
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    // Elegant shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  lessonButtonText: {
    color: COLORS.white, // White text
    fontWeight: "600",
    fontFamily: "serif",
    textTransform: "uppercase",
  },
  listContent: {
    paddingBottom: 100,
  },
  // Lesson completion styles
  completedCard: {
    borderColor: COLORS.accent,
    backgroundColor: 'rgba(255, 215, 0, 0.05)', // Light golden background
  },
  completedBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  completedLabel: {
    color: COLORS.background,
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
    fontFamily: 'serif',
  },
  completedLessonButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.accent,
  },
  completedLessonButtonText: {
    color: COLORS.accent,
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
    fontFamily: "serif",
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 8, // Rounded corners for cleaner look
    borderWidth: 1,
    elevation: 3,
    // Elegant shadow
    shadowColor: COLORS.accent, // Golden shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  leftBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.accent, // Golden border
  },
  rightBubble: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.secondary, // Goldenrod border
  },
  messageText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 6,
    fontFamily: "serif",
    lineHeight: 20,
  },
  leftTranslationText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 215, 0, 0.3)', // Golden
    fontFamily: "serif",
  },
  rightTranslationText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    opacity: 0.8,
    marginTop: 4,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(218, 165, 32, 0.3)', // Goldenrod
    fontFamily: "serif",
  },
  
  // RPG Dialogue Styles
  rpgDialogueContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  characterArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  characterIndicator: {
    backgroundColor: COLORS.cardBackground,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    minWidth: 200,
    alignItems: 'center',
  },
  characterLeft: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  characterRight: {
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontFamily: 'serif',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textShadowColor: 'rgba(255, 215, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  characterPosition: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'serif',
    marginTop: 5,
    fontStyle: 'italic',
  },
  dialogueBox: {
    backgroundColor: COLORS.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: COLORS.accent,
    minHeight: 200,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  dialogueContent: {
    padding: 20,
    flex: 1,
  },
  speakerLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontFamily: 'serif',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  dialogueText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    lineHeight: 26,
    marginBottom: 15,
    minHeight: 60,
  },
  translationText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'serif',
    fontStyle: 'italic',
    opacity: 0.9,
    marginBottom: 15,
    minHeight: 20,
  },
  continueIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  continueText: {
    fontSize: 12,
    color: COLORS.accent,
    fontFamily: 'serif',
    marginLeft: 5,
    fontStyle: 'italic',
  },
});

export default styles;