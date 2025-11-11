import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { JSX, useState, useEffect, useCallback } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { lessons } from '../../../data/lessons.js'
import styles from '../../../assets/styles/lesson.styles';
import { useAuthStore } from '../../../store/authStore';
import { API_URL } from '../../../constants/api';
import COLORS from '../../../constants/colors';
// @ts-ignore - JSX file without types
import TappableText from '../../../components/lessons/TappableText';
// @ts-ignore - JSX file without types
import GrammarTipButton from '../../../components/lessons/GrammarTipButton';
// @ts-ignore - JSX file without types
import GrammarModal from '../../../components/lessons/GrammarModal';
// @ts-ignore - JSX file without types
import DiceBearAvatar from '../../../components/lessons/DiceBearAvatar';
// @ts-ignore - JSX file without types
import RPGDialogue from '../../../components/lessons/RPGDialogue';
// @ts-ignore - JSX files without types
import ExerciseTranslation from '../../../components/lessons/ExerciseTranslation';
// @ts-ignore - JSX files without types
import ExerciseFillBlank from '../../../components/lessons/ExerciseFillBlank';
// @ts-ignore - JSX files without types
import ExerciseSpeakingPlaceholder from '../../../components/lessons/ExerciseSpeakingPlaceholder';

// Define interfaces for better type safety
interface GrammarTip {
  id: number;
  title: string;
  content: string;
}

