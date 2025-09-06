import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from 'react-native-paper';

// Screens
import LessonsScreen from '../screens/lessons/LessonsScreen';
import LessonDetailScreen from '../screens/lessons/LessonDetailScreen';
import FlashcardsScreen from '../screens/flashcards/FlashcardsScreen';
import DeckDetailScreen from '../screens/flashcards/DeckDetailScreen';
import ReviewScreen from '../screens/flashcards/ReviewScreen';
import MediaScreen from '../screens/media/MediaScreen';
import MediaDetailScreen from '../screens/media/MediaDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

const Tab = createBottomTabNavigator();
const LessonsStack = createStackNavigator();
const FlashcardsStack = createStackNavigator();
const MediaStack = createStackNavigator();
const ProfileStack = createStackNavigator();

const LessonsStackNavigator = () => (
  <LessonsStack.Navigator>
    <LessonsStack.Screen 
      name="LessonsList" 
      component={LessonsScreen}
      options={{ title: 'Lessons' }}
    />
    <LessonsStack.Screen 
      name="LessonDetail" 
      component={LessonDetailScreen}
      options={{ title: 'Lesson' }}
    />
  </LessonsStack.Navigator>
);

const FlashcardsStackNavigator = () => (
  <FlashcardsStack.Navigator>
    <FlashcardsStack.Screen 
      name="FlashcardsList" 
      component={FlashcardsScreen}
      options={{ title: 'Flashcards' }}
    />
    <FlashcardsStack.Screen 
      name="DeckDetail" 
      component={DeckDetailScreen}
      options={{ title: 'Deck' }}
    />
    <FlashcardsStack.Screen 
      name="Review" 
      component={ReviewScreen}
      options={{ title: 'Review' }}
    />
  </FlashcardsStack.Navigator>
);

const MediaStackNavigator = () => (
  <MediaStack.Navigator>
    <MediaStack.Screen 
      name="MediaList" 
      component={MediaScreen}
      options={{ title: 'Media' }}
    />
    <MediaStack.Screen 
      name="MediaDetail" 
      component={MediaDetailScreen}
      options={{ title: 'Media' }}
    />
  </MediaStack.Navigator>
);

const ProfileStackNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="ProfileMain" 
      component={ProfileScreen}
      options={{ title: 'Profile' }}
    />
    <ProfileStack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{ title: 'Settings' }}
    />
  </ProfileStack.Navigator>
);

const MainNavigator = () => {
  const theme = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Lessons') {
            iconName = 'school';
          } else if (route.name === 'Flashcards') {
            iconName = 'style';
          } else if (route.name === 'Media') {
            iconName = 'play-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Lessons" component={LessonsStackNavigator} />
      <Tab.Screen name="Flashcards" component={FlashcardsStackNavigator} />
      <Tab.Screen name="Media" component={MediaStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
