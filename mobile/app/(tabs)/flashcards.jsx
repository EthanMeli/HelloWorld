import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import styles from '../../assets/styles/home.styles';
import FlashcardManager from '../../components/flashcards/FlashcardManager';
import COLORS from '../../constants/colors';
import { lessons } from '../../data/lessons';

export default function Flashcards() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Function to render each lesson item
  const renderLessonItem = ({ item }) => (
    <TouchableOpacity
      style={[
        localStyles.lessonItem,
        selectedLesson === item.id && localStyles.selectedLesson
      ]}
      onPress={() => setSelectedLesson(item.id)}
    >
      <Text style={localStyles.lessonNumber}>Lesson {item.id}</Text>
      <Text style={localStyles.lessonTitle}>{item.displayTitle}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {selectedLesson ? (
        // Show flashcards for the selected lesson
        <>
          <TouchableOpacity
            style={localStyles.backButton}
            onPress={() => setSelectedLesson(null)}
          >
            <Text style={localStyles.backButtonText}>← Back to Lessons</Text>
          </TouchableOpacity>
          
          <FlashcardManager lessonId={selectedLesson} />
        </>
      ) : (
        // Show lesson selection
        <>
          <Text style={localStyles.headerText}>Select a Lesson</Text>
          <FlatList
            data={lessons}
            renderItem={renderLessonItem}
            keyExtractor={item => item.id.toString()}
            contentContainerStyle={localStyles.lessonList}
          />
        </>
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    padding: 16,
    fontFamily: 'monospace',
  },
  lessonList: {
    padding: 16,
  },
  lessonItem: {
    backgroundColor: COLORS.cardBackground,
    marginBottom: 12,
    padding: 16,
    borderWidth: 3,
    borderColor: COLORS.accent,
    // Pixel-perfect borders
    borderRightColor: '#888800',
    borderBottomColor: '#888800',
  },
  selectedLesson: {
    borderColor: COLORS.retroOrange,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
  },
  lessonNumber: {
    fontSize: 14,
    color: COLORS.retroOrange,
    marginBottom: 4,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  lessonTitle: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  backButton: {
    margin: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: COLORS.accent,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: COLORS.background,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  }
});