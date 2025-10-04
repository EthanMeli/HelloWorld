import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';
import { getFlashcardForWord } from '../../data/lessons';
import { getWordTypeAbbreviation, getArticle, WordType, Gender } from '../../data/flashcards';

// Custom component for formatting example text with bold words
const FormattedExampleText = ({ exampleSentence, style, boldStyle }) => {
  // Split the sentence by <b> and </b> tags
  const parts = exampleSentence.split(/(<b>|<\/b>)/);
  
  // Keep track of whether we're inside bold tags
  let isBold = false;
  
  return (
    <Text style={style}>
      {parts.map((part, index) => {
        if (part === '<b>') {
          isBold = true;
          return null;
        } else if (part === '</b>') {
          isBold = false;
          return null;
        } else {
          return (
            <Text key={index} style={isBold ? boldStyle : null}>
              {part}
            </Text>
          );
        }
      })}
    </Text>
  );
};

/**
 * TappableText Component
 * 
 * This component takes a text string and splits it into individual words,
 * making each word tappable if it has a translation or flashcard mapping. 
 * When a word is tapped, a flashcard modal is shown with comprehensive information.
 * 
 * @param {Object} props - Component props
 * @param {string} props.text - The original text (in German)
 * @param {Object} props.translations - Object mapping German words to their English translations
 * @param {Object} props.vocabularyMap - Object mapping German words to flashcard IDs
 * @param {Object} props.dialogueEntry - The full dialogue entry containing this text
 * @param {boolean} props.isLeftSide - Whether the text is displayed on the left side (speaker 1)
 * @param {Object} props.textStyle - Style to apply to the text
 */
