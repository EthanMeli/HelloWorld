import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Divider, RadioButton } from 'react-native-paper';
import { api } from '../../services/api';

const LessonDetailScreen = ({ route, navigation }) => {
  const { lesson } = route.params;
  const [currentLesson, setCurrentLesson] = useState(lesson);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    loadLessonDetails();
  }, []);

  const loadLessonDetails = async () => {
    try {
      const response = await api.get(`/lessons/${lesson._id}`);
      setCurrentLesson(response.data);
    } catch (error) {
      console.error('Error loading lesson details:', error);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowAnswer(true);
  };

  const handleNextExercise = () => {
    if (currentExerciseIndex < currentLesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      // Lesson completed
      setCompleted(true);
      saveProgress();
    }
  };

  const saveProgress = async () => {
    try {
      await api.post(`/lessons/${lesson._id}/progress`, {
        completed: true,
        score: 100, // Simplified scoring
        timeSpent: 10 // Estimated time in minutes
      });
      Alert.alert('Congratulations!', 'Lesson completed successfully!');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const currentExercise = currentLesson.exercises?.[currentExerciseIndex];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.lessonCard}>
          <Card.Content>
            <Title style={styles.lessonTitle}>
              {getLanguageFlag(currentLesson.language)} Lesson {currentLesson.level}
            </Title>
            <Paragraph style={styles.lessonSubtitle}>
              {currentLesson.title}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.dialogueCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Dialogue</Title>
            <Paragraph style={styles.dialogueText}>
              {currentLesson.dialogue}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.grammarCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Grammar Tips</Title>
            <Paragraph style={styles.grammarText}>
              {currentLesson.grammarTips}
            </Paragraph>
          </Card.Content>
        </Card>

        {currentLesson.vocabulary && currentLesson.vocabulary.length > 0 && (
          <Card style={styles.vocabularyCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Vocabulary</Title>
              {currentLesson.vocabulary.map((word, index) => (
                <View key={index} style={styles.vocabularyItem}>
                  <Text style={styles.vocabularyWord}>{word.word}</Text>
                  <Text style={styles.vocabularyTranslation}>{word.translation}</Text>
                  <Text style={styles.vocabularyPronunciation}>({word.pronunciation})</Text>
                </View>
              ))}
            </Card.Content>
          </Card>
        )}

        {currentExercise && !completed && (
          <Card style={styles.exerciseCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>
                Exercise {currentExerciseIndex + 1} of {currentLesson.exercises.length}
              </Title>
              <Paragraph style={styles.exerciseQuestion}>
                {currentExercise.question}
              </Paragraph>

              <View style={styles.optionsContainer}>
                {currentExercise.options.map((option, index) => (
                  <View key={index} style={styles.optionItem}>
                    <RadioButton
                      value={index}
                      status={selectedAnswer === index ? 'checked' : 'unchecked'}
                      onPress={() => handleAnswerSelect(index)}
                      disabled={showAnswer}
                    />
                    <Text 
                      style={[
                        styles.optionText,
                        showAnswer && index === currentExercise.correctAnswer && styles.correctAnswer,
                        showAnswer && selectedAnswer === index && index !== currentExercise.correctAnswer && styles.wrongAnswer
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                ))}
              </View>

              {showAnswer && (
                <View style={styles.answerSection}>
                  <Divider style={styles.divider} />
                  <Text style={styles.explanation}>
                    {currentExercise.explanation}
                  </Text>
                  <Button
                    mode="contained"
                    onPress={handleNextExercise}
                    style={styles.nextButton}
                  >
                    {currentExerciseIndex < currentLesson.exercises.length - 1 ? 'Next Exercise' : 'Complete Lesson'}
                  </Button>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        {completed && (
          <Card style={styles.completionCard}>
            <Card.Content>
              <Title style={styles.completionTitle}>🎉 Lesson Completed!</Title>
              <Paragraph style={styles.completionText}>
                Great job! You've completed this lesson. Keep up the good work!
              </Paragraph>
              <Button
                mode="contained"
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                Back to Lessons
              </Button>
            </Card.Content>
          </Card>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 16,
  },
  lessonCard: {
    marginBottom: 16,
    elevation: 2,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  lessonSubtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 8,
  },
  dialogueCard: {
    marginBottom: 16,
    elevation: 2,
  },
  grammarCard: {
    marginBottom: 16,
    elevation: 2,
  },
  vocabularyCard: {
    marginBottom: 16,
    elevation: 2,
  },
  exerciseCard: {
    marginBottom: 16,
    elevation: 2,
  },
  completionCard: {
    marginBottom: 16,
    elevation: 2,
    backgroundColor: '#E8F5E8',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  dialogueText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  grammarText: {
    fontSize: 16,
    lineHeight: 24,
  },
  vocabularyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  vocabularyWord: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 100,
  },
  vocabularyTranslation: {
    fontSize: 16,
    flex: 1,
    marginLeft: 12,
  },
  vocabularyPronunciation: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  exerciseQuestion: {
    fontSize: 16,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 8,
    flex: 1,
  },
  correctAnswer: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  wrongAnswer: {
    color: '#F44336',
    fontWeight: 'bold',
  },
  answerSection: {
    marginTop: 16,
  },
  divider: {
    marginBottom: 16,
  },
  explanation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  nextButton: {
    marginTop: 8,
  },
  completionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
  },
  completionText: {
    textAlign: 'center',
    marginVertical: 16,
    fontSize: 16,
  },
  backButton: {
    marginTop: 8,
  },
});

export default LessonDetailScreen;
