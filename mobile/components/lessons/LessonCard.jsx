import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../assets/styles/lesson.styles';

export default function LessonCard({ lesson, onPress }) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.lessonInfo}>
        <Text style={styles.lessonNumber}>Lesson {lesson.id}</Text>
        <Text style={styles.lessonTitle}>{lesson.displayTitle}</Text>
        <Text 
          style={styles.snippet}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {lesson.snippet}
        </Text>
      </View>
      <TouchableOpacity 
        style={styles.lessonButton} 
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`View lesson ${lesson.id}: ${lesson.title}`}
      >
        <Text style={styles.lessonButtonText}>VIEW LESSON</Text>
      </TouchableOpacity>
    </View>
  )
}