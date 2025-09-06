import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, SegmentedButtons, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../store/slices/authSlice';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeLanguage, setActiveLanguage] = useState(user?.activeLanguage || 'fr');

  const handleSaveSettings = () => {
    if (activeLanguage !== user?.activeLanguage) {
      dispatch(updateProfile({ activeLanguage }));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Language Preference
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Choose your target language. All lessons and content will be filtered accordingly.
          </Text>
          
          <SegmentedButtons
            value={activeLanguage}
            onValueChange={setActiveLanguage}
            buttons={[
              { value: 'fr', label: '🇫🇷 French' },
              { value: 'de', label: '🇩🇪 German' },
            ]}
            style={styles.languageSelector}
          />

          <Button
            mode="contained"
            onPress={handleSaveSettings}
            style={styles.saveButton}
            disabled={activeLanguage === user?.activeLanguage}
          >
            Save Changes
          </Button>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            HelloWorld Language Learning App v1.0.0
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            Learn French and German with interactive lessons, flashcards, and immersive media content.
          </Text>
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
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  description: {
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  languageSelector: {
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 8,
  },
});

export default SettingsScreen;
