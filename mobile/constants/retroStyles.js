import { StyleSheet } from "react-native";

/**
 * RetroPixel Styling Utilities
 * 
 * This file provides styling utilities to create a retro 8-bit pixel art look
 * for React Native components.
 */

// Border styles that mimic pixel art edges
export const pixelBorders = {
  // Simple 1px border (minimal pixel effect)
  thin: {
    borderWidth: 1,
    borderColor: "#00FF00",
  },
  
  // Thicker pixel-style border
  thick: {
    borderWidth: 2,
    borderColor: "#00FF00",
  },
  
  // Notched pixel border effect (advanced)
  notched: (color = "#00FF00", size = 2) => ({
    borderWidth: size,
    borderColor: color,
    borderTopWidth: size * 1.5,
    borderLeftWidth: size * 1.5,
  }),
  
  // Shadow effects that mimic pixel art shadows
  shadow: {
    // No borderRadius for true pixel look
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "#000000",
    shadowOpacity: 1,
    shadowRadius: 0, // Sharp shadow edges for pixel effect
    elevation: 4,
  }
};

// Text styles that mimic pixel/retro fonts
export const pixelText = {
  // Basic pixel text
  basic: {
    fontFamily: "monospace",
    letterSpacing: 1,
  },
  
  // Pixel text with shadow
  shadowed: {
    fontFamily: "monospace",
    letterSpacing: 1,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  
  // Arcade-style text effect
  arcade: {
    fontFamily: "monospace",
    fontWeight: "bold",
    letterSpacing: 2,
    lineHeight: 24,
    textTransform: "uppercase",
  }
};

// Button styles that mimic classic 8-bit buttons
export const pixelButtons = StyleSheet.create({
  basic: {
    backgroundColor: "#222222",
    borderWidth: 2,
    borderColor: "#00FF00",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Inset effect - looks like a pressed button
  inset: {
    backgroundColor: "#111111",
    borderWidth: 2,
    borderColor: "#00FF00",
    borderBottomWidth: 4,
    borderRightWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  
  // Raised effect - looks like a button that can be pressed
  raised: {
    backgroundColor: "#222222",
    borderWidth: 2,
    borderColor: "#00FF00",
    borderTopWidth: 4,
    borderLeftWidth: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  }
});

// Animated scan line effect (to be used with Animated components)
export const scanLineEffect = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  height: 2,
};

// Grid patterns for backgrounds
export const gridPatterns = {
  small: {
    width: "100%",
    height: "100%",
    backgroundColor: "#111111",
    backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
    backgroundSize: "10px 10px"
  },
  medium: {
    width: "100%",
    height: "100%",
    backgroundColor: "#111111",
    backgroundImage: "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
    backgroundSize: "20px 20px"
  }
};

export default {
  pixelBorders,
  pixelText,
  pixelButtons,
  scanLineEffect,
  gridPatterns
};