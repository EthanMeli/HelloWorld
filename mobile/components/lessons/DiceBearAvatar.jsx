import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

/**
 * DiceBearAvatar Component
 * 
 * Displays a DiceBear pixel-art avatar with retro styling.
 * 
 * @param {Object} props - Component props
 * @param {string} props.seed - Seed value for generating the avatar
 * @param {boolean} props.flip - Whether to flip the avatar horizontally
 * @param {number} props.size - Size of the avatar (defaults to 40)
 * @param {Object} props.style - Additional styles for the container
 */
const DiceBearAvatar = ({ seed = "John", flip = false, size = 40, style = {} }) => {
  // Determine which avatar to use based on seed and flip
  let avatarUrl;
  
  if (seed === "Christian" || flip) {
    avatarUrl = "https://api.dicebear.com/9.x/pixel-art/svg?seed=Christian&flip=true";
  } else {
    avatarUrl = "https://api.dicebear.com/9.x/pixel-art/svg?seed=Ryan";
  }
  
  return (
    <View 
      style={[
        styles.container, 
        {
          width: size,
          height: size,
          borderWidth: Math.max(2, size / 20),
          // Apply pixelated border effect
          borderRightWidth: Math.max(1, size / 30),
          borderBottomWidth: Math.max(1, size / 30),
        },
        style
      ]}
    >
      <Image 
        source={{ uri: avatarUrl }}
        style={styles.image}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
    borderColor: COLORS.accent, // Changed to accent (yellow) for better visibility
    backgroundColor: COLORS.cardBackground,
    // Pixel shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%', // Slightly smaller than container to prevent overflow
    height: '90%',
  }
});

export default DiceBearAvatar;