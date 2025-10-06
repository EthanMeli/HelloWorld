// styles/signup.styles.js
import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: "center",
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12, // Add rounded corners for cleaner look
    padding: 24,
    // Medieval styling - elegant border
    borderWidth: 2,
    borderColor: COLORS.accent,
    // Soft shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    // Add elegant border bottom
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
    paddingBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: COLORS.accent, // Golden color
    marginBottom: 8,
    fontFamily: "serif", // More elegant font
    letterSpacing: 0.5,
    textTransform: "uppercase",
    // Add elegant text shadow
    textShadowColor: 'rgba(255, 215, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary, // Tan color
    textAlign: "center",
    fontFamily: "serif",
    fontStyle: "italic",
  },
  formContainer: { 
    marginBottom: 16 
  },
  inputGroup: { 
    marginBottom: 20 
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: COLORS.textSecondary, // Tan color
    fontWeight: "600",
    fontFamily: "serif",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.inputBackground,
    borderRadius: 8, // Rounded corners
    borderWidth: 1,
    borderColor: COLORS.accent, // Golden border
    paddingHorizontal: 12,
  },
  inputIcon: { 
    marginRight: 10,
    color: COLORS.accent, // Golden color
  },
  input: {
    flex: 1,
    height: 48,
    color: COLORS.textPrimary,
    fontFamily: "serif",
  },
  eyeIcon: { 
    padding: 8,
    color: COLORS.accent, // Golden color
  },
  button: {
    backgroundColor: COLORS.primary, // Dark goldenrod
    borderRadius: 8, // Rounded corners
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    // Elegant shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonText: {
    color: COLORS.white, // White text on dark golden button
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "serif",
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
    fontFamily: "serif",
  },
  link: {
    color: COLORS.accent, // Golden color
    fontWeight: "600",
    fontFamily: "serif",
  },
});

export default styles;