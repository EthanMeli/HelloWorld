// styles/create.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    // Add pixel border bottom
    borderBottomWidth: 2,
    borderBottomColor: COLORS.retroBlue,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.accent,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
    // Add text shadow for pixel effect
    textShadowColor: 'rgba(255, 255, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.retroBlue, // Changed to blue
    textAlign: "center",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  form: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.retroBlue, // Changed to blue
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    // No border radius for 8-bit look
    borderWidth: 2, // Thicker border for pixel look
    borderColor: COLORS.accent,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
    color: COLORS.accent, // Changed to yellow
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textPrimary,
    fontFamily: "monospace",
  },
  textArea: {
    backgroundColor: COLORS.inputBackground,
    // No border radius for 8-bit look
    borderWidth: 2, // Thicker border for pixel look
    borderColor: COLORS.accent,
    padding: 12,
    height: 100,
    color: COLORS.textPrimary,
    fontFamily: "monospace",
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    // No border radius for 8-bit look
    borderWidth: 2, // Thicker border for pixel look
    borderColor: COLORS.retroOrange, // Changed to orange
    padding: 8,
  },
  starButton: {
    padding: 8,
  },
  imagePicker: {
    width: "100%",
    height: 200,
    backgroundColor: COLORS.inputBackground,
    // No border radius for 8-bit look
    borderWidth: 2, // Thicker border for pixel look
    borderColor: COLORS.retroBlue, // Changed to blue
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  placeholderContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: COLORS.retroBlue, // Changed to blue
    marginTop: 8,
    fontFamily: "monospace",
  },
  button: {
    backgroundColor: COLORS.retroOrange, // Changed to orange
    // No border radius for 8-bit look
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
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
    shadowRadius: 0, // Sharp shadow for pixel effect
    elevation: 4,
  },
  buttonText: {
    color: COLORS.black, // Changed to black for contrast
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  buttonIcon: {
    marginRight: 8,
  },
});

export default styles;