const LessonDetail = () => {
  // State for managing the grammar modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTips, setCurrentTips] = useState<GrammarTip[]>([]);
  const [currentTipSource, setCurrentTipSource] = useState<string>('');
  const [completedTipSources, setCompletedTipSources] = useState<string[]>([]);
  
  // State for RPG dialogue progression
  const [showRPGDialogue, setShowRPGDialogue] = useState(true);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showExercises, setShowExercises] = useState(false);
  const [exerciseStep, setExerciseStep] = useState(0); // 0: translation, 1: fill blank, 2: speaking
  
  // State for lesson completion
  const [lessonStatus, setLessonStatus] = useState({ isCompleted: false, progress: null });
  const [isLoading, setIsLoading] = useState(false);
  
  // Get the id parameter from the route
  const { id } = useLocalSearchParams();
  const { token } = useAuthStore();

  // Convert id to number and find the matching lesson
  const lessonId = parseInt(id as string);
  const lesson = lessons.find(lesson => lesson.id === lessonId);

  const checkLessonStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/progress/lesson/${lessonId}/status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const status = await response.json();
        setLessonStatus(status);
      }
    } catch (error) {
      console.error('Error checking lesson status:', error);
    }
  }, [lessonId, token]);

  // Check lesson status on component mount
  useEffect(() => {
    if (lessonId && token) {
      checkLessonStatus();
    }
  }, [lessonId, token, checkLessonStatus]);

  // Handle case where lessons is not found
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.lessonTitle}>Lesson not found</Text>
      </View>
    );
  }

  const completeLesson = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/progress/lesson/${lessonId}/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ timeSpent: 60 }) // Default 1 minute for now
      });

      if (response.ok) {
        const result = await response.json();
        setLessonStatus({ isCompleted: true, progress: result.progress });
        Alert.alert(
          'Lesson Complete! 🎉', 
          `Great job! Your streak is now ${result.progress.streakCount} days.`,
          [{ text: 'Awesome!', style: 'default' }]
        );
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to complete lesson');
      }
    } catch (error) {
      console.error('Error completing lesson:', error);
      Alert.alert('Error', 'Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle RPG dialogue completion
  const handleRPGDialogueComplete = () => {
    if (currentDialogueIndex < lesson.dialogue.length - 1) {
      // Move to next dialogue
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else {
      // All dialogues complete, switch to chat interface
      setShowRPGDialogue(false);
    }
  };

  // Handle displaying multiple dialogues and speakers
  const renderDialogueBox = (dialogue: any, index: number): JSX.Element => {
    const isLeftSide = dialogue.isSpeaker1;
    const hasTips = dialogue.grammarTips && dialogue.grammarTips.length > 0;

    // Create a unique source ID for this dialogue
    const dialogueSourceId = `dialogue-${index}`;
    
    // Handle opening grammar tips modal
    const handleGrammarTipPress = () => {
      setCurrentTips(dialogue.grammarTips);
      setCurrentTipSource(dialogueSourceId);
      setModalVisible(true);
    };
    
    // Check if this specific dialogue's tips have been completed
    const isTipCompleted = completedTipSources.includes(dialogueSourceId);

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isLeftSide ? styles.leftMessage : styles.rightMessage
        ]}
      >
        <View style={[
          customStyles.speakerContainer,
          isLeftSide ? customStyles.speakerContainerLeft : customStyles.speakerContainerRight
        ]}>
          {isLeftSide ? (
            <>
              <DiceBearAvatar 
                seed="Ryan"
                flip={false}
                size={30}
                style={{marginRight: 8}}
                debug={false}
              />
              <Text style={styles.speakerName}>{dialogue.speaker}</Text>
            </>
          ) : (
            <>
              <Text style={styles.speakerName}>{dialogue.speaker}</Text>
              <DiceBearAvatar 
                seed="Christian"
                flip={true}
                size={30}
                style={{marginLeft: 8}}
                debug={false}
              />
            </>
          )}
        </View>
        <View style={[
          styles.messageBubble,
          isLeftSide ? styles.leftBubble : styles.rightBubble
        ]}>
          <TappableText 
            text={dialogue.text}
            translations={dialogue.translations}
            vocabularyMap={dialogue.vocabularyMap}
            dialogueEntry={dialogue}
            isLeftSide={isLeftSide}
            textStyle={styles.messageText}
          />
          <Text style={isLeftSide ? styles.leftTranslationText : styles.rightTranslationText}>
            {dialogue.translationText}
          </Text>
          
          {/* Grammar Tip Button */}
          {hasTips && !isTipCompleted && (
            <GrammarTipButton
              onPress={handleGrammarTipPress}
              count={dialogue.grammarTips.length}
              style={isLeftSide ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }}
            />
          )}
        </View>
      </View>
    )
  }

  // Create a unique source ID for the lesson title
  const lessonTitleSourceId = `lesson-title-${lessonId}`;

  // Handle opening lesson title grammar tips
  const handleLessonTipPress = () => {
    if (lesson.grammarTips && lesson.grammarTips.length > 0) {
      setCurrentTips(lesson.grammarTips);
      setCurrentTipSource(lessonTitleSourceId);
      setModalVisible(true);
    }
  };
  
  // Handle completed tips - now just stores the source ID
  const handleTipsComplete = () => {
    // Only add the current tip source to completed sources
    if (currentTipSource) {
      setCompletedTipSources(prev => [...prev, currentTipSource]);
    }
  };
  
  // Check if lesson title tips are completed
  const isLessonTipCompleted = completedTipSources.includes(lessonTitleSourceId);

  // Aggregate all tip sources for this lesson (title + dialogues with tips)
  const allTipSourceIds: string[] = [
    ...(lesson.grammarTips && lesson.grammarTips.length > 0 ? [lessonTitleSourceId] : []),
    ...lesson.dialogue
      .map((d, idx) => (d.grammarTips && d.grammarTips.length > 0 ? `dialogue-${idx}` : null))
      .filter(Boolean) as string[]
  ];
  const areAllTipsCompleted = allTipSourceIds.every(id => completedTipSources.includes(id));

  // Prepare exercise data from this lesson
  const dialogueSentences = lesson.dialogue
    .filter(d => d.text && d.translationText)
    .slice(0, 3);
  const translationItems = dialogueSentences.map(d => ({
    german: d.text,
    english: d.translationText
  }));
  const fillBlankSentences = dialogueSentences.map(d => d.text);
  // TypeScript interop for JSX components without TS types
  const translationItemsAny: any = translationItems;
  const fillBlankSentencesAny: any = fillBlankSentences;

  return (
    <View style={styles.container}>
      {showRPGDialogue ? (
        <RPGDialogue 
          dialogue={lesson.dialogue[currentDialogueIndex]}
          onDialogueComplete={handleRPGDialogueComplete}
          currentDialogueIndex={currentDialogueIndex}
          isActive={true}
        />
      ) : showExercises ? (
        <>
          {exerciseStep === 0 && (
            <ExerciseTranslation
              items={translationItemsAny}
              onComplete={() => setExerciseStep(1)}
            />
          )}
          {exerciseStep === 1 && (
            <ExerciseFillBlank
              sentences={fillBlankSentencesAny}
              onComplete={() => setExerciseStep(2)}
            />
          )}
          {exerciseStep === 2 && (
            <ExerciseSpeakingPlaceholder
              onComplete={() => {
                setShowExercises(false);
                setExerciseStep(0);
              }}
            />
          )}
          <View style={customStyles.completionContainer}>
            <TouchableOpacity 
              style={[customStyles.completeButton]}
              onPress={() => {
                setShowExercises(false);
                setExerciseStep(0);
              }}
            >
              <MaterialIcons name="arrow-back" size={20} color={COLORS.background} />
              <Text style={customStyles.completeButtonText}>Back to Lesson</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <View style={customStyles.titleContainer}>
            <Text style={styles.lessonTitle}>{lesson.title}</Text>
            
            {/* Grammar Tip Button for lesson title */}
            {lesson.grammarTips && lesson.grammarTips.length > 0 && !isLessonTipCompleted && (
              <GrammarTipButton
                onPress={handleLessonTipPress}
                count={lesson.grammarTips.length}
                style={{ marginLeft: 15, marginBottom: 15 }}
              />
            )}
          </View>
          
          <ScrollView style={styles.chatContainer}>
            {lesson.dialogue.map((dialogue, index) =>
              renderDialogueBox(dialogue, index)
            )}
          </ScrollView>
          
          {/* Lesson Completion Button */}
          <View style={customStyles.completionContainer}>
            {/* Exercises Button */}
            <TouchableOpacity 
              style={[customStyles.exerciseButton, !areAllTipsCompleted && customStyles.disabledButton]}
              onPress={() => setShowExercises(true)}
              disabled={!areAllTipsCompleted}
            >
              <MaterialIcons 
                name="sports-esports" 
                size={20} 
                color={COLORS.background} 
              />
              <Text style={customStyles.completeButtonText}>
                {areAllTipsCompleted ? 'Exercises' : 'Exercises (Complete grammar tips to unlock)'}
              </Text>
            </TouchableOpacity>

            {lessonStatus.isCompleted ? (
              <View style={customStyles.completedBadge}>
                <MaterialIcons name="check-circle" size={24} color={COLORS.accent} />
                <Text style={customStyles.completedText}>Lesson Completed! ✨</Text>
                <TouchableOpacity 
                  style={customStyles.redoButton} 
                  onPress={() => setShowRPGDialogue(true)}
                >
                  <Text style={customStyles.redoButtonText}>Redo Lesson</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity 
                style={[customStyles.completeButton, isLoading && customStyles.disabledButton]} 
                onPress={completeLesson}
                disabled={isLoading}
              >
                <MaterialIcons 
                  name={isLoading ? "hourglass-empty" : "check-circle-outline"} 
                  size={20} 
                  color={COLORS.background} 
                />
                <Text style={customStyles.completeButtonText}>
                  {isLoading ? 'Completing...' : 'Complete Lesson'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
      
      {/* Grammar Tips Modal */}
      <GrammarModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        tips={currentTips}
        onComplete={handleTipsComplete}
      />
    </View>
  )
}

// Custom styles for this component
const customStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Changed to center
    marginBottom: 15,
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  speakerContainerLeft: {
    justifyContent: 'flex-start',
  },
  speakerContainerRight: {
    justifyContent: 'flex-end',
  },
  completionContainer: {
    padding: 16,
    borderTopWidth: 2,
    borderTopColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
  },
  completedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
  },
  completedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginLeft: 8,
    marginRight: 16,
    fontFamily: 'serif',
  },
  redoButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  redoButtonText: {
    color: COLORS.accent,
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  completeButton: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  exerciseButton: {
    backgroundColor: COLORS.accent,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    marginBottom: 10,
  },
  completeButtonText: {
    color: COLORS.background,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  disabledButton: {
    opacity: 0.6,
    backgroundColor: COLORS.textSecondary,
  },
});

export default LessonDetail;