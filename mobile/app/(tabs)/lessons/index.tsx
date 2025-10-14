import { View, FlatList } from 'react-native';
import React, { JSX, useState, useEffect, useCallback } from 'react';
import LessonCard from '../../../components/lessons/LessonCard';
import styles from "../../../assets/styles/lesson.styles";
import { lessons } from '../../../data/lessons.js'
import { router } from 'expo-router';
import { useAuthStore } from '../../../store/authStore';
import { API_URL } from '../../../constants/api';

const Index = () => {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const { token } = useAuthStore();

  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/progress/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCompletedLessons(data.progress.completedLessonIds || []);
      }
    } catch (error) {
      console.error('Error fetching lesson progress:', error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, fetchDashboardData]);

  const handleLessonPress = (lessonId: number): void => {
    router.push(`/lessons/${lessonId}`);
  };

  const renderLessonCard = ({ item }: {item: any}): JSX.Element => {
    const isCompleted = completedLessons.includes(item.id);
    
    return (
      <LessonCard
        lesson={item}
        onPress={() => handleLessonPress(item.id)}
        isCompleted={isCompleted}
      />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLessonCard}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        bounces={true}
        decelerationRate="normal"
      />
    </View>
  )
}

export default Index