import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ProgressCard from './ProgressCard';
import { useAuthStore } from '../store/authStore';
import { API_URL } from '../constants/api';
import COLORS from '../constants/colors';
import styles from '../assets/styles/dashboard.styles';

const UserDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/progress/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      } else {
        Alert.alert('Error', 'Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      Alert.alert('Error', 'Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const testStreak = async () => {
    try {
      const response = await fetch(`${API_URL}/progress/test-streak`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        Alert.alert('Success', `Streak incremented! New streak: ${data.streakCount} days`);
        fetchDashboardData(); // Refresh dashboard
      } else {
        Alert.alert('Error', 'Failed to increment streak');
      }
    } catch (error) {
      console.error('Test streak error:', error);
      Alert.alert('Error', 'Failed to connect to server');
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Loading dashboard...</Text>
      </View>
    );
  }

  if (!dashboardData) {
    return (
      <View style={styles.errorContainer}>
        <MaterialIcons name="error-outline" size={48} color={COLORS.textSecondary} />
        <Text style={styles.errorText}>Failed to load dashboard data</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchDashboardData}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { progress } = dashboardData;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.dashboardHeader}>
        <Text style={styles.dashboardTitle}>📊 Learning Progress</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchDashboardData}>
          <MaterialIcons name="refresh" size={24} color={COLORS.accent} />
        </TouchableOpacity>
      </View>

      {/* Progress Cards */}
      <View style={styles.cardsContainer}>
        <ProgressCard
          title="Lessons Completed"
          current={progress.lessonsCompleted}
          total={progress.totalLessons}
          icon="📚"
        />
        
        <ProgressCard
          title="Weekly Progress"
          current={progress.weeklyLessons}
          total={7}
          icon="📅"
        />
        
        <View style={styles.streakCard}>
          <View style={styles.streakHeader}>
            <Text style={styles.streakTitle}>🔥 Current Streak</Text>
            <TouchableOpacity style={styles.testButton} onPress={testStreak}>
              <Text style={styles.testButtonText}>Test +1</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.streakNumber}>{progress.streakCount}</Text>
          <Text style={styles.streakSubtext}>
            {progress.streakCount === 1 ? 'day' : 'days'} in a row
          </Text>
        </View>

        <View style={styles.timeCard}>
          <Text style={styles.timeTitle}>⏱️ Total Study Time</Text>
          <Text style={styles.timeNumber}>{formatTime(progress.totalStudyTime)}</Text>
        </View>
      </View>

      {/* Recent Activity */}
      {dashboardData.recentActivity && dashboardData.recentActivity.length > 0 && (
        <View style={styles.activitySection}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {dashboardData.recentActivity.slice(0, 3).map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <MaterialIcons name="check-circle" size={20} color={COLORS.accent} />
              <Text style={styles.activityText}>
                Completed Lesson {activity.lessonId}
              </Text>
              <Text style={styles.activityDate}>
                {new Date(activity.completedAt).toLocaleDateString()}
              </Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default UserDashboard;