import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Text, SegmentedButtons } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const MediaScreen = ({ navigation }) => {
  const [mediaItems, setMediaItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    loadCategories();
    loadMediaItems();
  }, []);

  useEffect(() => {
    loadMediaItems();
  }, [selectedCategory]);

  const loadCategories = async () => {
    try {
      const response = await api.get('/media/categories');
      const categoryData = response.data.map(cat => ({
        value: cat.category,
        label: cat.category.charAt(0).toUpperCase() + cat.category.slice(1)
      }));
      setCategories([
        { value: 'all', label: 'All' },
        ...categoryData
      ]);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadMediaItems = async () => {
    try {
      const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
      const response = await api.get('/media', { params });
      setMediaItems(response.data);
    } catch (error) {
      console.error('Error loading media items:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMediaItems();
    setRefreshing(false);
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'podcast': return '🎧';
      case 'literature': return '📚';
      case 'song': return '🎵';
      case 'video': return '🎬';
      default: return '📄';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return '#4CAF50';
      case 'intermediate': return '#FF9800';
      case 'advanced': return '#F44336';
      default: return '#666';
    }
  };

  const renderMediaItem = ({ item }) => (
    <Card 
      style={styles.mediaCard}
      onPress={() => navigation.navigate('MediaDetail', { mediaItem: item })}
    >
      <Card.Content>
        <View style={styles.mediaHeader}>
          <Title style={styles.mediaTitle}>
            {getCategoryIcon(item.category)} {item.title}
          </Title>
          <Chip 
            mode="outlined" 
            compact
            style={[styles.difficultyChip, { borderColor: getDifficultyColor(item.difficulty) }]}
            textStyle={{ color: getDifficultyColor(item.difficulty) }}
          >
            {item.difficulty}
          </Chip>
        </View>
        
        <Paragraph style={styles.mediaDescription}>
          {item.description}
        </Paragraph>
        
        <View style={styles.mediaFooter}>
          <Text style={styles.mediaDuration}>
            {item.duration} min
          </Text>
          <Text style={styles.mediaLanguage}>
            {getLanguageFlag(item.language)}
          </Text>
        </View>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading media...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.headerTitle}>
          {getLanguageFlag(user.activeLanguage)} Media Library
        </Title>
        <Paragraph style={styles.headerSubtitle}>
          Immersive content for {user.activeLanguage === 'fr' ? 'French' : 'German'} learning
        </Paragraph>
      </View>

      {categories.length > 0 && (
        <View style={styles.categoryContainer}>
          <SegmentedButtons
            value={selectedCategory}
            onValueChange={setSelectedCategory}
            buttons={categories}
            style={styles.segmentedButtons}
          />
        </View>
      )}

      <FlatList
        data={mediaItems}
        renderItem={renderMediaItem}
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
  categoryContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  segmentedButtons: {
    marginBottom: 8,
  },
  listContainer: {
    padding: 16,
  },
  mediaCard: {
    marginBottom: 16,
    elevation: 2,
  },
  mediaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mediaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 8,
  },
  difficultyChip: {
    marginLeft: 8,
  },
  mediaDescription: {
    marginBottom: 12,
    color: '#666',
    lineHeight: 20,
  },
  mediaFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaDuration: {
    fontSize: 14,
    color: '#666',
  },
  mediaLanguage: {
    fontSize: 16,
  },
});

export default MediaScreen;
