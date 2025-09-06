import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const ReviewScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Flashcard Review
          </Text>
          <Text variant="bodyLarge">
            Spaced repetition review session
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This screen would implement the SM2 spaced repetition algorithm
            for reviewing flashcards.
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  title: {
    marginBottom: 16,
    color: '#6200ee',
  },
  description: {
    marginTop: 8,
    color: '#666',
  },
});

export default ReviewScreen;
