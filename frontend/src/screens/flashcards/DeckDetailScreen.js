import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deckId } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Deck Detail
          </Text>
          <Text variant="bodyLarge">
            Deck ID: {deckId}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This screen would show all cards in the deck and allow editing.
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

export default DeckDetailScreen;
