import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, FAB, Text, IconButton } from 'react-native-paper';
import { api } from '../../services/api';

const DeckDetailScreen = ({ route, navigation }) => {
  const { deck } = route.params;
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const response = await api.get(`/decks/${deck._id}/cards`);
      setCards(response.data);
    } catch (error) {
      console.error('Error loading cards:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCards();
    setRefreshing(false);
  };

  const handleDeleteCard = async (cardId) => {
    try {
      // Note: This would need a DELETE endpoint in the backend
      // For now, we'll just remove it from the local state
      setCards(cards.filter(card => card._id !== cardId));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const renderCard = ({ item, index }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNumber}>Card {index + 1}</Text>
          <IconButton
            icon="delete"
            size={20}
            onPress={() => handleDeleteCard(item._id)}
          />
        </View>
        
        <View style={styles.cardContent}>
          <View style={styles.cardSide}>
            <Text style={styles.cardLabel}>Front:</Text>
            <Text style={styles.cardText}>{item.front}</Text>
          </View>
          
          <View style={styles.cardSide}>
            <Text style={styles.cardLabel}>Back:</Text>
            <Text style={styles.cardText}>{item.back}</Text>
          </View>
          
          {item.hint && (
            <View style={styles.cardSide}>
              <Text style={styles.cardLabel}>Hint:</Text>
              <Text style={styles.cardHint}>{item.hint}</Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading cards...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>{deck.name}</Title>
        <Paragraph style={styles.headerSubtitle}>
          {cards.length} card{cards.length !== 1 ? 's' : ''}
        </Paragraph>
        {deck.description && (
          <Paragraph style={styles.headerDescription}>
            {deck.description}
          </Paragraph>
        )}
      </View>

      {cards.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No cards in this deck yet</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('CreateCard', { deck })}
            style={styles.addCardButton}
          >
            Add First Card
          </Button>
        </View>
      ) : (
        <FlatList
          data={cards}
          renderItem={renderCard}
          keyExtractor={(item) => item._id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          contentContainerStyle={styles.listContainer}
        />
      )}

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('CreateCard', { deck })}
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
    marginBottom: 4,
  },
  headerDescription: {
    color: '#666',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 80, // Space for FAB
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  cardContent: {
    gap: 12,
  },
  cardSide: {
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 4,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 22,
  },
  cardHint: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addCardButton: {
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default DeckDetailScreen;
