import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';

const MediaListScreen = ({ route }) => {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Text>
          <Text variant="bodyLarge">
            Media items for category: {category}
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            This screen would show a list of media items for the selected category.
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

export default MediaListScreen;
