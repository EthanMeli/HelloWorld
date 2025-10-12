import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView,
  Alert
} from 'react-native';
import styles from '../../assets/styles/flashcards.styles';

const EditCardModal = ({ 
  visible, 
  card, 
  onCancel, 
  onSave 
}) => {
  const [frontText, setFrontText] = useState('');
  const [backText, setBackText] = useState('');

  // Update local state when card prop changes
  useEffect(() => {
    if (card) {
      setFrontText(card.front || '');
      setBackText(card.back || '');
    }
  }, [card]);

  const handleCancel = () => {
    // Reset to original values
    if (card) {
      setFrontText(card.front || '');
      setBackText(card.back || '');
    }
    onCancel();
  };

  const handleSave = () => {
    // Validate inputs
    if (frontText.trim() === '') {
      Alert.alert('Error', 'Please enter content for the front of the card');
      return;
    }
    if (backText.trim() === '') {
      Alert.alert('Error', 'Please enter content for the back of the card');
      return;
    }

    // Create updated card object
    const updatedCard = {
      ...card,
      front: frontText.trim(),
      back: backText.trim()
    };

    onSave(updatedCard);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleCancel}
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
            <Text style={styles.modalTitle}>Edit Card</Text>
            
            {/* Card Front */}
            <Text style={styles.fieldLabel}>Front of Card:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter front content..."
              placeholderTextColor="#888"
              value={frontText}
              onChangeText={setFrontText}
              multiline
              numberOfLines={3}
            />
            
            {/* Card Back */}
            <Text style={styles.fieldLabel}>Back of Card:</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter back content..."
              placeholderTextColor="#888"
              value={backText}
              onChangeText={setBackText}
              multiline
              numberOfLines={3}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={handleSave}>
                <Text style={styles.confirmButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default EditCardModal;