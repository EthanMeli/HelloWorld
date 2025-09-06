require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const MediaItem = require('../models/MediaItem');

// Connect to database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/helloworld');

const seedLessons = async () => {
  // French lessons
  const frenchLessons = [
    {
      language: 'fr',
      level: 1,
      title: 'Bonjour et Salutations',
      dialogue: 'Bonjour! Comment allez-vous? Je vais bien, merci. Et vous? Très bien, merci beaucoup!',
      grammarTips: 'Bonjour is used for "hello" in formal situations. Comment allez-vous means "how are you?" and is formal. Je vais bien means "I am well."',
      vocabulary: [
        { word: 'Bonjour', translation: 'Hello', pronunciation: 'bon-ZHOOR' },
        { word: 'Comment', translation: 'How', pronunciation: 'ko-MAHN' },
        { word: 'allez-vous', translation: 'are you going', pronunciation: 'ah-lay VOO' },
        { word: 'bien', translation: 'well', pronunciation: 'byahn' },
        { word: 'merci', translation: 'thank you', pronunciation: 'mer-SEE' }
      ],
      exercises: [
        {
          question: 'How do you say "Hello" in French?',
          options: ['Salut', 'Bonjour', 'Bonsoir', 'Au revoir'],
          correctAnswer: 1,
          explanation: 'Bonjour is the formal way to say hello in French.'
        }
      ]
    },
    {
      language: 'fr',
      level: 2,
      title: 'Les Nombres (Numbers)',
      dialogue: 'Combien coûte ce livre? Il coûte quinze euros. C\'est cher! Non, c\'est bon marché.',
      grammarTips: 'Numbers in French: un (1), deux (2), trois (3), quatre (4), cinq (5). Combien means "how much" or "how many."',
      vocabulary: [
        { word: 'Combien', translation: 'How much/many', pronunciation: 'kom-BYAHN' },
        { word: 'coûte', translation: 'costs', pronunciation: 'koot' },
        { word: 'quinze', translation: 'fifteen', pronunciation: 'kanz' },
        { word: 'euros', translation: 'euros', pronunciation: 'uh-ROH' },
        { word: 'cher', translation: 'expensive', pronunciation: 'shair' }
      ],
      exercises: [
        {
          question: 'What does "quinze" mean?',
          options: ['Five', 'Ten', 'Fifteen', 'Twenty'],
          correctAnswer: 2,
          explanation: 'Quinze means fifteen in French.'
        }
      ]
    },
    {
      language: 'fr',
      level: 3,
      title: 'La Famille (Family)',
      dialogue: 'Voici ma famille. C\'est mon père et ma mère. Et voici mes frères et sœurs.',
      grammarTips: 'Family members: père (father), mère (mother), frère (brother), sœur (sister). Use "mon" for masculine and "ma" for feminine.',
      vocabulary: [
        { word: 'famille', translation: 'family', pronunciation: 'fah-MEE' },
        { word: 'père', translation: 'father', pronunciation: 'pair' },
        { word: 'mère', translation: 'mother', pronunciation: 'mair' },
        { word: 'frère', translation: 'brother', pronunciation: 'frair' },
        { word: 'sœur', translation: 'sister', pronunciation: 'sir' }
      ],
      exercises: [
        {
          question: 'How do you say "father" in French?',
          options: ['Mère', 'Père', 'Frère', 'Sœur'],
          correctAnswer: 1,
          explanation: 'Père means father in French.'
        }
      ]
    }
  ];

  // German lessons
  const germanLessons = [
    {
      language: 'de',
      level: 1,
      title: 'Hallo und Begrüßungen',
      dialogue: 'Hallo! Wie geht es Ihnen? Mir geht es gut, danke. Und Ihnen? Sehr gut, vielen Dank!',
      grammarTips: 'Hallo is the informal way to say hello. Wie geht es Ihnen is the formal way to ask "how are you?" Mir geht es gut means "I am well."',
      vocabulary: [
        { word: 'Hallo', translation: 'Hello', pronunciation: 'HAH-loh' },
        { word: 'Wie', translation: 'How', pronunciation: 'vee' },
        { word: 'geht es', translation: 'is it going', pronunciation: 'gayt es' },
        { word: 'Ihnen', translation: 'to you (formal)', pronunciation: 'EE-nen' },
        { word: 'gut', translation: 'good/well', pronunciation: 'goot' }
      ],
      exercises: [
        {
          question: 'How do you say "Hello" in German?',
          options: ['Guten Tag', 'Hallo', 'Tschüss', 'Auf Wiedersehen'],
          correctAnswer: 1,
          explanation: 'Hallo is the informal way to say hello in German.'
        }
      ]
    },
    {
      language: 'de',
      level: 2,
      title: 'Die Zahlen (Numbers)',
      dialogue: 'Wie viel kostet dieses Buch? Es kostet fünfzehn Euro. Das ist teuer! Nein, das ist günstig.',
      grammarTips: 'Numbers in German: eins (1), zwei (2), drei (3), vier (4), fünf (5). Wie viel means "how much."',
      vocabulary: [
        { word: 'Wie viel', translation: 'How much', pronunciation: 'vee feel' },
        { word: 'kostet', translation: 'costs', pronunciation: 'KOS-tet' },
        { word: 'fünfzehn', translation: 'fifteen', pronunciation: 'FUNF-tsayn' },
        { word: 'Euro', translation: 'euro', pronunciation: 'OY-roh' },
        { word: 'teuer', translation: 'expensive', pronunciation: 'TOY-er' }
      ],
      exercises: [
        {
          question: 'What does "fünfzehn" mean?',
          options: ['Five', 'Ten', 'Fifteen', 'Twenty'],
          correctAnswer: 2,
          explanation: 'Fünfzehn means fifteen in German.'
        }
      ]
    },
    {
      language: 'de',
      level: 3,
      title: 'Die Familie (Family)',
      dialogue: 'Das ist meine Familie. Das ist mein Vater und meine Mutter. Und das sind meine Brüder und Schwestern.',
      grammarTips: 'Family members: Vater (father), Mutter (mother), Bruder (brother), Schwester (sister). Use "mein" for masculine and "meine" for feminine.',
      vocabulary: [
        { word: 'Familie', translation: 'family', pronunciation: 'fah-MEE-lee-uh' },
        { word: 'Vater', translation: 'father', pronunciation: 'FAH-ter' },
        { word: 'Mutter', translation: 'mother', pronunciation: 'MOO-ter' },
        { word: 'Bruder', translation: 'brother', pronunciation: 'BROO-der' },
        { word: 'Schwester', translation: 'sister', pronunciation: 'SHVES-ter' }
      ],
      exercises: [
        {
          question: 'How do you say "father" in German?',
          options: ['Mutter', 'Vater', 'Bruder', 'Schwester'],
          correctAnswer: 1,
          explanation: 'Vater means father in German.'
        }
      ]
    }
  ];

  // Add more lessons to reach 10 per language
  for (let i = 4; i <= 10; i++) {
    frenchLessons.push({
      language: 'fr',
      level: i,
      title: `Leçon ${i} - Sujet Avancé`,
      dialogue: `Dialogue pour la leçon ${i}. Ceci est un exemple de dialogue en français.`,
      grammarTips: `Conseils de grammaire pour la leçon ${i}.`,
      vocabulary: [
        { word: 'mot1', translation: 'word1', pronunciation: 'pronunciation1' },
        { word: 'mot2', translation: 'word2', pronunciation: 'pronunciation2' }
      ],
      exercises: [
        {
          question: `Question pour la leçon ${i}?`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 0,
          explanation: `Explication pour la leçon ${i}.`
        }
      ]
    });

    germanLessons.push({
      language: 'de',
      level: i,
      title: `Lektion ${i} - Fortgeschrittenes Thema`,
      dialogue: `Dialog für Lektion ${i}. Dies ist ein Beispiel für einen deutschen Dialog.`,
      grammarTips: `Grammatiktipps für Lektion ${i}.`,
      vocabulary: [
        { word: 'wort1', translation: 'word1', pronunciation: 'pronunciation1' },
        { word: 'wort2', translation: 'word2', pronunciation: 'pronunciation2' }
      ],
      exercises: [
        {
          question: `Frage für Lektion ${i}?`,
          options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
          correctAnswer: 0,
          explanation: `Erklärung für Lektion ${i}.`
        }
      ]
    });
  }

  await Lesson.insertMany([...frenchLessons, ...germanLessons]);
  console.log('Lessons seeded successfully!');
};

