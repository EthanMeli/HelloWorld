import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card } from 'react-native-paper';

const MediaHomeScreen = ({ navigation }) => {
  const categories = [
    { id: 'podcast', name: 'Podcasts', icon: '🎧', count: 5 },
    { id: 'literature', name: 'Literature', icon: '📚', count: 8 },
    { id: 'song', name: 'Songs', icon: '🎵', count: 12 },
    { id: 'video', name: 'Videos', icon: '🎬', count: 6 },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">Media Library</Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Immerse yourself in authentic content
        </Text>
      </View>

      <View style={styles.grid}>
        {categories.map((category) => (
          <Card 
            key={category.id}
            style={styles.categoryCard}
            onPress={() => navigation.navigate('MediaList', { category: category.id })}
          >
            <Card.Content style={styles.cardContent}>
              <Text style={styles.icon}>{category.icon}</Text>
              <Text variant="titleMedium">{category.name}</Text>
              <Text variant="bodySmall" style={styles.count}>
                {category.count} items
              </Text>
            </Card.Content>
          </Card>
        ))}
      </View>
    </ScrollView>
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    marginBottom: 16,
    elevation: 2,
  },
  cardContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  count: {
    color: '#666',
    marginTop: 4,
  },
});

export default MediaHomeScreen;
