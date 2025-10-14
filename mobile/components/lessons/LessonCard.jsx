import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from '../../assets/styles/lesson.styles';

import { MaterialIcons } from '@expo/vector-icons';
import COLORS from '../../constants/colors';

export default function LessonCard({ lesson, onPress, isCompleted = false }) {
  const getButtonText = () => {
    if (isCompleted) {
      return 'RESUME LESSON';
    }
    return 'BEGIN LESSON';
  };

  return (
    <View style={[styles.cardContainer, isCompleted && styles.completedCard]}>
      {isCompleted && (
        <View style={styles.completedBadge}>
          <MaterialIcons name="check-circle" size={20} color={COLORS.accent} />
          <Text style={styles.completedLabel}>COMPLETED</Text>
        </View>
      )}
      
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
        style={[
          styles.lessonButton,
          isCompleted && styles.completedLessonButton
        ]} 
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={`${isCompleted ? 'Resume' : 'Begin'} lesson ${lesson.id}: ${lesson.title}`}
      >
        <Text style={[
          styles.lessonButtonText,
          isCompleted && styles.completedLessonButtonText
        ]}>
          {getButtonText()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}