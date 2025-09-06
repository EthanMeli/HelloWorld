import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, Text, ProgressBar, Avatar, Divider } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const ProfileScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.get('/user/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStats();
    setRefreshing(false);
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const getLanguageName = (language) => {
    return language === 'fr' ? 'French' : 'German';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.content}>
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Text 
              size={80} 
              label={user.username.charAt(0).toUpperCase()}
              style={styles.avatar}
            />
            <Title style={styles.username}>{user.username}</Title>
            <Paragraph style={styles.email}>{user.email}</Paragraph>
            <View style={styles.languageInfo}>
              <Text style={styles.languageText}>
                Learning: {getLanguageFlag(user.activeLanguage)} {getLanguageName(user.activeLanguage)}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {stats && (
          <Card style={styles.statsCard}>
            <Card.Content>
              <Title style={styles.sectionTitle}>Learning Progress</Title>
              
              <View style={styles.statSection}>
                <Text style={styles.statTitle}>Lessons</Text>
                <View style={styles.statRow}>
                  <Text style={styles.statText}>
                    {stats.lessons.completed} of {stats.lessons.total} completed
                  </Text>
                  <Text style={styles.statPercentage}>
                    {stats.lessons.progress}%
                  </Text>
                </View>
                <ProgressBar 
                  progress={stats.lessons.progress / 100} 
                  color="#2196F3"
                  style={styles.progressBar}
                />
              </View>

              <Divider style={styles.divider} />

              <View style={styles.statSection}>
                <Text style={styles.statTitle}>Flashcards</Text>
                <View style={styles.statRow}>
                  <Text style={styles.statText}>
                    {stats.flashcards.cardsReviewed} of {stats.flashcards.totalCards} reviewed
                  </Text>
                  <Text style={styles.statPercentage}>
                    {stats.flashcards.progress}%
                  </Text>
                </View>
                <ProgressBar 
                  progress={stats.flashcards.progress / 100} 
                  color="#4CAF50"
                  style={styles.progressBar}
                />
              </View>

              <Divider style={styles.divider} />

              <View style={styles.statSection}>
                <Text style={styles.statTitle}>Study Streak</Text>
                <View style={styles.statRow}>
                  <Text style={styles.statText}>
                    {stats.streak} day{stats.streak !== 1 ? 's' : ''}
                  </Text>
                  <Text style={styles.streakEmoji}>🔥</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.achievementsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Achievements</Title>
            <View style={styles.achievementsList}>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementEmoji}>📚</Text>
                <Text style={styles.achievementText}>
                  {stats?.lessons.completed || 0} lessons completed
                </Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementEmoji}>🎯</Text>
                <Text style={styles.achievementText}>
                  {stats?.flashcards.totalDecks || 0} flashcard decks
                </Text>
              </View>
              <View style={styles.achievementItem}>
                <Text style={styles.achievementEmoji}>⭐</Text>
                <Text style={styles.achievementText}>
                  {stats?.flashcards.cardsReviewed || 0} cards reviewed
                </Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.actionsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account</Title>
            <Button
              mode="outlined"
              onPress={() => navigation.navigate('Settings')}
              style={styles.actionButton}
              icon="cog"
            >
              Settings
            </Button>
            <Button
              mode="outlined"
              onPress={handleLogout}
              style={styles.actionButton}
              icon="logout"
              textColor="#F44336"
            >
              Logout
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
  profileCard: {
    marginBottom: 16,
    elevation: 4,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#2196F3',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    color: '#666',
    marginBottom: 12,
  },
  languageInfo: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  languageText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  statsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  achievementsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  actionsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statSection: {
    marginBottom: 16,
  },
  statTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    color: '#666',
  },
  statPercentage: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  divider: {
    marginVertical: 16,
  },
  achievementsList: {
    gap: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  achievementText: {
    fontSize: 16,
    flex: 1,
  },
  actionButton: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
