// pixelEffect.js - Animation utilities for retro pixel effects
import { Animated } from 'react-native';

/**
 * Create a scanning line animation that moves from top to bottom
 * @param {number} height - The height of the container
 * @param {number} duration - Duration of one full scan (in ms)
 * @returns {Object} Animation configuration object
 */
export const createScanLineAnimation = (height = 300, duration = 2000) => {
  const scanLinePosition = new Animated.Value(0);
  
  // Create the animation
  const startScanAnimation = () => {
    Animated.loop(
      Animated.timing(scanLinePosition, {
        toValue: height,
        duration: duration,
        useNativeDriver: true,
      })
    ).start();
  };
  
  return {
    scanLinePosition,
    startScanAnimation,
  };
};

/**
 * Create a glitch effect animation for text or elements
 * @param {number} intensity - Intensity of the glitch (0-1)
 * @param {number} duration - Duration of each glitch cycle (in ms)
 * @returns {Object} Animation configuration object
 */
export const createGlitchEffect = (intensity = 0.5, duration = 150) => {
  const glitchOpacity = new Animated.Value(1);
  const glitchTranslateX = new Animated.Value(0);
  
  // Create random glitch timings
  const glitchTiming = () => {
    const randomDuration = Math.floor(Math.random() * duration) + 50;
    const randomDelay = Math.floor(Math.random() * 5000) + 1000; // Random delay between 1-5 seconds
    
    return {
      randomDuration,
      randomDelay,
    };
  };
  
  // Start glitch animation sequence
  const startGlitchAnimation = () => {
    const { randomDuration, randomDelay } = glitchTiming();
    
    // Create a sequence of small glitches
    const createGlitchSequence = () => {
      Animated.sequence([
        // Shift slightly and change opacity
        Animated.parallel([
          Animated.timing(glitchTranslateX, {
            toValue: intensity * 4,
            duration: randomDuration,
            useNativeDriver: true,
          }),
          Animated.timing(glitchOpacity, {
            toValue: 0.7,
            duration: randomDuration,
            useNativeDriver: true,
          }),
        ]),
        // Return to normal
        Animated.parallel([
          Animated.timing(glitchTranslateX, {
            toValue: 0,
            duration: randomDuration,
            useNativeDriver: true,
          }),
          Animated.timing(glitchOpacity, {
            toValue: 1,
            duration: randomDuration,
            useNativeDriver: true,
          }),
        ]),
      ]).start(() => {
        // Schedule the next glitch after a random delay
        setTimeout(() => {
          createGlitchSequence();
        }, randomDelay);
      });
    };
    
    // Start the initial sequence
    createGlitchSequence();
  };
  
  return {
    glitchOpacity,
    glitchTranslateX,
    startGlitchAnimation,
  };
};

/**
 * Create a pulsing effect animation for buttons or elements
 * @param {number} minOpacity - Minimum opacity value (0-1)
 * @param {number} maxOpacity - Maximum opacity value (0-1)
 * @param {number} duration - Duration of one pulse cycle (in ms)
 * @returns {Object} Animation configuration object
 */
export const createPulseEffect = (minOpacity = 0.7, maxOpacity = 1, duration = 1000) => {
  const pulseOpacity = new Animated.Value(maxOpacity);
  
  // Create the animation
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseOpacity, {
          toValue: minOpacity,
          duration: duration / 2,
          useNativeDriver: true,
        }),
        Animated.timing(pulseOpacity, {
          toValue: maxOpacity,
          duration: duration / 2,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };
  
  return {
    pulseOpacity,
    startPulseAnimation,
  };
};

export default {
  createScanLineAnimation,
  createGlitchEffect,
  createPulseEffect,
};