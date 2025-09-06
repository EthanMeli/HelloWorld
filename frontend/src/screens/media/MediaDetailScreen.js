import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const MediaDetailScreen = ({ route }) => {
  const { category, id } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Media Detail
          </Text>
          <Text variant="bodyLarge">
            Category: {category}
          </Text>
          <Text variant="bodyLarge">
            ID: {id}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This screen would show detailed media content with transcripts/lyrics.
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

export default MediaDetailScreen;
