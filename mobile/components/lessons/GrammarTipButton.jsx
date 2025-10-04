import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Animated } from 'react-native';
import COLORS from '../../constants/colors';
import { pixelText, pixelBorders } from '../../constants/retroStyles';
import { createPulseEffect } from '../../constants/pixelEffects';

/**
 * GrammarTipButton Component - Retro 8-bit Style
 * 
 * This component creates a retro-styled button to access grammar tips. 
 * When clicked, it opens a modal showing the grammar tip content.
 * 
 * @param {Object} props - Component props
 * @param {Function} props.onPress - Function to call when button is pressed
 * @param {number} props.count - Number of grammar tips available
 * @param {Object} props.style - Additional styles for the button
 */
const GrammarTipButton = ({ onPress, count = 1, style }) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = useState(new Animated.Value(1))[0];
  const pulseAnim = useState(new Animated.Value(1))[0];
  
  // Start the pulse animation when component mounts
  useEffect(() => {
    startPulseAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 0.6,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  const handlePressIn = () => {
    setIsPressed(true);
    Animated.timing(scaleAnim, {
      toValue: 0.95,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    setIsPressed(false);
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={style}
    >
      <Animated.View 
        style={[
          styles.button, 
          isPressed ? styles.buttonPressed : styles.buttonRaised,
          { 
            transform: [{ scale: scaleAnim }],
            opacity: pulseAnim
          }
        ]}
      >
        <Text style={styles.text}>
          {count > 1 ? `${count} TIPS` : "GRAMMAR TIP"}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.cardBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 2,
    // No border radius for pixel art aesthetic
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  buttonRaised: {
    borderColor: COLORS.accent,
    borderTopColor: COLORS.accent,
    borderLeftColor: COLORS.accent,
    borderRightColor: '#888800', // Darker shade for 3D effect
    borderBottomColor: '#888800', // Darker shade for 3D effect
  },
  buttonPressed: {
    borderColor: COLORS.accent,
    borderTopColor: '#888800', // Darker shade for 3D effect
    borderLeftColor: '#888800', // Darker shade for 3D effect
    borderRightColor: COLORS.accent,
    borderBottomColor: COLORS.accent,
  },
  text: {
    color: COLORS.accent,
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
  }
});

export default GrammarTipButton;