import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';

const LessonDetailScreen = ({ route, navigation }) => {
  const { lessonId } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Lesson Detail
          </Text>
          <Text variant="bodyLarge" style={styles.description}>
            This is where the lesson content would be displayed.
            Lesson ID: {lessonId}
          </Text>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Features to implement:
          </Text>
          <Text variant="bodyMedium" style={styles.feature}>
            • Dialogue with audio playback
          </Text>
          <Text variant="bodyMedium" style={styles.feature}>
            • Grammar tips and explanations
          </Text>
          <Text variant="bodyMedium" style={styles.feature}>
            • Vocabulary list with pronunciations
          </Text>
          <Text variant="bodyMedium" style={styles.feature}>
            • Interactive exercises
          </Text>
          <Text variant="bodyMedium" style={styles.feature}>
            • Progress tracking
          </Text>
        </Card.Content>
      </Card>
      
      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()}
        style={styles.button}
      >
        Complete Lesson
      </Button>
    </ScrollView>
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
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 8,
  },
  feature: {
    marginBottom: 4,
    marginLeft: 8,
  },
  button: {
    marginTop: 16,
    marginBottom: 32,
  },
});

export default LessonDetailScreen;
