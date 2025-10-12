import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { FontAwesome5, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SafeScreen from '../components/SafeScreen';
import EditCardModal from '../components/flashcards/EditCardModal';
import { createViewCardsStyles } from '../assets/styles/viewCards.styles';

const ViewCards = () => {
  const { deckId } = useLocalSearchParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedCardForEdit, setSelectedCardForEdit] = useState(null);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const styles = createViewCardsStyles();

  useEffect(() => {
    const loadDeck = async () => {
      try {
        const storedDecks = await AsyncStorage.getItem('flashcard_decks');
        if (storedDecks) {
          const decks = JSON.parse(storedDecks);
          const foundDeck = decks.find(d => d.id === deckId);
          if (foundDeck) {
            setDeck(foundDeck);
            setCards(foundDeck.cards || []);
          }
        }
      } catch (error) {
        console.error('Error loading deck:', error);
      }
    };

    loadDeck();
  }, [deckId]);

  const handleEditCard = (cardIndex) => {
    const cardToEdit = cards[cardIndex];
    setSelectedCardForEdit(cardToEdit);
    setSelectedCardIndex(cardIndex);
    setEditModalVisible(true);
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false);
    setSelectedCardForEdit(null);
    setSelectedCardIndex(null);
  };

  const handleSaveEdit = async (updatedCard) => {
    try {
      // Update the cards array
      const updatedCards = [...cards];
      updatedCards[selectedCardIndex] = updatedCard;
      
      // Update the deck object
      const updatedDeck = { ...deck, cards: updatedCards };
      
      // Save to AsyncStorage
      const storedDecks = await AsyncStorage.getItem('flashcard_decks');
      const decks = JSON.parse(storedDecks || '[]');
      const deckIndex = decks.findIndex(d => d.id === deckId);
      
      if (deckIndex !== -1) {
        decks[deckIndex] = updatedDeck;
        await AsyncStorage.setItem('flashcard_decks', JSON.stringify(decks));
        
        // Update local state
        setCards(updatedCards);
        setDeck(updatedDeck);
        
        // Close modal
        setEditModalVisible(false);
        setSelectedCardForEdit(null);
        setSelectedCardIndex(null);
      }
    } catch (error) {
      console.error('Error updating card:', error);
      Alert.alert('Error', 'Failed to update card');
    }
  };

  const handleDeleteCard = (cardIndex) => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteCard(cardIndex)
        }
      ]
    );
  };

  const deleteCard = async (cardIndex) => {
    try {
      const updatedCards = cards.filter((_, index) => index !== cardIndex);
      const updatedDeck = { ...deck, cards: updatedCards };
      
      const storedDecks = await AsyncStorage.getItem('flashcard_decks');
      const decks = JSON.parse(storedDecks || '[]');
      const deckIndex = decks.findIndex(d => d.id === deckId);
      
      if (deckIndex !== -1) {
        decks[deckIndex] = updatedDeck;
        await AsyncStorage.setItem('flashcard_decks', JSON.stringify(decks));
        setCards(updatedCards);
        setDeck(updatedDeck);
      }
    } catch (error) {
      console.error('Error deleting card:', error);
      Alert.alert('Error', 'Failed to delete card');
    }
  };

  if (!deck) {
    return (
      <SafeScreen>
        <View style={styles.container}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </SafeScreen>
    );
  }

  return (
    <SafeScreen>
      <View style={styles.container}>
        {/* Header with back arrow and title */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <FontAwesome5 name="arrow-left" size={20} color="#FFD700" />
          </TouchableOpacity>
          
          <Text style={styles.pageTitle}>
            {cards.length} card{cards.length !== 1 ? 's' : ''}
          </Text>
        </View>

        {/* Cards List */}
        {cards.length > 0 ? (
          <ScrollView style={styles.cardsList} showsVerticalScrollIndicator={false}>
            {cards.map((card, index) => (
              <View key={index} style={styles.cardItem}>
                <View style={styles.cardContent}>
                  <View style={styles.cardNumber}>
                    <Text style={styles.cardNumberText}>{index + 1}</Text>
                  </View>
                  
                  <View style={styles.cardTexts}>
                    <View style={styles.cardSide}>
                      <Text style={styles.cardLabel}>Front:</Text>
                      <Text style={styles.cardText}>{card.front}</Text>
                    </View>
                    
                    <View style={styles.cardSide}>
                      <Text style={styles.cardLabel}>Back:</Text>
                      <Text style={styles.cardText}>{card.back}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.cardActions}>
                    <TouchableOpacity 
                      style={styles.editButton} 
                      onPress={() => handleEditCard(index)}
                    >
                      <FontAwesome5 name="edit" size={16} color="#FFD700" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={styles.deleteButton} 
                      onPress={() => handleDeleteCard(index)}
                    >
                      <Entypo name="trash" size={16} color="#FF6B6B" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <FontAwesome5 name="inbox" size={64} color="#666" />
            <Text style={styles.emptyText}>No cards in this deck yet</Text>
            <Text style={styles.emptySubtext}>Add some cards to get started</Text>
          </View>
        )}
      </View>

      {/* Edit Card Modal */}
      <EditCardModal
        visible={editModalVisible}
        card={selectedCardForEdit}
        onCancel={handleCancelEdit}
        onSave={handleSaveEdit}
      />
    </SafeScreen>
  );
};

export default ViewCards;