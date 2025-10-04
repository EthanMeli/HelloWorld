// styles/home.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, 
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "monospace", // Changed to monospace for 8-bit look
    letterSpacing: 1,
    color: COLORS.accent, // Changed from primary (green) to accent (yellow)
    marginBottom: 8,
    textTransform: "uppercase",
    // Add text shadow for pixel effect
    textShadowColor: 'rgba(255, 255, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.retroBlue, // Changed to blue for contrast
    textAlign: "center",
    fontFamily: "monospace", // Added for retro look
  },
  bookCard: {
    backgroundColor: COLORS.cardBackground,
    marginBottom: 20,
    padding: 16,
    // No border radius for 8-bit look
    borderWidth: 3, // Thicker border for pixel look
    borderColor: COLORS.retroOrange, // Changed to orange
    borderRightColor: "#CC5500", // Darker orange
    borderBottomColor: "#CC5500", // Darker orange
    // Pixel shadow effect
    shadowColor: COLORS.retroOrange,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.8,
    shadowRadius: 0, // Sharp shadow for pixel effect
    elevation: 4,
  },
  bookHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    // Add pixel border bottom
    borderBottomWidth: 2,
    borderBottomColor: COLORS.retroBlue,
    paddingBottom: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 36,
    height: 36,
    // No border radius for pixel look
    marginRight: 10,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  username: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.accent,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  bookImageContainer: {
    width: "100%",
    height: 200,
    // No border radius for pixel look
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: COLORS.cardBackground,
    // Add pixel border
    borderWidth: 2,
    borderColor: COLORS.retroBlue,
  },
  bookImage: {
    width: "100%",
    height: "100%",
  },
  bookDetails: {
    padding: 4,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.retroBlue,
    marginBottom: 6,
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  caption: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 8,
    lineHeight: 20,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  date: {
    fontSize: 12,
    color: COLORS.retroOrange,
    fontFamily: "monospace",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 40,
    // Add dashed border for retro look
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.accent,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.accent,
    marginTop: 16,
    marginBottom: 8,
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.retroBlue,
    textAlign: "center",
    fontFamily: "monospace",
  },
  footerLoader: {
    marginVertical: 20,
  },
});

export default styles;