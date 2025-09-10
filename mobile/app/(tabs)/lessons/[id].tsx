import { View, Text, ScrollView } from 'react-native';
import React, { JSX } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { lessons } from '../../../data/lessons.js'
import styles from '../../../assets/styles/lesson.styles';

const LessonDetail = () => {
  // Get the id parameter from the route
  const { id } = useLocalSearchParams();

  // Convert id to number and find the matching lesson
  const lessonId = parseInt(id as string);
  const lesson = lessons.find(lesson => lesson.id === lessonId);

  // Handle case where lessons is not found
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.lessonTitle}>Lesson not found</Text>
      </View>
    );
  }

  // Handle displaying multiple dialogues and speakers
  const renderDialogueBox = (dialogue: any, index: number): JSX.Element => {
    const isLeftSide = dialogue.isSpeaker1;

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isLeftSide ? styles.leftMessage : styles.rightMessage
        ]}
      >
        <Text style={styles.speakerName}>{dialogue.speaker}</Text>
        <View style={[
          styles.messageBubble,
          isLeftSide ? styles.leftBubble : styles.rightBubble
        ]}>
          <Text style={styles.messageText}>{dialogue.text}</Text>
          <Text style={isLeftSide ? styles.leftTranslationText : styles.rightTranslationText}>
            {dialogue.translationText}
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.lessonTitle}>{lesson.title}</Text>
      <ScrollView style={styles.chatContainer}>
        {lesson.dialogue.map((dialogue, index) =>
          renderDialogueBox(dialogue, index)
        )}
      </ScrollView>
    </View>
  )
}

export default LessonDetail;