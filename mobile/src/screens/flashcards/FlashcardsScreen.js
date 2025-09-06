import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Text, Chip } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const FlashcardsScreen = ({ navigation }) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadDecks();
  }, []);

  const loadDecks = async () => {
    try {
      const response = await api.get('/decks');
      setDecks(response.data);
    } catch (error) {
      console.error('Error loading decks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDecks();
    setRefreshing(false);
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const renderDeck = ({ item }) => (
    <Card 
      style={styles.deckCard}
      onPress={() => navigation.navigate('DeckDetail', { deck: item })}
    >
      <Card.Content>
        <View style={styles.deckHeader}>
          <Title style={styles.deckTitle}>
            {getLanguageFlag(item.language)} {item.name}
          </Title>
          <Chip mode="outlined" compact>
            {item.cardCount} cards
          </Chip>
        </View>
        
        {item.description && (
          <Paragraph style={styles.deckDescription}>
            {item.description}
          </Paragraph>
        )}
        
        <View style={styles.deckActions}>
          <Button
            mode="outlined"
            compact
            onPress={() => navigation.navigate('DeckDetail', { deck: item })}
          >
            View Cards
          </Button>
          <Button
            mode="contained"
            compact
            onPress={() => navigation.navigate('Review', { deck: item })}
            disabled={item.cardCount === 0}
          >
            Review
          </Button>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading flashcards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>
          {getLanguageFlag(user.activeLanguage)} Flashcard Decks
        </Title>
        <Paragraph style={styles.headerSubtitle}>
          {decks.length} deck{decks.length !== 1 ? 's' : ''} available
        </Paragraph>
      </View>

      <FlatList
        data={decks}
        renderItem={renderDeck}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateDeck')}
      />
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
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  deckCard: {
    marginBottom: 16,
    elevation: 2,
  },
  deckHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  deckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  deckDescription: {
    marginBottom: 12,
    color: '#666',
  },
  deckActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default FlashcardsScreen;
