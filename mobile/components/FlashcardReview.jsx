import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, Alert, Dimensions, StyleSheet, Modal, PanResponder } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../constants/colors';

const { width: screenWidth } = Dimensions.get('window');

const FlashcardReview = ({ deck, onComplete, onExit }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completedCardIds, setCompletedCardIds] = useState(new Set());
  const [reviewCards, setReviewCards] = useState([]);
  const [cardsToReview, setCardsToReview] = useState([]);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  
  // Animation values
  const translateX = new Animated.Value(0);

  useEffect(() => {
    if (deck && deck.cards && deck.cards.length > 0) {
      // Initialize cards for review
      const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5);
      setCardsToReview(shuffledCards);
      setReviewCards([]);
      setCurrentCardIndex(0);
      setCompletedCardIds(new Set());
      setIsFlipped(false);
    }
  }, [deck]);

  const currentCard = cardsToReview[currentCardIndex];
  const totalCards = deck?.cards?.length || 0;

  // Card flip function (simplified - no animation for now)
  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle swipe gestures using PanResponder
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20 || Math.abs(gestureState.dy) > 20;
    },
    onPanResponderGrant: () => {
      translateX.setOffset(translateX._value);
    },
    onPanResponderMove: (evt, gestureState) => {
      translateX.setValue(gestureState.dx);
    },
    onPanResponderRelease: (evt, gestureState) => {
      translateX.flattenOffset();
      
      const threshold = screenWidth * 0.3;
      const shouldSwipe = Math.abs(gestureState.dx) > threshold || Math.abs(gestureState.vx) > 1;

      if (shouldSwipe) {
        // Determine swipe direction
        const swipeRight = gestureState.dx > 0;
        handleSwipe(swipeRight);
      } else {
        // Reset card position
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const handleSwipe = (isCorrect) => {
    const direction = isCorrect ? screenWidth * 1.5 : -screenWidth * 1.5;
    
    Animated.timing(translateX, {
      toValue: direction,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Reset card position and flip state for next card
      translateX.setValue(0);
      setIsFlipped(false);

      if (isCorrect) {
        // Card completed - add to completed set
        const currentCard = cardsToReview[currentCardIndex];
        const cardId = `${currentCard.front}_${currentCard.back}`; // Create unique ID
        
        setCompletedCardIds(prev => {
          const newCompletedSet = new Set(prev);
          newCompletedSet.add(cardId);
          
          // Check if all cards are completed
          if (newCompletedSet.size >= totalCards) {
            handleReviewComplete();
            return newCompletedSet;
          }
          moveToNextCard();
          return newCompletedSet;
        });
      } else {
        // Card needs review - only add to review pile if not already completed
        const cardToReview = cardsToReview[currentCardIndex];
        const cardId = `${cardToReview.front}_${cardToReview.back}`;
        
        // Only add to review pile if this card hasn't been completed yet
        if (!completedCardIds.has(cardId)) {
          setReviewCards(prev => {
            const newReviewCards = [...prev, cardToReview];
            // Pass the updated review cards to moveToNextCard
            moveToNextCard(newReviewCards);
            return newReviewCards;
          });
        } else {
          moveToNextCard();
        }
      }
    });
  };

  const moveToNextCard = (updatedReviewCards) => {
    const remainingCards = cardsToReview.slice(currentCardIndex + 1);
    
    // Reset flip state for new card
    setIsFlipped(false);
    
    if (remainingCards.length === 0) {
      // No more cards in current set
      // Use the updated review cards if provided, otherwise use the current state
      const cardsToCheck = updatedReviewCards !== undefined ? updatedReviewCards : reviewCards;
      
      if (cardsToCheck.length > 0) {
        // Move review cards back to main pile and continue
        setCardsToReview(cardsToCheck);
        setReviewCards([]);
        setCurrentCardIndex(0);
      } else {
        // Only complete if all cards are actually completed
        // This should only happen when all cards have been swiped right
        handleReviewComplete();
      }
    } else {
      // Move to next card in current pile
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handleReviewComplete = () => {
    Alert.alert(
      'Review Complete!',
      `Congratulations! You've completed all ${totalCards} flashcards.`,
      [
        {
          text: 'Review Again',
          onPress: () => {
            // Reset the review
            const shuffledCards = [...deck.cards].sort(() => Math.random() - 0.5);
            setCardsToReview(shuffledCards);
            setReviewCards([]);
            setCurrentCardIndex(0);
            setCompletedCardIds(new Set());
            setIsFlipped(false);
          }
        },
        {
          text: 'Exit',
          onPress: onExit
        }
      ]
    );
  };

  const handleExit = () => {
    Alert.alert(
      'Exit Review?',
      'Are you sure you want to exit the review session?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Exit', onPress: onExit }
      ]
    );
  };

  if (!currentCard) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with progress */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <MaterialIcons name="close" size={24} color={COLORS.textPrimary} />
        </TouchableOpacity>
        
        <Text style={styles.deckTitle}>{deck.title}</Text>
        
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.infoButton} onPress={() => setInfoModalVisible(true)}>
            <MaterialIcons name="info-outline" size={24} color={COLORS.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.progressText}>
            {completedCardIds.size}/{totalCards}
          </Text>
        </View>
      </View>

      {/* Progress bar */}
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${(completedCardIds.size / totalCards) * 100}%` }
          ]} 
        />
      </View>

      {/* Card container */}
      <View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.cardWrapper,
            {
              transform: [{ translateX }]
            }
          ]}
          {...panResponder.panHandlers}
        >
          <TouchableOpacity
            style={styles.card}
            onPress={flipCard}
            activeOpacity={0.9}
          >
            <View style={[styles.cardFace, isFlipped ? styles.cardBack : styles.cardFront]}>
              <Text style={styles.cardText}>
                {isFlipped ? currentCard.back : currentCard.front}
              </Text>
              <Text style={styles.tapHint}>
                Tap to flip
              </Text>
              <Text style={styles.cardSideIndicator}>
                {isFlipped ? 'Back' : 'Front'}
              </Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Info Modal */}
      <Modal
        visible={infoModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.infoModalContent}>
            <Text style={styles.infoModalTitle}>How to Review</Text>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="touch-app" size={24} color={COLORS.accent} />
              <Text style={styles.infoText}>Tap card to flip between front and back</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="arrow-forward" size={24} color="#228B22" />
              <Text style={styles.infoText}>Swipe right when you&apos;ve mastered the card</Text>
            </View>
            
            <View style={styles.infoItem}>
              <MaterialIcons name="arrow-back" size={24} color="#8B0000" />
              <Text style={styles.infoText}>Swipe left to review the card again later</Text>
            </View>
            
            <TouchableOpacity 
              style={styles.infoCloseButton}
              onPress={() => setInfoModalVisible(false)}
            >
              <Text style={styles.infoCloseButtonText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 60, // Increased padding for safe area
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  exitButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
  },
  infoButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackground,
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.accent,
    fontFamily: 'serif',
    flex: 1,
    textAlign: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: 'serif',
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.cardBackground,
    marginHorizontal: 20,
    borderRadius: 4,
    marginBottom: 30,
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 4,
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40, // Add bottom padding for spacing
  },
  cardWrapper: {
    width: '100%',
    maxWidth: 350,
    height: 500,
  },
  card: {
    flex: 1,
    position: 'relative',
  },
  cardFace: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  cardFront: {
    backgroundColor: COLORS.cardBackground,
  },
  cardBack: {
    backgroundColor: COLORS.inputBackground,
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    textAlign: 'center',
    fontFamily: 'serif',
    lineHeight: 32,
    marginBottom: 20,
  },
  tapHint: {
    position: 'absolute',
    bottom: 60,
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    fontFamily: 'serif',
  },
  cardSideIndicator: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: 'bold',
    fontFamily: 'serif',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // Info Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoModalContent: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
    width: '100%',
    maxWidth: 350,
  },
  infoModalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.accent,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    paddingHorizontal: 8,
  },
  infoText: {
    marginLeft: 16,
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    flex: 1,
    lineHeight: 22,
  },
  infoCloseButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: COLORS.primary,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  infoCloseButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 0.3,
  },
  loadingText: {
    fontSize: 18,
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginTop: 100,
  },
});

export default FlashcardReview;