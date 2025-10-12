import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput, FlatList, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons, FontAwesome5, Entypo } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import styles from '../../assets/styles/flashcards.styles';
import FlashcardReview from '../../components/FlashcardReview';

const STORAGE_KEY = 'flashcard_decks';

export default function Flashcards() {
  const [decks, setDecks] = useState([]);
  const [createDeckModalVisible, setCreateDeckModalVisible] = useState(false);
  const [createCardModalVisible, setCreateCardModalVisible] = useState(false);
  const [deckSettingsModalVisible, setDeckSettingsModalVisible] = useState(false);
  const [deckReviewModalVisible, setDeckReviewModalVisible] = useState(false);
  const [showReviewScreen, setShowReviewScreen] = useState(false);
  const [selectedDeckForSettings, setSelectedDeckForSettings] = useState(null);
  const [selectedDeckForReview, setSelectedDeckForReview] = useState(null);
  const [newDeckTitle, setNewDeckTitle] = useState('');
  const [selectedDeckId, setSelectedDeckId] = useState('');
  const [cardFront, setCardFront] = useState('');
  const [cardBack, setCardBack] = useState('');

  // Load decks from device storage when screen focuses
  useFocusEffect(
    useCallback(() => {
      loadDecksFromStorage();
    }, [])
  );

  // Save decks to device storage
  const saveDecksToStorage = async (decksToSave) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(decksToSave));
    } catch (error) {
      console.error('Error saving decks:', error);
      Alert.alert('Error', 'Failed to save data to device');
    }
  };

  // Load decks from device storage
  const loadDecksFromStorage = async () => {
    try {
      const savedDecks = await AsyncStorage.getItem(STORAGE_KEY);
      if (savedDecks) {
        setDecks(JSON.parse(savedDecks));
      }
    } catch (error) {
      console.error('Error loading decks:', error);
    }
  };

  // Deck creation handlers
  const handleCreateDeck = () => {
    setCreateDeckModalVisible(true);
  };

  const handleConfirmCreateDeck = async () => {
    if (newDeckTitle.trim() === '') {
      Alert.alert('Error', 'Please enter a title for your deck');
      return;
    }

    const newDeck = {
      id: Date.now().toString(),
      title: newDeckTitle.trim(),
      cards: [],
      createdAt: new Date().toISOString(),
    };

    const updatedDecks = [...decks, newDeck];
    setDecks(updatedDecks);
    await saveDecksToStorage(updatedDecks);
    setNewDeckTitle('');
    setCreateDeckModalVisible(false);
  };

  const handleCancelCreateDeck = () => {
    setNewDeckTitle('');
    setCreateDeckModalVisible(false);
  };

  // Card creation handlers
  const handleCreateCard = () => {
    if (decks.length === 0) {
      Alert.alert('No Decks Available', 'Please create a deck first before adding cards.');
      return;
    }
    setSelectedDeckId(decks[0].id); // Default to first deck
    setCreateCardModalVisible(true);
  };

  const handleConfirmCreateCard = async () => {
    if (!selectedDeckId) {
      Alert.alert('Error', 'Please select a deck');
      return;
    }
    if (cardFront.trim() === '') {
      Alert.alert('Error', 'Please enter content for the front of the card');
      return;
    }
    if (cardBack.trim() === '') {
      Alert.alert('Error', 'Please enter content for the back of the card');
      return;
    }

    const newCard = {
      id: Date.now().toString(),
      front: cardFront.trim(),
      back: cardBack.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedDecks = decks.map(deck => {
      if (deck.id === selectedDeckId) {
        return {
          ...deck,
          cards: [...deck.cards, newCard]
        };
      }
      return deck;
    });

    setDecks(updatedDecks);
    await saveDecksToStorage(updatedDecks);
    setCardFront('');
    setCardBack('');
    setSelectedDeckId('');
    setCreateCardModalVisible(false);
  };

  const handleCancelCreateCard = () => {
    setCardFront('');
    setCardBack('');
    setSelectedDeckId('');
    setCreateCardModalVisible(false);
  };

  // Deck settings handlers
  const handleDeckSettings = (deck) => {
    setSelectedDeckForSettings(deck);
    setDeckSettingsModalVisible(true);
  };

  const handleDeleteDeck = () => {
    Alert.alert(
      'Delete Deck',
      `Are you sure you want to delete "${selectedDeckForSettings?.title}"? This will permanently delete the deck and all ${selectedDeckForSettings?.cards.length} cards inside it.`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: confirmDeleteDeck,
        },
      ]
    );
  };

  const confirmDeleteDeck = async () => {
    const updatedDecks = decks.filter(deck => deck.id !== selectedDeckForSettings.id);
    setDecks(updatedDecks);
    await saveDecksToStorage(updatedDecks);
    setDeckSettingsModalVisible(false);
    setSelectedDeckForSettings(null);
  };

  const handleViewCards = () => {
    setDeckSettingsModalVisible(false);
    router.push({
      pathname: '/view-cards',
      params: { deckId: selectedDeckForSettings.id }
    });
  };

  const handleCloseDeckSettings = () => {
    setDeckSettingsModalVisible(false);
    setSelectedDeckForSettings(null);
  };

  // Deck review handlers
  const handleDeckClick = (deck) => {
    if (deck.cards.length === 0) {
      Alert.alert('No Cards', 'This deck is empty. Add some cards first!');
      return;
    }
    setSelectedDeckForReview(deck);
    setDeckReviewModalVisible(true);
  };

  const handleBeginReview = () => {
    setDeckReviewModalVisible(false);
    setShowReviewScreen(true);
  };

  const handleCloseDeckReview = () => {
    setDeckReviewModalVisible(false);
    setSelectedDeckForReview(null);
  };

  const handleExitReview = () => {
    setShowReviewScreen(false);
    setSelectedDeckForReview(null);
  };

  const renderDeckCard = ({ item }) => (
    <TouchableOpacity style={styles.deckCard} onPress={() => handleDeckClick(item)}>
      <Text style={styles.deckTitle}>{item.title}</Text>
      <Text style={styles.deckCardCount}>{item.cards.length} cards</Text>
      
      <TouchableOpacity 
        style={styles.deckSettingsButton}
        onPress={(e) => {
          e.stopPropagation();
          handleDeckSettings(item);
        }}
      >
        <MaterialIcons name="settings" size={16} color="#1E2A4A" style={styles.buttonIcon} />
        <Text style={styles.deckSettingsButtonText}>Settings</Text>
      </TouchableOpacity>
      
      <Text style={styles.deckDate}>
        Created {new Date(item.createdAt).toLocaleDateString()}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      {showReviewScreen ? (
        <FlashcardReview 
          deck={selectedDeckForReview}
          onExit={handleExitReview}
        />
      ) : (
        <View style={styles.container}>
      {/* Header with action buttons */}
      <View style={styles.headerContainer}>
        <Text style={styles.pageTitle}>Flashcards</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.actionButton} onPress={handleCreateDeck}>
            <Text style={styles.buttonText}>Create Deck</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton} onPress={handleCreateCard}>
            <Text style={styles.buttonText}>Create Card</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Decks Display */}
      {decks.length > 0 ? (
        <View style={styles.decksContainer}>
          <Text style={styles.sectionTitle}>Your Decks</Text>
          <FlatList
            data={decks}
            renderItem={renderDeckCard}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.decksList}
          />
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No decks created yet</Text>
          <Text style={styles.emptyStateSubtext}>Create your first deck to get started!</Text>
        </View>
      )}

      {/* Create Deck Modal */}
      <Modal
        visible={createDeckModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelCreateDeck}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={styles.modalScrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create New Deck</Text>
              
              <TextInput
                style={styles.textInput}
                placeholder="Enter deck title..."
                placeholderTextColor="#888"
                value={newDeckTitle}
                onChangeText={setNewDeckTitle}
                autoFocus
                returnKeyType="done"
                onSubmitEditing={handleConfirmCreateDeck}
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelCreateDeck}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCreateDeck}>
                  <Text style={styles.confirmButtonText}>Create</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Create Card Modal */}
      <Modal
        visible={createCardModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCancelCreateCard}
      >
        <KeyboardAvoidingView 
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView 
            contentContainerStyle={styles.modalScrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Create New Card</Text>
              
              {/* Deck Selection */}
              <Text style={styles.fieldLabel}>Select Deck:</Text>
              <View style={styles.pickerContainer}>
                <ScrollView 
                  style={styles.deckPicker}
                  showsVerticalScrollIndicator={false}
                >
                  {decks.map((deck) => (
                    <TouchableOpacity
                      key={deck.id}
                      style={[
                        styles.deckOption,
                        selectedDeckId === deck.id && styles.selectedDeckOption
                      ]}
                      onPress={() => setSelectedDeckId(deck.id)}
                    >
                      <Text style={[
                        styles.deckOptionText,
                        selectedDeckId === deck.id && styles.selectedDeckOptionText
                      ]}>
                        {deck.title} ({deck.cards.length} cards)
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              {/* Card Front */}
              <Text style={styles.fieldLabel}>Front of Card:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter front content..."
                placeholderTextColor="#888"
                value={cardFront}
                onChangeText={setCardFront}
                multiline
                numberOfLines={3}
              />
              
              {/* Card Back */}
              <Text style={styles.fieldLabel}>Back of Card:</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter back content..."
                placeholderTextColor="#888"
                value={cardBack}
                onChangeText={setCardBack}
                multiline
                numberOfLines={3}
              />
              
              <View style={styles.modalButtons}>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelCreateCard}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmCreateCard}>
                  <Text style={styles.confirmButtonText}>Create Card</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>

      {/* Deck Settings Modal */}
      <Modal
        visible={deckSettingsModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseDeckSettings}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCenterContainer}>
            <View style={styles.settingsModalContent}>
              <Text style={styles.modalTitle}>
                Deck Settings
              </Text>
              <Text style={styles.deckSettingsTitle}>
                &ldquo;{selectedDeckForSettings?.title}&rdquo;
              </Text>
              
              <View style={styles.settingsButtons}>
                <TouchableOpacity 
                  style={styles.settingsActionButton}
                  onPress={handleViewCards}
                >
                  <FontAwesome5 name="search" size={16} color="#1E2A4A" style={styles.buttonIcon} />
                  <Text style={styles.settingsActionText}>View Cards</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.settingsActionButton, styles.deleteButton]}
                  onPress={handleDeleteDeck}
                >
                  <Entypo name="trash" size={16} color="#FFFFFF" style={styles.buttonIcon} />
                  <Text style={[styles.settingsActionText, styles.deleteButtonText]}>Delete Deck</Text>
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={handleCloseDeckSettings}
              >
                <Text style={styles.cancelButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Deck Review Modal */}
      <Modal
        visible={deckReviewModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleCloseDeckReview}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCenterContainer}>
            <View style={styles.reviewModalContent}>
              <Text style={styles.modalTitle}>
                Review Flashcards
              </Text>
              <Text style={styles.deckSettingsTitle}>
                &ldquo;{selectedDeckForReview?.title}&rdquo;
              </Text>
              <Text style={styles.reviewModalDescription}>
                Ready to review {selectedDeckForReview?.cards.length} flashcards?
              </Text>
              
              <View style={styles.reviewModalButtons}>
                <TouchableOpacity 
                  style={styles.settingsActionButton}
                  onPress={handleBeginReview}
                >
                  <MaterialIcons name="play-arrow" size={18} color="#1E2A4A" style={styles.buttonIcon} />
                  <Text style={styles.settingsActionText}>Begin Review</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.cancelButton}
                  onPress={handleCloseDeckReview}
                >
                  <Text style={styles.cancelButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      
        </View>
      )}
    </>
  );
}