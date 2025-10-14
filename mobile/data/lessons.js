import { flashcards } from './flashcards';

/**
 * Lessons data with integrated vocabulary flashcard mapping
 */
export const lessons = [
  {
    id: 1,
    displayTitle: "Viel Glück!",
    title: "Viel Glück!",
    snippet: "Guten Tag!",
    grammarTips: [
      {
        id: 1,
        title: "German Capitalization Rule",
        content: "Take a look at the words Glück and Tag. They both have a capital letter. In German, all nouns are capitalized."
      }
    ],
    dialogue: [
      {
        speaker: "Hanz",
        isSpeaker1: true,
        text: "Guten Tag!",
        translationText: "Good afternoon!",
        translations: {
          "Guten": "good",
          "Tag": "day"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Maps the word as it appears in the text to its flashcard ID
          "Tag": "der_tag",
          "Guten": "gut" // Maps to the adjective "gut" in declined form
        },
        grammarTips: [
          {
            id: 1,
            title: "Common German Greeting",
            content: "Guten Tag is a common greeting in German. It literally means 'good day' and is used similarly to 'hello' in English."
          }
        ]
      },
      {
        speaker: "Maria",
        isSpeaker1: false,
        text: "Hallo! Wie geht es dir?",
        translationText: "Hello! How are you?",
        translations: {
          "Hallo": "hello",
          "Wie": "how",
          "geht": "goes",
          "es": "it",
          "dir": "you"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          "geht": "gehen", // Maps the conjugated form to the infinitive verb
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      {
        speaker: "Hanz",
        isSpeaker1: true,
        text: "Gut, danke! Und dir?",
        translationText: "Good, thanks! And you?",
        translations: {
          "Gut": "good",
          "danke": "thanks",
          "Und": "and",
          "dir": "you"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      {
        speaker: "Maria",
        isSpeaker1: false,
        text: "Auch gut, danke!",
        translationText: "I'm fine too, thanks!",
        translations: {
          "Auch": "also",
          "gut": "good",
          "danke": "thanks",
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      {
        speaker: "Hanz",
        isSpeaker1: true,
        text: "Was machst du heute?",
        translationText: "What are you doing today?",
        translations: {
          "Was": "what",
          "machst": "are doing",
          "du": "you",
          "heute": "today"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      {
        speaker: "Maria",
        isSpeaker1: false,
        text: "Ich lerne Deutsch!",
        translationText: "I am learning German!",
        translations: {
          "Ich": "I",
          "lerne": "am learning",
          "Deutsch": "German"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      {
        speaker: "Hanz",
        isSpeaker1: true,
        text: "Viel Glück!",
        translationText: "Good luck!",
        translations: {
          "Viel": "much",
          "Glück": "luck"
        },
        // New property to map words to flashcards
        vocabularyMap: {
          // Add other mappings as needed
        },
        grammarNotes: {}
      },
      // more dialogue entries...
    ]
  },
  // more lesson entries...
];

/**
 * Helper function to get the flashcard data for a specific word in a dialogue
 * 
 * @param {string} word - The word as it appears in the dialogue
 * @param {object} dialogueEntry - The dialogue entry containing the word
 * @param {string} language - The language code (default: 'german')
 * @returns {object|null} - The corresponding flashcard or null if not found
 */
export function getFlashcardForWord(word, dialogueEntry, language = 'german') {
  // Check if the word has a mapping in this dialogue entry
  if (dialogueEntry.vocabularyMap && dialogueEntry.vocabularyMap[word]) {
    const flashcardId = dialogueEntry.vocabularyMap[word];
    return flashcards[language][flashcardId] || null;
  }
  return null;
}

/**
 * Get vocabulary words with flashcards for a specific lesson
 * 
 * @param {number} lessonId - The ID of the lesson
 * @returns {Array} - Array of vocabulary words with their flashcard data
 */
export function getLessonVocabulary(lessonId) {
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return [];
  
  const vocabulary = [];
  const addedFlashcardIds = new Set(); // To prevent duplicates
  
  lesson.dialogue.forEach(entry => {
    if (!entry.vocabularyMap) return;
    
    Object.entries(entry.vocabularyMap).forEach(([word, flashcardId]) => {
      if (addedFlashcardIds.has(flashcardId)) return; // Skip if already added
      
      const flashcard = flashcards.german[flashcardId];
      if (flashcard) {
        vocabulary.push({
          word,
          textForm: word, // As it appears in the text
          flashcard
        });
        addedFlashcardIds.add(flashcardId);
      }
    });
  });
  
  return vocabulary;
}