import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
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
 * @param {boolean} props.debug - Enable debug mode (shows URL and error info)
 */
const DiceBearAvatar = ({ seed = "John", flip = false, size = 40, style = {}, debug = false }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  // Set a timeout to show fallback if loading takes too long
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (imageLoading) {
        // console.log('DiceBear Avatar: Loading timeout, showing fallback');
        setImageError(true);
        setImageLoading(false);
      }
    }, 5000); // 5 second timeout

    return () => clearTimeout(timeout);
  }, [imageLoading]);

  // Create avatar URL with fallback options
  const createAvatarUrl = (apiVersion = '9.x', format = 'png') => {
    const baseUrl = `https://api.dicebear.com/${apiVersion}/pixel-art/${format}`;
    const params = new URLSearchParams({
      seed: seed,
      backgroundColor: "transparent",
      size: size.toString()
    });
    
    if (flip) {
      params.append('flip', 'true');
    }
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  // Try PNG first, then SVG as fallback
  const avatarUrl = createAvatarUrl('9.x', 'png');
  
  if (debug) {
    console.log('🎯 DiceBear Avatar URL (PNG):', avatarUrl);
  }

  const handleImageError = (error) => {
    if (debug) {
      console.log('DiceBear Avatar Error:', error?.nativeEvent?.error || 'Unknown error');
      console.log('Failed URL:', avatarUrl);
      console.log('Seed:', seed, 'Flip:', flip, 'Size:', size);
    }
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    if (debug) {
      console.log('✅ DiceBear Avatar loaded successfully:', avatarUrl);
    }
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageLoadStart = () => {
    if (debug) {
      console.log('🔄 DiceBear Avatar loading started:', avatarUrl);
    }
  };

  const handleImageLoadEnd = () => {
    if (debug) {
      console.log('⏹️ DiceBear Avatar loading ended:', avatarUrl);
    }
  };

  // Enhanced fallback content when image fails to load
  const renderFallback = () => {
    const initials = seed.substring(0, 2).toUpperCase();
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3'];
    const colorIndex = seed.length % colors.length;
    const backgroundColor = colors[colorIndex];
    
    return (
      <View style={[styles.fallbackContainer, { backgroundColor }]}>
        <Text style={[styles.fallbackText, { fontSize: size * 0.35 }]}>
          {initials}
        </Text>
      </View>
    );
  };
  
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
        // Debug styling to make container visible
        debug && {
          backgroundColor: 'rgba(255, 0, 0, 0.1)', // Light red background
          borderColor: 'red', // Red border for debugging
        },
        style
      ]}
    >
      {imageError ? (
        renderFallback()
      ) : (
        <Image 
          source={{ uri: avatarUrl }}
          style={styles.image}
          resizeMode="contain"
          onError={handleImageError}
          onLoad={handleImageLoad}
          onLoadStart={handleImageLoadStart}
          onLoadEnd={handleImageLoadEnd}
        />
      )}
      
      {imageLoading && !imageError && (
        <View style={styles.loadingIndicator}>
          <Text style={[styles.loadingText, { fontSize: size * 0.2 }]}>...</Text>
        </View>
      )}
      
      {debug && (
        <View style={styles.debugInfo}>
          <Text style={styles.debugText}>
            {imageError ? '❌' : imageLoading ? '⏳' : '✅'}
          </Text>
        </View>
      )}
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
  },
  fallbackContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  fallbackText: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'serif',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  loadingIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  loadingText: {
    color: COLORS.accent,
    fontWeight: 'bold',
  },
  debugInfo: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 16,
    height: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  debugText: {
    fontSize: 10,
    textAlign: 'center',
  },
});

export default DiceBearAvatar;