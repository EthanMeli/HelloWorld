// styles/login.styles.js
import { StyleSheet, Dimensions } from "react-native";
import COLORS from "../../constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  scrollViewStyle: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topIllustration: {
    alignItems: "center",
    width: "100%",
  },
  illustrationImage: {
    width: width * 0.75,
    height: width * 0.75,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    // No border radius for 8-bit look
    padding: 24,
    marginTop: -24,
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
  header: {
    alignItems: "center",
    marginBottom: 24,
    // Add pixel border bottom
    borderBottomWidth: 2,
    borderBottomColor: COLORS.retroBlue,
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.accent, // Changed to yellow
    marginBottom: 8,
    fontFamily: "monospace",
    letterSpacing: 1,
    textTransform: "uppercase",
    // Add text shadow for pixel effect
    textShadowColor: 'rgba(255, 255, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.retroBlue, // Changed to blue
    textAlign: "center",
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  formContainer: {
    marginBottom: 16,
  },
  inputGroup: {
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
    borderColor: COLORS.accent, // Changed to yellow
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
  eyeIcon: {
    padding: 8,
    color: COLORS.accent, // Changed to yellow
  },
  button: {
    backgroundColor: COLORS.retroOrange, // Changed to orange
    // No border radius for 8-bit look
    height: 50,
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
    shadowRadius: 0,
    elevation: 4,
  },
  buttonText: {
    color: COLORS.black, // Changed to black
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "monospace",
    textTransform: "uppercase",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
  },
  footerText: {
    color: COLORS.textSecondary,
    marginRight: 5,
  },
  link: {
    color: COLORS.primary,
    fontWeight: "600",
  },
});

export default styles;