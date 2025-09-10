import { View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { JSX } from 'react';
import LessonCard from '../../../components/lessons/LessonCard';
import styles from "../../../assets/styles/lesson.styles";
import { lessons } from '../../../data/lessons.js'
import { router } from 'expo-router';

const index = () => {
  const handleLessonPress = (lessonId: number): void => {
    router.push(`/lessons/${lessonId}`);
  };

  const renderLessonCard = ({ item }: {item: any}): JSX.Element => (
    <LessonCard
      lesson={item}
      onPress={() => handleLessonPress(item.id)}
    />
  );

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

export default index