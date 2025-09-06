import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, ProgressBar, Chip, Text } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const LessonsScreen = ({ navigation }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    try {
      const response = await api.get('/lessons');
      setLessons(response.data);
    } catch (error) {
      console.error('Error loading lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadLessons();
    setRefreshing(false);
  };

  const getProgressPercentage = (progress) => {
    if (!progress) return 0;
    return progress.completed ? 100 : 0;
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const renderLesson = ({ item }) => (
    <Card 
      style={styles.lessonCard}
      onPress={() => navigation.navigate('LessonDetail', { lesson: item })}
    >
      <Card.Content>
        <View style={styles.lessonHeader}>
          <Title style={styles.lessonTitle}>
            {getLanguageFlag(item.language)} Lesson {item.level}
          </Title>
          <Chip 
            mode="outlined" 
            compact
            style={[
              styles.statusChip,
              { backgroundColor: item.progress?.completed ? '#4CAF50' : '#FFC107' }
            ]}
          >
            {item.progress?.completed ? 'Completed' : 'Not Started'}
          </Chip>
        </View>
        
        <Paragraph style={styles.lessonDescription}>
          {item.title}
        </Paragraph>
        
        {item.progress && (
          <View style={styles.progressContainer}>
            <Text style={styles.progressText}>
              Progress: {getProgressPercentage(item.progress)}%
            </Text>
            <ProgressBar 
              progress={getProgressPercentage(item.progress) / 100}
              color="#2196F3"
              style={styles.progressBar}
            />
          </View>
        )}
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading lessons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>
          {getLanguageFlag(user.activeLanguage)} {user.activeLanguage === 'fr' ? 'French' : 'German'} Lessons
        </Title>
        <Paragraph style={styles.headerSubtitle}>
          Complete {lessons.filter(l => l.progress?.completed).length} of {lessons.length} lessons
        </Paragraph>
      </View>

      <FlatList
        data={lessons}
        renderItem={renderLesson}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#666',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  lessonCard: {
    marginBottom: 16,
    elevation: 2,
  },
  lessonHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  statusChip: {
    marginLeft: 8,
  },
  lessonDescription: {
    marginBottom: 12,
    color: '#666',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
});

export default LessonsScreen;
