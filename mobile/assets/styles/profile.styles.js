// styles/profile.styles.js - Retro 8-bit Edition
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";
import { pixelBorders } from "../../constants/retroStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.cardBackground,
    padding: 16,
    marginBottom: 16,
    // Retro styling - thick pixelated border
    borderWidth: 4,
    borderColor: COLORS.accent,
    // Pixel perfect corners without radius
    borderRightColor: '#888800', // Darker yellow
    borderBottomColor: '#888800', // Darker yellow
    // Pixel shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 0, // Sharp shadow for pixel effect
    elevation: 4,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  profileInfo: {
    flex: 1,
  },
  username: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.accent, // Changed to yellow for retro look
    marginBottom: 4,
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  email: {
    fontSize: 14,
    color: "#00CCFF", // Cyan for retro look
    marginBottom: 4,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  memberSince: {
    fontSize: 12,
    color: COLORS.textSecondary,
    fontFamily: "monospace",
  },
  logoutButton: {
    backgroundColor: COLORS.retroOrange, // Orange for logout button
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    // Retro button styling with pixelated border
    borderWidth: 3,
    borderTopColor: "#FF9933", // Lighter orange
    borderLeftColor: "#FF9933", // Lighter orange
    borderRightColor: "#CC5500", // Darker orange
    borderBottomColor: "#CC5500", // Darker orange
    // No border radius for 8-bit look
  },
  logoutText: {
    color: COLORS.black, // Black text on orange button for contrast
    fontWeight: "600",
    marginLeft: 8,
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  booksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    // Retro styling - pixel border bottom
    borderBottomWidth: 2,
    borderBottomColor: COLORS.retroBlue,
    paddingBottom: 8,
  },
  booksTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.retroBlue, // Blue for section headers
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  booksCount: {
    fontSize: 14,
    color: COLORS.retroBlue,
    fontFamily: "monospace",
    fontWeight: "bold",
  },
  booksList: {
    paddingBottom: 20,
  },
  bookItem: {
    flexDirection: "row",
    backgroundColor: COLORS.cardBackground,
    padding: 12,
    marginBottom: 12,
    // Retro styling - pixelated border
    borderWidth: 2,
    borderColor: COLORS.retroBlue,
    borderRightColor: "#000099", // Darker blue
    borderBottomColor: "#000099", // Darker blue
    // Pixel shadow
    shadowColor: COLORS.retroBlue,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 0,
    elevation: 2,
  },
  bookImage: {
    width: 70,
    height: 100,
    marginRight: 12,
    // Retro styling - pixel border
    borderWidth: 2,
    borderColor: COLORS.retroOrange,
  },
  bookInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.retroBlue,
    marginBottom: 4,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 4,
  },
  bookCaption: {
    fontSize: 14,
    color: COLORS.textPrimary,
    marginBottom: 4,
    flex: 1,
    fontFamily: "monospace",
  },
  bookDate: {
    fontSize: 12,
    color: COLORS.retroOrange,
    fontFamily: "monospace",
  },
  deleteButton: {
    padding: 8,
    justifyContent: "center",
    // Retro styling
    backgroundColor: COLORS.retroRed,
    borderWidth: 2,
    borderColor: "#FF3333", // Lighter red
    borderRightColor: "#CC0000", // Darker red
    borderBottomColor: "#CC0000", // Darker red
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginTop: 20,
    // Retro styling - dashed border
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: COLORS.accent,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.accent,
    marginTop: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  addButton: {
    backgroundColor: COLORS.retroOrange,
    paddingVertical: 12,
    paddingHorizontal: 20,
    // Retro styling - pixelated button
    borderWidth: 3,
    borderTopColor: "#FF9933", // Lighter orange
    borderLeftColor: "#FF9933", // Lighter orange
    borderRightColor: "#CC5500", // Darker orange
    borderBottomColor: "#CC5500", // Darker orange
  },
  addButtonText: {
    color: COLORS.black,
    fontWeight: "600",
    fontSize: 14,
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
});

export default styles;