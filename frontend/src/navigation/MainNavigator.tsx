import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LessonsListScreen from '../screens/lessons/LessonsListScreen';
import LessonDetailScreen from '../screens/lessons/LessonDetailScreen';
import FlashcardsHomeScreen from '../screens/flashcards/FlashcardsHomeScreen';
import DeckDetailScreen from '../screens/flashcards/DeckDetailScreen';
import ReviewScreen from '../screens/flashcards/ReviewScreen';
import MediaHomeScreen from '../screens/media/MediaHomeScreen';
import MediaListScreen from '../screens/media/MediaListScreen';
import MediaDetailScreen from '../screens/media/MediaDetailScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';

export type LessonsStackParamList = {
  LessonsList: undefined;
  LessonDetail: { lessonId: string };
};

export type FlashcardsStackParamList = {
  FlashcardsHome: undefined;
  DeckDetail: { deckId: string };
  Review: undefined;
};

export type MediaStackParamList = {
  MediaHome: undefined;
  MediaList: { category: string };
  MediaDetail: { category: string; id: string };
};

export type ProfileStackParamList = {
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  LessonsTab: undefined;
  FlashcardsTab: undefined;
  MediaTab: undefined;
  ProfileTab: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const LessonsStack = createStackNavigator<LessonsStackParamList>();
const FlashcardsStack = createStackNavigator<FlashcardsStackParamList>();
const MediaStack = createStackNavigator<MediaStackParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();

const LessonsNavigator = () => (
  <LessonsStack.Navigator>
    <LessonsStack.Screen 
      name="LessonsList" 
      component={LessonsListScreen}
      options={{ title: 'Lessons' }}
    />
    <LessonsStack.Screen 
      name="LessonDetail" 
      component={LessonDetailScreen}
      options={{ title: 'Lesson' }}
    />
  </LessonsStack.Navigator>
);

const FlashcardsNavigator = () => (
  <FlashcardsStack.Navigator>
    <FlashcardsStack.Screen 
      name="FlashcardsHome" 
      component={FlashcardsHomeScreen}
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

const MediaNavigator = () => (
  <MediaStack.Navigator>
    <MediaStack.Screen 
      name="MediaHome" 
      component={MediaHomeScreen}
      options={{ title: 'Media' }}
    />
    <MediaStack.Screen 
      name="MediaList" 
      component={MediaListScreen}
      options={{ title: 'Media' }}
    />
    <MediaStack.Screen 
      name="MediaDetail" 
      component={MediaDetailScreen}
      options={{ title: 'Media Detail' }}
    />
  </MediaStack.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen 
      name="Profile" 
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'LessonsTab') {
            iconName = 'school';
          } else if (route.name === 'FlashcardsTab') {
            iconName = 'quiz';
          } else if (route.name === 'MediaTab') {
            iconName = 'library-books';
          } else if (route.name === 'ProfileTab') {
            iconName = 'person';
          }

          return <Icon name={iconName || 'help'} size={size} color={color} />;
        },
        headerShown: false,
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen 
        name="LessonsTab" 
        component={LessonsNavigator}
        options={{ tabBarLabel: 'Lessons' }}
      />
      <Tab.Screen 
        name="FlashcardsTab" 
        component={FlashcardsNavigator}
        options={{ tabBarLabel: 'Flashcards' }}
      />
      <Tab.Screen 
        name="MediaTab" 
        component={MediaNavigator}
        options={{ tabBarLabel: 'Media' }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileNavigator}
        options={{ tabBarLabel: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
