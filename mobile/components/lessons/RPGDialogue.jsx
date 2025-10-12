import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../assets/styles/lesson.styles';

const RPGDialogue = ({ 
  dialogue, 
  onDialogueComplete,
  currentDialogueIndex,
  isActive = true 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTextComplete, setIsTextComplete] = useState(false);
  const [showContinueIndicator, setShowContinueIndicator] = useState(false);
  const textAnimationRef = useRef(null);
  const continueIndicatorAnim = useRef(new Animated.Value(0)).current;

  const TYPING_SPEED = 50; // milliseconds per character

  const startContinueIndicatorAnimation = useCallback(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(continueIndicatorAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(continueIndicatorAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [continueIndicatorAnim]);

  useEffect(() => {
    if (!dialogue || !isActive) return;

    // Reset state for new dialogue
    setDisplayedText('');
    setIsTextComplete(false);
    setShowContinueIndicator(false);

    // Start typing animation
    let currentIndex = 0;
    const fullText = dialogue.text;

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        textAnimationRef.current = setTimeout(typeText, TYPING_SPEED);
      } else {
        // Text is complete
        setIsTextComplete(true);
        setShowContinueIndicator(true);
        startContinueIndicatorAnimation();
      }
    };

    typeText();

    // Cleanup timeout on unmount or dialogue change
    return () => {
      if (textAnimationRef.current) {
        clearTimeout(textAnimationRef.current);
      }
    };
  }, [dialogue, isActive, currentDialogueIndex, startContinueIndicatorAnimation]);

  const handleDialoguePress = () => {
    if (!isTextComplete) {
      // Skip to end of current text
      if (textAnimationRef.current) {
        clearTimeout(textAnimationRef.current);
      }
      setDisplayedText(dialogue.text);
      setIsTextComplete(true);
      setShowContinueIndicator(true);
      startContinueIndicatorAnimation();
    } else {
      // Move to next dialogue
      onDialogueComplete();
    }
  };

  if (!dialogue) return null;

  const isLeftSide = dialogue.isSpeaker1;

  return (
    <View style={styles.rpgDialogueContainer}>
      {/* Character indicator area - top half */}
      <View style={styles.characterArea}>
        <View style={[
          styles.characterIndicator,
          isLeftSide ? styles.characterLeft : styles.characterRight
        ]}>
          <Text style={styles.characterName}>{dialogue.speaker}</Text>
          <Text style={styles.characterPosition}>
            {isLeftSide ? '← Left' : 'Right →'}
          </Text>
        </View>
      </View>

      {/* Dialogue box - bottom half */}
      <TouchableOpacity 
        style={styles.dialogueBox}
        onPress={handleDialoguePress}
        activeOpacity={0.8}
      >
        <View style={styles.dialogueContent}>
          <Text style={styles.speakerLabel}>{dialogue.speaker}</Text>
          
          <Text style={styles.dialogueText}>
            {displayedText}
          </Text>
          
          <Text style={styles.translationText}>
            {isTextComplete ? dialogue.translationText : ''}
          </Text>
          
          {showContinueIndicator && (
            <Animated.View 
              style={[
                styles.continueIndicator,
                { opacity: continueIndicatorAnim }
              ]}
            >
              <Ionicons name="chevron-forward" size={20} color="#FFD700" />
              <Text style={styles.continueText}>Tap to continue</Text>
            </Animated.View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RPGDialogue;