const seedMedia = async () => {
  const mediaItems = [
    // French podcasts
    {
      language: 'fr',
      category: 'podcast',
      title: 'News in Slow French',
      description: 'French news spoken slowly for learners',
      sourceUrl: 'https://example.com/podcast1',
      transcriptOrLyrics: 'Transcript of the podcast episode...',
      duration: 15,
      difficulty: 'beginner',
      tags: ['news', 'slow', 'beginner']
    },
    {
      language: 'fr',
      category: 'podcast',
      title: 'Coffee Break French',
      description: 'Learn French with coffee break conversations',
      sourceUrl: 'https://example.com/podcast2',
      transcriptOrLyrics: 'Transcript of the coffee break episode...',
      duration: 20,
      difficulty: 'intermediate',
      tags: ['conversation', 'coffee', 'intermediate']
    },
    // French literature
    {
      language: 'fr',
      category: 'literature',
      title: 'Le Petit Prince - Chapitre 1',
      description: 'First chapter of The Little Prince in French',
      sourceUrl: 'https://example.com/literature1',
      transcriptOrLyrics: 'Il était une fois un petit prince...',
      duration: 10,
      difficulty: 'intermediate',
      tags: ['classic', 'children', 'philosophy']
    },
    // French songs
    {
      language: 'fr',
      category: 'song',
      title: 'La Vie en Rose',
      description: 'Classic French song by Édith Piaf',
      sourceUrl: 'https://example.com/song1',
      transcriptOrLyrics: 'Des yeux qui font baiser les miens...',
      duration: 3,
      difficulty: 'intermediate',
      tags: ['classic', 'romance', 'piaf']
    },
    // French videos
    {
      language: 'fr',
      category: 'video',
      title: 'French Cooking Basics',
      description: 'Learn French while cooking traditional dishes',
      sourceUrl: 'https://example.com/video1',
      transcriptOrLyrics: 'Aujourd\'hui, nous allons préparer...',
      duration: 25,
      difficulty: 'beginner',
      tags: ['cooking', 'culture', 'beginner']
    },
    // German podcasts
    {
      language: 'de',
      category: 'podcast',
      title: 'Slow German',
      description: 'German stories spoken slowly for learners',
      sourceUrl: 'https://example.com/podcast3',
      transcriptOrLyrics: 'Transcript of the German story...',
      duration: 12,
      difficulty: 'beginner',
      tags: ['stories', 'slow', 'beginner']
    },
    {
      language: 'de',
      category: 'podcast',
      title: 'Deutschlandfunk',
      description: 'German news and current events',
      sourceUrl: 'https://example.com/podcast4',
      transcriptOrLyrics: 'Transcript of the news episode...',
      duration: 30,
      difficulty: 'advanced',
      tags: ['news', 'current events', 'advanced']
    },
    // German literature
    {
      language: 'de',
      category: 'literature',
      title: 'Der Struwwelpeter',
      description: 'Classic German children\'s book',
      sourceUrl: 'https://example.com/literature2',
      transcriptOrLyrics: 'Es war einmal ein kleiner Junge...',
      duration: 8,
      difficulty: 'beginner',
      tags: ['children', 'classic', 'rhymes']
    },
    // German songs
    {
      language: 'de',
      category: 'song',
      title: '99 Luftballons',
      description: 'Popular German song by Nena',
      sourceUrl: 'https://example.com/song2',
      transcriptOrLyrics: 'Hast du etwas Zeit für mich...',
      duration: 4,
      difficulty: 'intermediate',
      tags: ['pop', '80s', 'nena']
    },
    // German videos
    {
      language: 'de',
      category: 'video',
      title: 'German Grammar Explained',
      description: 'Visual explanation of German grammar rules',
      sourceUrl: 'https://example.com/video2',
      transcriptOrLyrics: 'Heute erklären wir die deutschen Artikel...',
      duration: 18,
      difficulty: 'intermediate',
      tags: ['grammar', 'education', 'visual']
    }
  ];

  await MediaItem.insertMany(mediaItems);
  console.log('Media items seeded successfully!');
};

const seedDatabase = async () => {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data
    await Lesson.deleteMany({});
    await MediaItem.deleteMany({});
    console.log('Cleared existing data');
    
    // Seed new data
    await seedLessons();
    await seedMedia();
    
    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
