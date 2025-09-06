import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text, Card, Button, ProgressBar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { LessonsStackParamList } from '../../navigation/MainNavigator';
import { AppDispatch, RootState } from '../../store/store';
import { fetchLessons } from '../../store/slices/lessonsSlice';
import { Lesson } from '../../store/slices/lessonsSlice';

type LessonsListScreenNavigationProp = StackNavigationProp<LessonsStackParamList, 'LessonsList'>;

interface Props {
  navigation: LessonsListScreenNavigationProp;
}

const LessonsListScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { lessons, isLoading } = useSelector((state: RootState) => state.lessons);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchLessons());
  }, [dispatch]);

  const renderLessonItem = ({ item }: { item: Lesson }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('LessonDetail', { lessonId: item.id })}>
      <Card.Content>
        <View style={styles.lessonHeader}>
          <Text variant="titleMedium">Level {item.level}</Text>
          <Text variant="bodySmall" style={styles.languageLabel}>
            {item.language === 'fr' ? '🇫🇷 French' : '🇩🇪 German'}
          </Text>
        </View>
        <Text variant="headlineSmall" style={styles.lessonTitle}>
          {item.title}
        </Text>
        <View style={styles.progressContainer}>
          <ProgressBar 
            progress={item.completed ? 1 : 0} 
            color="#4caf50"
            style={styles.progressBar}
          />
          <Text variant="bodySmall" style={styles.progressText}>
            {item.completed ? 'Completed' : 'Not started'}
          </Text>
        </View>
        {item.score && (
          <Text variant="bodySmall" style={styles.score}>
            Score: {item.score}/100
          </Text>
        )}
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium">
          {user?.activeLanguage === 'fr' ? '🇫🇷 French' : '🇩🇪 German'} Lessons
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Progressive lessons to build your language skills
        </Text>
      </View>

      <FlatList
        data={lessons}
        renderItem={renderLessonItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  subtitle: {
    color: '#666',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 12,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  languageLabel: {
    color: '#666',
  },
  lessonTitle: {
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    marginBottom: 4,
  },
  progressText: {
    color: '#666',
  },
  score: {
    color: '#4caf50',
    marginTop: 4,
  },
});

export default LessonsListScreen;
