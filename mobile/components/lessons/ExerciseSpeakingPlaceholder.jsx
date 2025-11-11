import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const ExerciseSpeakingPlaceholder = ({ onComplete }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Exercise 3: Speaking (Coming Soon)</Text>
      <Text style={styles.text}>
        We will add a microphone-powered speaking practice here. For now, tap Continue
        to finish the exercise flow.
      </Text>
      <TouchableOpacity onPress={onComplete} style={[styles.button, styles.primary]}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  text: { color: COLORS.textPrimary, marginBottom: 12, fontFamily: 'serif' },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
    alignSelf: 'flex-start',
  },
  primary: { backgroundColor: COLORS.accent },
  buttonText: { color: COLORS.background, fontWeight: 'bold' },
});

export default ExerciseSpeakingPlaceholder;
