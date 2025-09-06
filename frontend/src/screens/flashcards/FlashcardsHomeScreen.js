import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, FAB } from 'react-native-paper';

const FlashcardsHomeScreen = ({ navigation }) => {
  const sampleDecks = [
    { id: '1', name: 'Basic Vocabulary', cardCount: 25, language: 'fr' },
    { id: '2', name: 'Common Phrases', cardCount: 15, language: 'fr' },
    { id: '3', name: 'Grammar Rules', cardCount: 30, language: 'fr' },
  ];

  const renderDeckItem = ({ item }) => (
    <Card 
      style={styles.card} 
      onPress={() => navigation.navigate('DeckDetail', { deckId: item.id })}
    >
      <Card.Content>
        <Text variant="titleMedium">{item.name}</Text>
        <Text variant="bodyMedium" style={styles.cardInfo}>
          {item.cardCount} cards • {item.language === 'fr' ? '🇫🇷 French' : '🇩🇪 German'}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Flashcards</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Study with spaced repetition
        </Text>
      </View>

      <Card style={styles.reviewCard}>
        <Card.Content>
          <Text variant="titleMedium">Ready to Review</Text>
          <Text variant="bodyMedium">12 cards due for review</Text>
          <Button 
            mode="contained" 
            onPress={() => navigation.navigate('Review')}
            style={styles.reviewButton}
          >
            Start Review
          </Button>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.sectionTitle}>
        Your Decks
      </Text>

      <FlatList
        data={sampleDecks}
        renderItem={renderDeckItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {/* TODO: Navigate to create deck */}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  reviewCard: {
    margin: 16,
    marginTop: 0,
  },
  reviewButton: {
    marginTop: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    marginBottom: 8,
  },
  cardInfo: {
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FlashcardsHomeScreen;
