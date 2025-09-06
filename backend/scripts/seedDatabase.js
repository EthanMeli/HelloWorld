const { sequelize, Lesson, MediaItem } = require('../models');

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create tables
    await sequelize.sync({ force: true });
    console.log('Database tables created.');

    // Seed French lessons
    const frenchLessons = [
      {
        language: 'fr',
        level: 1,
        title: 'Greetings and Introductions',
        dialogue: `Marie: Bonjour! Je m'appelle Marie. Comment vous appelez-vous?
Jean: Bonjour Marie! Je suis Jean. Enchanté!
Marie: Enchanté également. D'où venez-vous?
Jean: Je viens de Paris. Et vous?
Marie: Moi, je suis de Lyon.`,
        grammarTips: `- "Je m'appelle" means "My name is"
- "Comment vous appelez-vous?" means "What is your name?" (formal)
- "D'où venez-vous?" means "Where do you come from?"
- Use "Enchanté" (masculine) or "Enchantée" (feminine) to say "Nice to meet you"`,
        vocabulary: [
          { word: 'Bonjour', translation: 'Hello/Good morning', pronunciation: 'bon-ZHOOR' },
          { word: 'Je m\'appelle', translation: 'My name is', pronunciation: 'zhuh mah-PELL' },
          { word: 'Comment', translation: 'How', pronunciation: 'koh-MAHN' },
          { word: 'Enchanté', translation: 'Nice to meet you', pronunciation: 'ahn-shahn-TAY' }
        ]
      },
      {
        language: 'fr',
        level: 2,
        title: 'At the Café',
        dialogue: `Serveur: Bonjour! Qu'est-ce que vous désirez?
Client: Bonjour. Je voudrais un café, s'il vous plaît.
Serveur: Avec du sucre?
Client: Non, sans sucre. Et l'addition, s'il vous plaît.
Serveur: Voici votre café. L'addition fait 3 euros.`,
        grammarTips: `- "Je voudrais" means "I would like" (polite form)
- "S'il vous plaît" means "please" (formal)
- "Avec/sans" means "with/without"
- Use "l'addition" for "the bill"`,
        vocabulary: [
          { word: 'Café', translation: 'Coffee', pronunciation: 'kah-FAY' },
          { word: 'Je voudrais', translation: 'I would like', pronunciation: 'zhuh voo-DRAY' },
          { word: 'Sucre', translation: 'Sugar', pronunciation: 'SOO-kruh' },
          { word: 'Addition', translation: 'Bill', pronunciation: 'ah-dee-see-OHN' }
        ]
      },
      {
        language: 'fr',
        level: 3,
        title: 'Shopping for Clothes',
        dialogue: `Vendeur: Bonjour! Je peux vous aider?
Cliente: Oui, je cherche une robe bleue.
Vendeur: Quelle taille faites-vous?
Cliente: Je fais du 38. Combien coûte cette robe?
Vendeur: Elle coûte 50 euros. Voulez-vous l'essayer?`,
        grammarTips: `- "Je cherche" means "I'm looking for"
- "Quelle taille" means "What size"
- "Combien coûte" means "How much does it cost"
- "Voulez-vous" means "Do you want" (formal)`,
        vocabulary: [
          { word: 'Robe', translation: 'Dress', pronunciation: 'rohb' },
          { word: 'Bleue', translation: 'Blue (feminine)', pronunciation: 'bluh' },
          { word: 'Taille', translation: 'Size', pronunciation: 'tahy' },
          { word: 'Coûte', translation: 'Costs', pronunciation: 'koot' }
        ]
      }
    ];

    // Seed German lessons
    const germanLessons = [
      {
        language: 'de',
        level: 1,
        title: 'Greetings and Introductions',
        dialogue: `Anna: Guten Tag! Ich heiße Anna. Wie heißen Sie?
Max: Guten Tag Anna! Ich bin Max. Freut mich!
Anna: Freut mich auch. Woher kommen Sie?
Max: Ich komme aus Berlin. Und Sie?
Anna: Ich bin aus München.`,
        grammarTips: `- "Ich heiße" means "My name is"
- "Wie heißen Sie?" means "What is your name?" (formal)
- "Woher kommen Sie?" means "Where do you come from?"
- "Freut mich" means "Nice to meet you"`,
        vocabulary: [
          { word: 'Guten Tag', translation: 'Good day/Hello', pronunciation: 'GOO-ten tahk' },
          { word: 'Ich heiße', translation: 'My name is', pronunciation: 'ikh HIGH-seh' },
          { word: 'Wie', translation: 'How', pronunciation: 'vee' },
          { word: 'Freut mich', translation: 'Nice to meet you', pronunciation: 'froyt mikh' }
        ]
      },
      {
        language: 'de',
        level: 2,
        title: 'At the Restaurant',
        dialogue: `Kellner: Guten Abend! Was möchten Sie trinken?
Gast: Guten Abend. Ich hätte gern ein Bier, bitte.
Kellner: Ein großes oder kleines Bier?
Gast: Ein großes, bitte. Und die Rechnung, bitte.
Kellner: Hier ist Ihr Bier. Das macht 4 Euro.`,
        grammarTips: `- "Ich hätte gern" means "I would like" (polite)
- "Bitte" means "please"
- "Groß/klein" means "big/small"
- "Die Rechnung" means "the bill"`,
        vocabulary: [
          { word: 'Bier', translation: 'Beer', pronunciation: 'beer' },
          { word: 'Ich hätte gern', translation: 'I would like', pronunciation: 'ikh HET-teh gehrn' },
          { word: 'Groß', translation: 'Big', pronunciation: 'grohs' },
          { word: 'Rechnung', translation: 'Bill', pronunciation: 'REKH-noong' }
        ]
      },
      {
        language: 'de',
        level: 3,
        title: 'Asking for Directions',
        dialogue: `Tourist: Entschuldigung, wo ist der Bahnhof?
Einheimischer: Der Bahnhof ist geradeaus, dann links.
Tourist: Wie weit ist das?
Einheimischer: Etwa zehn Minuten zu Fuß.
Tourist: Vielen Dank für Ihre Hilfe!`,
        grammarTips: `- "Entschuldigung" means "Excuse me"
- "Wo ist" means "Where is"
- "Geradeaus" means "straight ahead"
- "Zu Fuß" means "on foot"`,
        vocabulary: [
          { word: 'Entschuldigung', translation: 'Excuse me', pronunciation: 'ent-SHOOL-dee-goong' },
          { word: 'Bahnhof', translation: 'Train station', pronunciation: 'BAHN-hohf' },
          { word: 'Geradeaus', translation: 'Straight ahead', pronunciation: 'geh-RAH-deh-ows' },
          { word: 'Minuten', translation: 'Minutes', pronunciation: 'mee-NOO-ten' }
        ]
      }
    ];

    // Insert lessons
    await Lesson.bulkCreate([...frenchLessons, ...germanLessons]);
    console.log('Sample lessons created.');

    // Seed French media items
    const frenchMedia = [
      // Podcasts
      {
        language: 'fr',
        category: 'podcast',
        title: 'Coffee Break French',
        description: 'Short French lessons perfect for your daily commute',
        sourceUrl: 'https://example.com/coffee-break-french',
        duration: 900,
        difficulty: 2,
        thumbnailUrl: 'https://example.com/thumbnails/coffee-break-french.jpg'
      },
      {
        language: 'fr',
        category: 'podcast',
        title: 'News in Slow French',
        description: 'Current events delivered at a slower pace for learners',
        sourceUrl: 'https://example.com/news-slow-french',
        duration: 1200,
        difficulty: 3,
        thumbnailUrl: 'https://example.com/thumbnails/news-slow-french.jpg'
      },
      // Literature
      {
        language: 'fr',
        category: 'literature',
        title: 'Le Petit Prince - Chapter 1',
        description: 'The beloved classic by Antoine de Saint-Exupéry',
        transcriptOrLyrics: 'Lorsque j\'avais six ans j\'ai vu, une fois, une magnifique image...',
        difficulty: 2,
        thumbnailUrl: 'https://example.com/thumbnails/petit-prince.jpg'
      },
      // Songs
      {
        language: 'fr',
        category: 'song',
        title: 'La Vie En Rose',
        description: 'Classic French song by Édith Piaf',
        sourceUrl: 'https://example.com/la-vie-en-rose',
        transcriptOrLyrics: 'Des yeux qui font baisser les miens, Un rire qui se perd sur sa bouche...',
        duration: 180,
        difficulty: 3,
        thumbnailUrl: 'https://example.com/thumbnails/la-vie-en-rose.jpg'
      },
      // Videos
      {
        language: 'fr',
        category: 'video',
        title: 'French Pronunciation Guide',
        description: 'Learn proper French pronunciation with native speakers',
        sourceUrl: 'https://example.com/french-pronunciation',
        duration: 600,
        difficulty: 1,
        thumbnailUrl: 'https://example.com/thumbnails/french-pronunciation.jpg'
      }
    ];

    // Seed German media items
    const germanMedia = [
      // Podcasts
      {
        language: 'de',
        category: 'podcast',
        title: 'Deutsch Pod 101',
        description: 'Comprehensive German lessons for all levels',
        sourceUrl: 'https://example.com/deutsch-pod-101',
        duration: 1800,
        difficulty: 2,
        thumbnailUrl: 'https://example.com/thumbnails/deutsch-pod-101.jpg'
      },
      {
        language: 'de',
        category: 'podcast',
        title: 'Slow German',
        description: 'German culture and language at a comfortable pace',
        sourceUrl: 'https://example.com/slow-german',
        duration: 900,
        difficulty: 3,
        thumbnailUrl: 'https://example.com/thumbnails/slow-german.jpg'
      },
      // Literature
      {
        language: 'de',
        category: 'literature',
        title: 'Die Verwandlung - Franz Kafka',
        description: 'Opening chapter of Kafka\'s famous novella',
        transcriptOrLyrics: 'Als Gregor Samsa eines Morgens aus unruhigen Träumen erwachte...',
        difficulty: 4,
        thumbnailUrl: 'https://example.com/thumbnails/verwandlung.jpg'
      },
      // Songs
      {
        language: 'de',
        category: 'song',
        title: '99 Luftballons',
        description: 'Popular German song by Nena',
        sourceUrl: 'https://example.com/99-luftballons',
        transcriptOrLyrics: 'Hast du etwas Zeit für mich, dann singe ich ein Lied für dich...',
        duration: 225,
        difficulty: 2,
        thumbnailUrl: 'https://example.com/thumbnails/99-luftballons.jpg'
      },
      // Videos
      {
        language: 'de',
        category: 'video',
        title: 'German Grammar Basics',
        description: 'Essential German grammar concepts explained simply',
        sourceUrl: 'https://example.com/german-grammar-basics',
        duration: 720,
        difficulty: 2,
        thumbnailUrl: 'https://example.com/thumbnails/german-grammar.jpg'
      }
    ];

    // Insert media items
    await MediaItem.bulkCreate([...frenchMedia, ...germanMedia]);
    console.log('Sample media items created.');

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await sequelize.close();
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = seedDatabase;
