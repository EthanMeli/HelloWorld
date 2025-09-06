import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Linking, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Text, Chip, Divider } from 'react-native-paper';

const MediaDetailScreen = ({ route }) => {
  const { mediaItem } = route.params;
  const [showTranscript, setShowTranscript] = useState(false);

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

  const handleOpenSource = () => {
    if (mediaItem.sourceUrl) {
      Linking.openURL(mediaItem.sourceUrl).catch(() => {
        Alert.alert('Error', 'Could not open the media source');
      });
    }
  };

  const renderTags = () => {
    if (!mediaItem.tags || mediaItem.tags.length === 0) return null;

    return (
      <View style={styles.tagsContainer}>
        <Text style={styles.tagsTitle}>Tags:</Text>
        <View style={styles.tagsList}>
          {mediaItem.tags.map((tag, index) => (
            <Chip key={index} mode="outlined" compact style={styles.tag}>
              {tag}
            </Chip>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.headerCard}>
          <Card.Content>
            <View style={styles.headerContent}>
              <Title style={styles.title}>
                {getCategoryIcon(mediaItem.category)} {mediaItem.title}
              </Title>
              <View style={styles.metaInfo}>
                <Chip 
                  mode="outlined" 
                  style={[styles.difficultyChip, { borderColor: getDifficultyColor(mediaItem.difficulty) }]}
                  textStyle={{ color: getDifficultyColor(mediaItem.difficulty) }}
                >
                  {mediaItem.difficulty}
                </Chip>
                <Text style={styles.language}>
                  {getLanguageFlag(mediaItem.language)}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.descriptionCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Description</Title>
            <Paragraph style={styles.description}>
              {mediaItem.description}
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.detailsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Details</Title>
            <View style={styles.detailsList}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Category:</Text>
                <Text style={styles.detailValue}>
                  {getCategoryIcon(mediaItem.category)} {mediaItem.category.charAt(0).toUpperCase() + mediaItem.category.slice(1)}
                </Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{mediaItem.duration} minutes</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Language:</Text>
                <Text style={styles.detailValue}>
                  {getLanguageFlag(mediaItem.language)} {mediaItem.language === 'fr' ? 'French' : 'German'}
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        {renderTags()}

        {mediaItem.transcriptOrLyrics && (
          <Card style={styles.transcriptCard}>
            <Card.Content>
              <View style={styles.transcriptHeader}>
                <Title style={styles.sectionTitle}>
                  {mediaItem.category === 'song' ? 'Lyrics' : 'Transcript'}
                </Title>
                <Button
                  mode="text"
                  onPress={() => setShowTranscript(!showTranscript)}
                >
                  {showTranscript ? 'Hide' : 'Show'}
                </Button>
              </View>
              
              {showTranscript && (
                <View style={styles.transcriptContent}>
                  <Divider style={styles.divider} />
                  <Text style={styles.transcriptText}>
                    {mediaItem.transcriptOrLyrics}
                  </Text>
                </View>
              )}
            </Card.Content>
          </Card>
        )}

        <Card style={styles.actionCard}>
          <Card.Content>
            <Button
              mode="contained"
              onPress={handleOpenSource}
              style={styles.openButton}
              icon="open-in-new"
            >
              Open {mediaItem.category === 'song' ? 'Song' : mediaItem.category === 'video' ? 'Video' : mediaItem.category === 'podcast' ? 'Podcast' : 'Content'}
            </Button>
          </Card.Content>
        </Card>
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
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  headerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  difficultyChip: {
    marginRight: 8,
  },
  language: {
    fontSize: 20,
  },
  descriptionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  detailsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  transcriptCard: {
    marginBottom: 16,
    elevation: 2,
  },
  actionCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
  },
  detailsList: {
    gap: 12,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  detailValue: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  tagsContainer: {
    marginBottom: 16,
  },
  tagsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  tagsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    marginRight: 8,
    marginBottom: 8,
  },
  transcriptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transcriptContent: {
    marginTop: 12,
  },
  divider: {
    marginBottom: 12,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    fontStyle: 'italic',
  },
  openButton: {
    marginTop: 8,
  },
});

export default MediaDetailScreen;
