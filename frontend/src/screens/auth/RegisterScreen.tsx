import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, TextInput, Button, Card, SegmentedButtons } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { AppDispatch, RootState } from '../../store/store';
import { registerUser } from '../../store/slices/authSlice';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [activeLanguage, setActiveLanguage] = useState<'fr' | 'de'>('fr');

  const handleRegister = () => {
    dispatch(registerUser({ email, username, password, activeLanguage }));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          Join HelloWorld
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Start your language learning journey
        </Text>

        <Card style={styles.form}>
          <Card.Content>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              label="Username"
              value={username}
              onChangeText={setUsername}
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              secureTextEntry
            />

            <Text variant="titleMedium" style={styles.sectionTitle}>
              Choose your target language:
            </Text>
            <SegmentedButtons
              value={activeLanguage}
              onValueChange={(value) => setActiveLanguage(value as 'fr' | 'de')}
              buttons={[
                { value: 'fr', label: '🇫🇷 French' },
                { value: 'de', label: '🇩🇪 German' },
              ]}
              style={styles.languageSelector}
            />
            
            {error && (
              <Text style={styles.error}>{error}</Text>
            )}

            <Button
              mode="contained"
              onPress={handleRegister}
              loading={isLoading}
              disabled={!email || !username || !password}
              style={styles.button}
            >
              Create Account
            </Button>
          </Card.Content>
        </Card>

        <Button
          mode="text"
          onPress={() => navigation.navigate('Login')}
          style={styles.linkButton}
        >
          Already have an account? Sign in
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    color: '#6200ee',
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 32,
    color: '#666',
  },
  form: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 8,
    marginTop: 8,
  },
  languageSelector: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 4,
  },
  linkButton: {
    marginTop: 16,
  },
  error: {
    color: '#b00020',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default RegisterScreen;
