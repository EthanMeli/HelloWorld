import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { getLessonVocabulary } from '../../data/lessons';
import { getWordTypeAbbreviation, WordType } from '../../data/flashcards';
import COLORS from '../../constants/colors';

/**
 * FlashcardManager Component
 * 
 * This component displays and manages flashcards for a specific lesson.
 * It organizes cards by word type (nouns, verbs, adjectives) and allows filtering.
 */
const FlashcardManager = ({ lessonId }) => {
  const [vocabulary, setVocabulary] = useState([]);
  const [filter, setFilter] = useState('all');
  
  // Load vocabulary for this lesson
  useEffect(() => {
    const lessonVocab = getLessonVocabulary(lessonId);
    setVocabulary(lessonVocab);
  }, [lessonId]);
  
  // Filter vocabulary by word type
  const filteredVocabulary = vocabulary.filter(item => {
    if (filter === 'all') return true;
    return item.flashcard.wordType === filter;
  });
  
  // Group flashcards by type for the summary
  const vocabSummary = {
    [WordType.NOUN]: vocabulary.filter(v => v.flashcard.wordType === WordType.NOUN).length,
    [WordType.VERB]: vocabulary.filter(v => v.flashcard.wordType === WordType.VERB).length,
    [WordType.ADJECTIVE]: vocabulary.filter(v => v.flashcard.wordType === WordType.ADJECTIVE).length,
    other: vocabulary.filter(v => 
      v.flashcard.wordType !== WordType.NOUN && 
      v.flashcard.wordType !== WordType.VERB && 
      v.flashcard.wordType !== WordType.ADJECTIVE
    ).length,
    total: vocabulary.length
  };
  
  // Render a single flashcard item
  const renderFlashcardItem = ({ item }) => {
    const { flashcard, word } = item;
    
    // Format title based on word type
    let title = flashcard.baseForm;
    if (flashcard.wordType === WordType.NOUN && flashcard.grammaticalInfo.article) {
      title = `${flashcard.grammaticalInfo.article} ${flashcard.baseForm}`;
    }
    
    return (
      <View style={styles.flashcardItem}>
        <View style={styles.flashcardHeader}>
          <Text style={styles.flashcardTitle}>{title}</Text>
          <Text style={styles.wordTypeLabel}>
            {getWordTypeAbbreviation(flashcard.wordType)}
          </Text>
        </View>
        
        <View style={styles.flashcardBody}>
          {/* Word as used in dialogue */}
          {word !== flashcard.baseForm && (
            <Text style={styles.usageText}>
              As used in dialogue: &ldquo;{word}&rdquo;
            </Text>
          )}
          
          {/* Translation */}
          <Text style={styles.translationText}>
            {flashcard.translations.english}
          </Text>
          
          {/* Type-specific details */}
          {flashcard.wordType === WordType.NOUN && (
            <Text style={styles.detailText}>
              Plural: {flashcard.grammaticalInfo.plural}
            </Text>
          )}
          
          {flashcard.wordType === WordType.VERB && (
            <Text style={styles.detailText}>
              Conjugation: ich {flashcard.grammaticalInfo.conjugation.present.ich}, 
              du {flashcard.grammaticalInfo.conjugation.present.du}...
            </Text>
          )}
          
          {flashcard.wordType === WordType.ADJECTIVE && (
            <Text style={styles.detailText}>
              Comparative: {flashcard.grammaticalInfo.comparative}
            </Text>
          )}
        </View>
      </View>
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Lesson {lessonId} Vocabulary</Text>
        <Text style={styles.summaryText}>
          Total: {vocabSummary.total} words (
          {vocabSummary[WordType.NOUN]} nouns, 
          {vocabSummary[WordType.VERB]} verbs, 
          {vocabSummary[WordType.ADJECTIVE]} adjectives, 
          {vocabSummary.other} others)
        </Text>
      </View>
      
      {/* Filter buttons */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === WordType.NOUN && styles.filterButtonActive]}
          onPress={() => setFilter(WordType.NOUN)}
        >
          <Text style={[styles.filterText, filter === WordType.NOUN && styles.filterTextActive]}>
            Nouns
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === WordType.VERB && styles.filterButtonActive]}
          onPress={() => setFilter(WordType.VERB)}
        >
          <Text style={[styles.filterText, filter === WordType.VERB && styles.filterTextActive]}>
            Verbs
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterButton, filter === WordType.ADJECTIVE && styles.filterButtonActive]}
          onPress={() => setFilter(WordType.ADJECTIVE)}
        >
          <Text style={[styles.filterText, filter === WordType.ADJECTIVE && styles.filterTextActive]}>
            Adjectives
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Flashcard list */}
      <FlatList
        data={filteredVocabulary}
        renderItem={renderFlashcardItem}
        keyExtractor={(item, index) => `${item.flashcard.id}-${index}`}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No vocabulary words found for this lesson.
          </Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  summaryContainer: {
    padding: 16,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 2,
    borderColor: COLORS.accent,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  summaryText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: COLORS.background,
    justifyContent: 'space-around',
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    borderRadius: 0, // Pixel-perfect look
    backgroundColor: COLORS.cardBackground,
  },
  filterButtonActive: {
    backgroundColor: COLORS.accent,
  },
  filterText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  filterTextActive: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  flashcardItem: {
    marginBottom: 16,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 3,
    borderColor: COLORS.accent,
    // Pixel-perfect borders
    borderRightColor: '#888800',
    borderBottomColor: '#888800',
    overflow: 'hidden',
  },
  flashcardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.background,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.accent,
  },
  flashcardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
  },
  wordTypeLabel: {
    fontSize: 14,
    color: COLORS.retroOrange,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  flashcardBody: {
    padding: 12,
  },
  usageText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  translationText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    marginBottom: 8,
    fontFamily: 'monospace',
  },
  detailText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: COLORS.textSecondary,
    marginTop: 32,
    fontFamily: 'monospace',
  }
});

export default FlashcardManager;