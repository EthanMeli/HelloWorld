/**
 * Flashcards Database
 * 
 * This file contains all vocabulary flashcards used throughout the app.
 * Cards are organized by language and categorized for easy lookup.
 * 
 * Each flashcard has a unique ID and contains comprehensive grammatical information.
 */

// Word types enumeration for consistent categorization
export const WordType = {
  NOUN: 'noun',
  VERB: 'verb',
  ADJECTIVE: 'adjective',
  ADVERB: 'adverb',
  PRONOUN: 'pronoun',
  PREPOSITION: 'preposition',
  CONJUNCTION: 'conjunction',
  INTERJECTION: 'interjection',
  ARTICLE: 'article',
  NUMERAL: 'numeral',
};

// Gender enumeration for German nouns
export const Gender = {
  MASCULINE: 'masculine', // der
  FEMININE: 'feminine',   // die
  NEUTER: 'neuter',       // das
  PLURAL: 'plural'        // die (plural)
};

/**
 * Main flashcards database
 * Structure allows for efficient lookups while maintaining comprehensive data
 * 
 * Cards are organized by:
 * - language (German, English, etc.)
 * - ID (unique identifier for each card)
 * 
 * Each card contains:
 * - baseForm: The dictionary/base form of the word
 * - wordType: The grammatical type (noun, verb, etc.)
 * - translations: Translations to other languages
 * - grammaticalInfo: Language-specific grammatical details
 * - examples: Example usage sentences
 * - related: Related words, synonyms, etc.
 */
export const flashcards = {
  german: {
    // Nouns
    "der_tag": {
      id: "der_tag",
      baseForm: "Tag",
      wordType: WordType.NOUN,
      translations: {
        english: "day",
      },
      grammaticalInfo: {
        gender: Gender.MASCULINE,
        article: "der",
        plural: "Tage",
      },
      examples: [
        {
          sentence: "Heute ist ein schöner Tag.",
          translation: "Today is a beautiful day.",
          highlightIndices: [4, 4] // Highlight the word "Tag" (0-based index)
        },
        {
          sentence: "Ich wünsche dir einen guten Tag.",
          translation: "I wish you a good day.",
          highlightIndices: [4, 4]
        }
      ]
    },
    
    // Verbs
    "gehen": {
      id: "gehen",
      baseForm: "gehen",
      wordType: WordType.VERB,
      translations: {
        english: "to go",
      },
      grammaticalInfo: {
        conjugation: {
          present: {
            ich: "gehe",
            du: "gehst",
            er_sie_es: "geht",
            wir: "gehen",
            ihr: "geht",
            sie_Sie: "gehen"
          },
          past: {
            ich: "ging",
            du: "gingst",
            er_sie_es: "ging",
            wir: "gingen",
            ihr: "gingt",
            sie_Sie: "gingen"
          },
          perfect: "gegangen"
        },
        auxiliaryVerb: "sein"
      },
      examples: [
        {
          sentence: "Ich gehe zum Supermarkt.",
          translation: "I am going to the supermarket.",
          highlightIndices: [1, 1]
        },
        {
          sentence: "Wohin gehst du?",
          translation: "Where are you going?",
          highlightIndices: [1, 1]
        }
      ]
    },
    
    // Adjectives
    "gut": {
      id: "gut",
      baseForm: "gut",
      wordType: WordType.ADJECTIVE,
      translations: {
        english: "good",
      },
      grammaticalInfo: {
        comparative: "besser",
        superlative: "am besten",
        declension: {
          // Declension patterns could be included here
        }
      },
      examples: [
        {
          sentence: "Das Essen schmeckt gut.",
          translation: "The food tastes good.",
          highlightIndices: [3, 3]
        },
        {
          sentence: "Er ist ein guter Freund.",
          translation: "He is a good friend.",
          highlightIndices: [3, 3]
        }
      ]
    },
    
    // Add more vocabulary entries here...
  },
  
  // Structure ready for expansion to other languages
  english: {
    // English flashcards would go here in the same structure
  }
};

/**
 * Helper function to get the appropriate article for a German noun
 * @param {string} gender - The gender from the Gender enum
 * @returns {string} - The correct definite article
 */
export function getArticle(gender) {
  switch (gender) {
    case Gender.MASCULINE: return "der";
    case Gender.FEMININE: return "die";
    case Gender.NEUTER: return "das";
    case Gender.PLURAL: return "die";
    default: return "";
  }
}

/**
 * Helper function to get the abbreviation for a word type
 * @param {string} wordType - The word type from the WordType enum
 * @returns {string} - The abbreviation (n., v., adj., etc.)
 */
export function getWordTypeAbbreviation(wordType) {
  switch (wordType) {
    case WordType.NOUN: return "n.";
    case WordType.VERB: return "v.";
    case WordType.ADJECTIVE: return "adj.";
    case WordType.ADVERB: return "adv.";
    case WordType.PRONOUN: return "pron.";
    case WordType.PREPOSITION: return "prep.";
    case WordType.CONJUNCTION: return "conj.";
    case WordType.INTERJECTION: return "interj.";
    case WordType.ARTICLE: return "art.";
    case WordType.NUMERAL: return "num.";
    default: return "";
  }
}