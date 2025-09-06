import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Text, ProgressBar } from 'react-native-paper';
import { api } from '../../services/api';

const ReviewScreen = ({ route, navigation }) => {
  const { deck } = route.params;
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCardsForReview();
  }, []);

  const loadCardsForReview = async () => {
    try {
      const response = await api.get('/reviews');
      setCards(response.data);
    } catch (error) {
      console.error('Error loading cards for review:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRating = async (rating) => {
    try {
      const currentCard = cards[currentCardIndex];
      await api.post('/reviews', {
        cardId: currentCard._id,
        rating: rating
      });

      setReviewCount(reviewCount + 1);
      
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        // Review completed
        Alert.alert(
          'Review Complete!',
          `You've reviewed ${reviewCount + 1} cards. Great job!`,
          [
            {
              text: 'OK',
              onPress: () => navigation.goBack()
            }
          ]
        );
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      Alert.alert('Error', 'Failed to submit review');
    }
  };

  const getRatingText = (rating) => {
    switch (rating) {
      case 1: return 'Again';
      case 2: return 'Hard';
      case 3: return 'Good';
      case 4: return 'Easy';
      case 5: return 'Perfect';
      default: return '';
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 1: return '#F44336';
      case 2: return '#FF9800';
      case 3: return '#4CAF50';
      case 4: return '#2196F3';
      case 5: return '#9C27B0';
      default: return '#666';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading cards for review...</Text>
      </View>
    );
  }

  if (cards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Title style={styles.emptyTitle}>No cards to review!</Title>
        <Paragraph style={styles.emptyText}>
          All caught up! Check back later for more cards to review.
        </Paragraph>
        <Button
          mode="contained"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          Back to Decks
        </Button>
      </View>
    );
  }

  const currentCard = cards[currentCardIndex];
  const progress = (currentCardIndex + 1) / cards.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>Review Session</Title>
        <Text style={styles.progressText}>
          {currentCardIndex + 1} of {cards.length}
        </Text>
        <ProgressBar progress={progress} color="#2196F3" style={styles.progressBar} />
      </View>

      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.cardContent}>
              <Text style={styles.cardLabel}>Front</Text>
              <Text style={styles.cardText}>{currentCard.front}</Text>
              
              {currentCard.hint && !showAnswer && (
                <View style={styles.hintContainer}>
                  <Text style={styles.hintLabel}>Hint:</Text>
                  <Text style={styles.hintText}>{currentCard.hint}</Text>
                </View>
              )}
            </View>
          </Card.Content>
        </Card>

        {showAnswer && (
          <Card style={[styles.card, styles.answerCard]}>
            <Card.Content>
              <View style={styles.cardContent}>
                <Text style={styles.cardLabel}>Back</Text>
                <Text style={styles.cardText}>{currentCard.back}</Text>
              </View>
            </Card.Content>
          </Card>
        )}

        {!showAnswer ? (
          <Button
            mode="contained"
            onPress={() => setShowAnswer(true)}
            style={styles.showAnswerButton}
          >
            Show Answer
          </Button>
        ) : (
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingTitle}>How well did you know this?</Text>
            <View style={styles.ratingButtons}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Button
                  key={rating}
                  mode="outlined"
                  onPress={() => handleRating(rating)}
                  style={[
                    styles.ratingButton,
                    { borderColor: getRatingColor(rating) }
                  ]}
                  labelStyle={{ color: getRatingColor(rating) }}
                >
                  {rating}
                </Button>
              ))}
            </View>
            <View style={styles.ratingLabels}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <Text key={rating} style={styles.ratingLabel}>
                  {getRatingText(rating)}
                </Text>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginTop: 8,
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  cardContainer: {
    flex: 1,
    padding: 20,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
  },
  answerCard: {
    backgroundColor: '#E8F5E8',
  },
  cardContent: {
    padding: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 26,
  },
  hintContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
  },
  hintLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#E65100',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 14,
    color: '#E65100',
    fontStyle: 'italic',
  },
  showAnswerButton: {
    marginTop: 20,
  },
  ratingContainer: {
    marginTop: 20,
  },
  ratingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  ratingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  ratingButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  ratingLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
});

export default ReviewScreen;
