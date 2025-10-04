import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';
import { pixelText } from '../../constants/retroStyles';

/**
 * TappableText Component
 * 
 * This component takes a text string and splits it into individual words,
 * making each word tappable if it has a translation. When a word is tapped,
 * a modal is shown with the word and its translation.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The original text (in German)
 * @param {Object} props.translations - Object mapping German words to their English translations
 * @param {boolean} props.isLeftSide - Whether the text is displayed on the left side (speaker 1)
 * @param {Object} props.textStyle - Style to apply to the text
 */
const TappableText = ({ text, translations, isLeftSide, textStyle }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');

  // Split the text into words and preserve spaces and punctuation
  const splitText = () => {
    // Regex to split text while preserving punctuation
    return text.split(/(\s+|[,.!?;:]+)/).filter(word => word !== '');
  };

  // Handle word tap
  const handleWordTap = (word) => {
    // Clean the word from any punctuation for translation lookup
    const cleanWord = word.replace(/[,.!?;:]/g, '');
    
    // Check if this word has a translation
    if (translations && translations[cleanWord]) {
      setSelectedWord(cleanWord);
      setTranslation(translations[cleanWord]);
      setModalVisible(true);
    }
  };

  return (
    <View>
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {splitText().map((word, index) => {
          const cleanWord = word.replace(/[,.!?;:]/g, '');
          const hasTranslation = translations && translations[cleanWord];

          // If it's just whitespace, render a space
          if (/^\s+$/.test(word)) {
            return <Text key={index} style={textStyle}> </Text>;
          }
          
          return hasTranslation ? (
            <TouchableOpacity 
              key={index} 
              onPress={() => handleWordTap(word)}
              activeOpacity={0.8}
            >
              <Text style={[textStyle, styles.tappable]}>
                {word}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text key={index} style={textStyle}>{word}</Text>
          );
        })}
      </View>

      {/* Modal for displaying word translations */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedWord}</Text>
            </View>
            <View style={styles.modalBody}>
              <Text style={styles.modalText}>{translation}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  tappable: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: COLORS.accent,
    // Apply a glow effect to tappable words
    textShadowColor: COLORS.accent,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
    color: COLORS.accent,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: COLORS.background,
    // No border radius for pixel art aesthetic
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  modalHeader: {
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accent,
  },
  modalTitle: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  modalBody: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  }
});

export default TappableText;