const TappableText = ({ 
  text, 
  translations, 
  vocabularyMap = {}, 
  dialogueEntry = {}, 
  isLeftSide, 
  textStyle 
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [translation, setTranslation] = useState('');
  
  // Helper function to determine the part of speech for a word
  const determinePartOfSpeech = (word) => {
    // This is a simple heuristic - in a real app, this would come from your data
    // Common German nouns often start with a capital letter
    if (word.charAt(0) === word.charAt(0).toUpperCase() && word.length > 1) {
      return "n."; // Noun
    }
    // Common verbs often end in -en in German
    if (word.endsWith('en') || word.endsWith('n')) {
      return "v."; // Verb
    }
    // Default to adjective for this demo
    return "adj.";
  };
  
  // Helper function to get the infinitive form of a word based on its part of speech
  const getInfinitiveForm = (word) => {
    const partOfSpeech = determinePartOfSpeech(word);
    
    // For verbs, convert to infinitive if not already
    if (partOfSpeech === "v." && !word.endsWith('en')) {
      // Common verb endings in German
      const verbEndings = {
        'e': 'en',   // ich gehe -> gehen
        'st': 'en',  // du gehst -> gehen
        't': 'en',   // er/sie/es geht -> gehen
        'en': 'en',  // wir gehen -> gehen
        'et': 'en'   // ihr gehet -> gehen
      };
      
      // Try to determine the verb stem and add 'en'
      for (const [ending, infinitive] of Object.entries(verbEndings)) {
        if (word.endsWith(ending)) {
          return word.slice(0, -ending.length) + infinitive;
        }
      }
      
      // Default: just add 'en' if we can't determine
      return word + 'en';
    }
    
    return word; // Return as is for other parts of speech
  };
  
  // Helper function to get conjugation explanation for verbs
  const getConjugationInfo = (word) => {
    const partOfSpeech = determinePartOfSpeech(word);
    const infinitive = getInfinitiveForm(word);
    
    // Only generate explanation for verbs that aren't in infinitive form
    if (partOfSpeech === "v." && word !== infinitive) {
      // Determine tense and person based on ending (simplified)
      let tense = "present";
      let person = "";
      
      if (word.endsWith('e')) {
        person = "1st person singular (ich)";
      } else if (word.endsWith('st')) {
        person = "2nd person singular (du)";
      } else if (word.endsWith('t')) {
        person = "3rd person singular (er/sie/es)";
      } else if (word.endsWith('en')) {
        person = "1st/3rd person plural (wir/sie)";
      } else if (word.endsWith('et')) {
        person = "2nd person plural (ihr)";
      }
      
      return {
        infinitive: infinitive,
        tense: tense,
        person: person,
        hasConjugation: true
      };
    }
    
    return { 
      infinitive: word,
      hasConjugation: false
    };
  };
  
  // Helper function to create an example sentence
  const createExampleSentence = (word) => {
    const partOfSpeech = determinePartOfSpeech(word);
    
    // Examples for different parts of speech
    const nounExamples = {
      "Tag": "Heute ist ein schöner <b>Tag</b>.",
      "Hallo": "<b>Hallo</b>, wie geht es dir?",
    };
    
    // Verb examples - using infinitive forms
    const verbExamples = {
      "gehen": "Ich möchte in die Stadt <b>gehen</b>.",
      "haben": "Wir <b>haben</b> viele Bücher.",
      "sein": "Es ist schön zu <b>sein</b>.",
      "essen": "Ich möchte Pizza <b>essen</b>.",
      "trinken": "Willst du Wasser <b>trinken</b>?",
      "kommen": "Sie wird morgen <b>kommen</b>.",
      "machen": "Was <b>machen</b> wir heute?"
    };
    
    // Adjective examples - showing their basic forms
    const adjectiveExamples = {
      "gut": "Das Essen schmeckt <b>gut</b>.",
      "schön": "Die Blume ist <b>schön</b>.",
      "klein": "Das Auto ist <b>klein</b>.",
      "groß": "Der Baum ist <b>groß</b>."
    };
    
    // Select example based on part of speech
    if (partOfSpeech === "n." && nounExamples[word]) {
      return nounExamples[word];
    } else if (partOfSpeech === "v." && verbExamples[word]) {
      return verbExamples[word];
    } else if (partOfSpeech === "adj." && adjectiveExamples[word]) {
      return adjectiveExamples[word];
    }
    
    // Default examples if specific word not found
    if (partOfSpeech === "v.") {
      return `Man kann das Verb "<b>${word}</b>" in verschiedenen Situationen benutzen.`;
    } else if (partOfSpeech === "adj.") {
      return `Die Eigenschaft "<b>${word}</b>" beschreibt einen Zustand.`;
    }
    
    // Generic fallback
    return `Das ist ein Beispiel mit dem Wort <b>${word}</b>.`;
  };

  // Split the text into words and preserve spaces and punctuation
  const splitText = () => {
    // Regex to split text while preserving punctuation
    return text.split(/(\s+|[,.!?;:]+)/).filter(word => word !== '');
  };

  // State for storing flashcard data
  const [flashcardData, setFlashcardData] = useState(null);

  // Handle word tap
  const handleWordTap = (word) => {
    // Clean the word from any punctuation for translation lookup
    const cleanWord = word.replace(/[,.!?;:]/g, '');
    
    // Try to get flashcard data if available
    const flashcard = vocabularyMap && vocabularyMap[cleanWord] ? 
      getFlashcardForWord(cleanWord, dialogueEntry, 'german') : null;
    
    if (flashcard) {
      // We have flashcard data
      setSelectedWord(cleanWord);
      setFlashcardData(flashcard);
      setTranslation(translations && translations[cleanWord] ? 
        translations[cleanWord] : 
        flashcard.translations.english);
      setModalVisible(true);
    } else if (translations && translations[cleanWord]) {
      // Fallback to simple translation
      setSelectedWord(cleanWord);
      setFlashcardData(null);
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
          const hasFlashcard = vocabularyMap && vocabularyMap[cleanWord];

          // If it's just whitespace, render a space
          if (/^\s+$/.test(word)) {
            return <Text key={index} style={textStyle}> </Text>;
          }
          
          return (hasTranslation || hasFlashcard) ? (
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

      {/* Modal for displaying word translations as flashcards */}
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
          <View style={styles.flashcardContent}>
            {/* Word at top of flashcard */}
            <View style={styles.flashcardHeader}>
              <Text style={styles.flashcardWord}>
                {flashcardData ? (
                  // Display according to word type
                  flashcardData.wordType === WordType.NOUN ? 
                    `${getArticle(flashcardData.grammaticalInfo.gender)} ${flashcardData.baseForm}` : 
                    flashcardData.baseForm
                ) : (
                  // Fallback to our old logic
                  determinePartOfSpeech(selectedWord) === "v." || 
                  determinePartOfSpeech(selectedWord) === "adj." ? 
                    getInfinitiveForm(selectedWord) : selectedWord
                )}
              </Text>
            </View>
            
            {/* Definition section */}
            <View style={styles.flashcardBody}>
              {flashcardData ? (
                // Display using our rich flashcard data
                <>
                  {/* Word form as used in dialogue */}
                  {selectedWord !== flashcardData.baseForm && (
                    <Text style={styles.wordFormText}>
                      As used in dialogue: "{selectedWord}"
                    </Text>
                  )}
                  
                  {/* Part of speech and translation */}
                  <View style={styles.definitionRow}>
                    <Text style={styles.partOfSpeech}>
                      {getWordTypeAbbreviation(flashcardData.wordType)}
                    </Text>
                    <Text style={styles.translation}>
                      {flashcardData.translations.english}
                    </Text>
                  </View>
                  
                  {/* Grammar info by type */}
                  {flashcardData.wordType === WordType.VERB && (
                    <View style={styles.conjugationContainer}>
                      <Text style={styles.conjugationTitle}>
                        VERB CONJUGATION:
                      </Text>
                      
                      {/* Present tense conjugation */}
                      <Text style={styles.conjugationSubtitle}>Present Tense:</Text>
                      <Text style={styles.conjugationText}>
                        ich {flashcardData.grammaticalInfo.conjugation.present.ich},
                        du {flashcardData.grammaticalInfo.conjugation.present.du}
                      </Text>
                      <Text style={styles.conjugationText}>
                        er/sie/es {flashcardData.grammaticalInfo.conjugation.present.er_sie_es}
                      </Text>
                      <Text style={styles.conjugationText}>
                        wir {flashcardData.grammaticalInfo.conjugation.present.wir},
                        ihr {flashcardData.grammaticalInfo.conjugation.present.ihr},
                        sie/Sie {flashcardData.grammaticalInfo.conjugation.present.sie_Sie}
                      </Text>
                      
                      {/* Perfect tense info */}
                      <Text style={styles.conjugationSubtitle}>Perfect Tense:</Text>
                      <Text style={styles.conjugationText}>
                        Perfect participle: {flashcardData.grammaticalInfo.conjugation.perfect}
                      </Text>
                      <Text style={styles.conjugationText}>
                        Auxiliary: {flashcardData.grammaticalInfo.auxiliaryVerb}
                      </Text>
                    </View>
                  )}
                  
                  {/* Noun-specific information */}
                  {flashcardData.wordType === WordType.NOUN && (
                    <View style={styles.conjugationContainer}>
                      <Text style={styles.conjugationTitle}>
                        NOUN INFORMATION:
                      </Text>
                      <Text style={styles.conjugationText}>
                        Gender: {flashcardData.grammaticalInfo.gender}
                      </Text>
                      <Text style={styles.conjugationText}>
                        Plural: {flashcardData.grammaticalInfo.plural}
                      </Text>
                    </View>
                  )}
                  
                  {/* Adjective-specific information */}
                  {flashcardData.wordType === WordType.ADJECTIVE && (
                    <View style={styles.conjugationContainer}>
                      <Text style={styles.conjugationTitle}>
                        ADJECTIVE FORMS:
                      </Text>
                      <Text style={styles.conjugationText}>
                        Comparative: {flashcardData.grammaticalInfo.comparative}
                      </Text>
                      <Text style={styles.conjugationText}>
                        Superlative: {flashcardData.grammaticalInfo.superlative}
                      </Text>
                    </View>
                  )}
                  
                  {/* Example sentences */}
                  <View style={styles.exampleContainer}>
                    <Text style={styles.exampleLabel}>EXAMPLES:</Text>
                    {flashcardData.examples.map((example, index) => (
                      <View key={index} style={styles.exampleItem}>
                        <FormattedExampleText
                          exampleSentence={example.sentence}
                          style={styles.exampleText}
                          boldStyle={styles.boldText}
                        />
                        <Text style={styles.exampleTranslation}>
                          {example.translation}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              ) : (
                // Fallback to our simplified view
                <>
                  {/* Get conjugation info for selected word */}
                  {(() => {
                    const partOfSpeech = determinePartOfSpeech(selectedWord);
                    const conjugationInfo = getConjugationInfo(selectedWord);
                    const displayWord = conjugationInfo.hasConjugation ? 
                      conjugationInfo.infinitive : selectedWord;
                    
                    return (
                      <>
                        {/* Part of speech and translation */}
                        <View style={styles.definitionRow}>
                          <Text style={styles.partOfSpeech}>
                            {partOfSpeech}
                          </Text>
                          <Text style={styles.translation}>
                            {translation}
                          </Text>
                        </View>
                        
                        {/* Conjugation info for verbs */}
                        {conjugationInfo.hasConjugation && (
                          <View style={styles.conjugationContainer}>
                            <Text style={styles.conjugationTitle}>
                              VERB FORM:
                            </Text>
                            <Text style={styles.conjugationText}>
                              &ldquo;{selectedWord}&rdquo; is the {conjugationInfo.tense} tense form 
                              for {conjugationInfo.person}.
                            </Text>
                            <Text style={styles.conjugationText}>
                              The infinitive is &ldquo;<Text style={styles.boldText}>{conjugationInfo.infinitive}</Text>&rdquo;
                            </Text>
                          </View>
                        )}
                        
                        {/* Example sentence */}
                        <View style={styles.exampleContainer}>
                          <Text style={styles.exampleLabel}>EXAMPLE:</Text>
                          <FormattedExampleText
                            exampleSentence={createExampleSentence(
                              partOfSpeech === "v." || partOfSpeech === "adj." ? 
                                displayWord : selectedWord
                            )}
                            style={styles.exampleText}
                            boldStyle={styles.boldText}
                          />
                        </View>
                      </>
                    );
                  })()}
                </>
              )}
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
  // Flashcard specific styles
  flashcardContent: {
    width: '85%',
    backgroundColor: COLORS.cardBackground,
    // No border radius for pixel art aesthetic
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: COLORS.accent,
    // Add pixel-perfect corners
    borderRightColor: '#888800', // Darker yellow
    borderBottomColor: '#888800', // Darker yellow
    // Pixel shadow effect
    shadowColor: COLORS.accent,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 0,
    elevation: 5,
  },
  flashcardHeader: {
    padding: 15,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: COLORS.accent,
  },
  flashcardWord: {
    color: COLORS.accent,
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
    // Add text shadow for pixel effect
    textShadowColor: 'rgba(255, 255, 0, 0.4)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  flashcardBody: {
    padding: 20,
    backgroundColor: COLORS.cardBackground,
  },
  definitionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 0, 0.2)',
    paddingBottom: 12,
  },
  partOfSpeech: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.retroOrange,
    marginRight: 8,
    fontFamily: 'monospace',
  },
  translation: {
    fontSize: 18,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    flex: 1,
  },
  exampleContainer: {
    marginTop: 8,
  },
  exampleLabel: {
    fontSize: 14,
    color: COLORS.retroBlue,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  exampleText: {
    fontSize: 16,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    lineHeight: 24,
  },
  boldText: {
    fontWeight: 'bold',
    color: COLORS.retroOrange, // Makes bolded words orange
  },
  conjugationContainer: {
    marginBottom: 16,
    padding: 10,
    borderWidth: 2,
    borderColor: 'rgba(255, 102, 0, 0.3)', // Light orange border
    backgroundColor: 'rgba(255, 102, 0, 0.05)', // Very light orange background
  },
  conjugationTitle: {
    fontSize: 14,
    color: COLORS.retroBlue,
    fontWeight: 'bold',
    marginBottom: 6,
    fontFamily: 'monospace',
  },
  conjugationText: {
    fontSize: 14,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    marginBottom: 4,
  },
  conjugationSubtitle: {
    fontSize: 14,
    color: COLORS.retroGreen,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    fontFamily: 'monospace',
  },
  wordFormText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
    marginBottom: 12,
    textAlign: 'center',
  },
  exampleItem: {
    marginBottom: 10,
  },
  exampleTranslation: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'monospace',
    fontStyle: 'italic',
    marginTop: 4,
  }
});

export default TappableText;
