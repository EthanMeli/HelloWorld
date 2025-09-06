import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styles from '../../assets/styles/lesson.styles'

export default function LessonCard() {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.lessonInfo}>
        <Text style={styles.headerSection}>Lesson 1</Text>
        <Text style={styles.lessonTitle}>Viel Glück!</Text>
        <Text style={styles.snippet}>This is a snippet.</Text>
      </View>
      <TouchableOpacity style={styles.lessonButton}>
        <Text style={styles.lessonButtonText}>View Lesson</Text>
      </TouchableOpacity>
    </View>
  )
}