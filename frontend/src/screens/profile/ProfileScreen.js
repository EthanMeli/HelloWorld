import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Text 
            size={80} 
            label={user?.username?.charAt(0).toUpperCase() || 'U'} 
            style={styles.avatar}
          />
          <Text variant="headlineMedium" style={styles.username}>
            {user?.username || 'User'}
          </Text>
          <Text variant="bodyLarge" style={styles.email}>
            {user?.email || 'user@example.com'}
          </Text>
          <Text variant="bodyMedium" style={styles.language}>
            Learning: {user?.activeLanguage === 'fr' ? '🇫🇷 French' : '🇩🇪 German'}
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.statsCard}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Learning Progress
          </Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>5</Text>
              <Text variant="bodySmall">Lessons Completed</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>142</Text>
              <Text variant="bodySmall">Cards Reviewed</Text>
            </View>
            <View style={styles.statItem}>
              <Text variant="headlineSmall" style={styles.statNumber}>12</Text>
              <Text variant="bodySmall">Day Streak</Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.menuCard}>
        <Card.Content>
          <Button
            mode="outlined"
            onPress={() => navigation.navigate('Settings')}
            style={styles.menuButton}
            icon="cog"
          >
            Settings
          </Button>
          <Button
            mode="outlined"
            onPress={handleLogout}
            style={styles.menuButton}
            icon="logout"
          >
            Sign Out
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
    padding: 16,
  },
  profileCard: {
    marginBottom: 16,
  },
  profileContent: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: '#6200ee',
  },
  username: {
    marginBottom: 4,
  },
  email: {
    color: '#666',
    marginBottom: 8,
  },
  language: {
    color: '#666',
  },
  statsCard: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 16,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  menuCard: {
    marginBottom: 32,
  },
  menuButton: {
    marginBottom: 8,
  },
});

export default ProfileScreen;
