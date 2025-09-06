import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Card, Title, Paragraph, Button, Text, RadioButton, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const SettingsScreen = ({ navigation }) => {
  const { user, updateUser } = useAuth();
  const [activeLanguage, setActiveLanguage] = useState(user.activeLanguage);
  const [username, setUsername] = useState(user.username);
  const [loading, setLoading] = useState(false);

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      const response = await api.patch('/user/preferences', {
        activeLanguage,
        username
      });
      
      updateUser(response.data.user);
      Alert.alert('Success', 'Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      Alert.alert('Error', 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageFlag = (language) => {
    return language === 'fr' ? '🇫🇷' : '🇩🇪';
  };

  const getLanguageName = (language) => {
    return language === 'fr' ? 'French' : 'German';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Profile Settings</Title>
            
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
            />
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Language Settings</Title>
            <Paragraph style={styles.sectionDescription}>
              Choose your target language. This will filter all content to your selected language.
            </Paragraph>
            
            <View style={styles.languageSection}>
              <View style={styles.radioItem}>
                <RadioButton
                  value="fr"
                  status={activeLanguage === 'fr' ? 'checked' : 'unchecked'}
                  onPress={() => setActiveLanguage('fr')}
                />
                <View style={styles.radioContent}>
                  <Text style={styles.radioLabel}>
                    {getLanguageFlag('fr')} French
                  </Text>
                  <Text style={styles.radioDescription}>
                    Learn French with interactive lessons and media
                  </Text>
                </View>
              </View>
              
              <View style={styles.radioItem}>
                <RadioButton
                  value="de"
                  status={activeLanguage === 'de' ? 'checked' : 'unchecked'}
                  onPress={() => setActiveLanguage('de')}
                />
                <View style={styles.radioContent}>
                  <Text style={styles.radioLabel}>
                    {getLanguageFlag('de')} German
                  </Text>
                  <Text style={styles.radioDescription}>
                    Learn German with interactive lessons and media
                  </Text>
                </View>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Account Information</Title>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Current Language:</Text>
              <Text style={styles.infoValue}>
                {getLanguageFlag(user.activeLanguage)} {getLanguageName(user.activeLanguage)}
              </Text>
            </View>
            
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Member Since:</Text>
              <Text style={styles.infoValue}>
                {new Date(user.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.settingsCard}>
          <Card.Content>
            <Title style={styles.sectionTitle}>Danger Zone</Title>
            <Paragraph style={styles.sectionDescription}>
              These actions cannot be undone. Please be careful.
            </Paragraph>
            
            <Button
              mode="outlined"
              onPress={() => {
                Alert.alert(
                  'Delete Account',
                  'Are you sure you want to delete your account? This action cannot be undone.',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    { 
                      text: 'Delete', 
                      style: 'destructive',
                      onPress: () => {
                        // Implement account deletion
                        Alert.alert('Not Implemented', 'Account deletion is not implemented in this MVP');
                      }
                    }
                  ]
                );
              }}
              style={styles.dangerButton}
              textColor="#F44336"
              icon="delete"
            >
              Delete Account
            </Button>
          </Card.Content>
        </Card>

        <View style={styles.saveButtonContainer}>
          <Button
            mode="contained"
            onPress={handleSaveSettings}
            loading={loading}
            disabled={loading}
            style={styles.saveButton}
          >
            Save Settings
          </Button>
        </View>
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
  settingsCard: {
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionDescription: {
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  input: {
    marginBottom: 16,
  },
  languageSection: {
    marginTop: 8,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  radioContent: {
    flex: 1,
    marginLeft: 8,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  radioDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 18,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    flex: 1,
    textAlign: 'right',
  },
  dangerButton: {
    marginTop: 8,
    borderColor: '#F44336',
  },
  saveButtonContainer: {
    marginTop: 16,
    marginBottom: 32,
  },
  saveButton: {
    paddingVertical: 8,
  },
});

export default SettingsScreen;
