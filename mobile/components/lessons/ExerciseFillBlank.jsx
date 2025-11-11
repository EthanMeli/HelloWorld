import React, { useMemo, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const selectBlankWord = (sentence = '') => {
  const words = sentence
    .replace(/[\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);
  // Pick the longest word with letters (avoid punctuation-only tokens)
  const candidates = words.filter((w) => /[A-Za-zÄÖÜäöüß]/.test(w));
  if (candidates.length === 0) return { sentence, answer: '', masked: sentence };
  const answer = candidates.sort((a, b) => b.length - a.length)[0];
  // Replace first occurrence with mask
  const letterCount = answer.replace(/[^A-Za-zÄÖÜäöüß]/g, '').length;
  const mask = `_${'_'.repeat(Math.max(letterCount - 1, 0))}`; // keep it readable
  const masked = sentence.replace(answer, mask);
  return { sentence, answer, masked };
};

const ExerciseFillBlank = ({ sentences = [], onComplete }) => {
  const items = useMemo(() => sentences.map((s) => selectBlankWord(s)), [sentences]);
  const [index, setIndex] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const current = items[index] || {};

  const onCheck = () => {
    const ans = (input || '').trim();
    const ok = ans.localeCompare(current.answer, undefined, { sensitivity: 'accent' }) === 0;
    setCorrect(ok);
    setChecked(true);
  };

  const onNext = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setInput('');
      setChecked(false);
      setCorrect(false);
    } else {
      onComplete && onComplete();
    }
  };

  const letterCount = (current.answer || '').replace(/[^A-Za-zÄÖÜäöüß]/g, '').length;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Exercise 2: Fill in the blank</Text>
      <Text style={styles.promptLabel}>German</Text>
      <Text style={styles.prompt}>{current.masked}</Text>
      <Text style={styles.hint}>
        Missing word length: {letterCount} {letterCount === 1 ? 'letter' : 'letters'}
      </Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder={`Type the missing word (${letterCount})`}
        autoCapitalize="none"
        autoCorrect={false}
      />

      {!checked ? (
        <TouchableOpacity onPress={onCheck} style={[styles.button, styles.primary]} disabled={!input}>
          <Text style={styles.buttonText}>Check</Text>
        </TouchableOpacity>
      ) : (
        <>
          <Text style={[styles.feedback, correct ? styles.correct : styles.incorrect]}>
            {correct ? 'Correct!' : `Answer: ${current.answer}`}
          </Text>
          <TouchableOpacity onPress={onNext} style={[styles.button, styles.primary]}>
            <Text style={styles.buttonText}>{index < items.length - 1 ? 'Next' : 'Finish'}</Text>
          </TouchableOpacity>
        </>
      )}
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
  promptLabel: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
  prompt: { color: COLORS.textPrimary, fontSize: 18, marginBottom: 8, fontFamily: 'serif' },
  hint: { color: COLORS.textSecondary, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 10,
    color: COLORS.textPrimary,
    marginBottom: 12,
  },
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
  feedback: { marginVertical: 8, fontFamily: 'serif' },
  correct: { color: '#3CB371', fontWeight: 'bold' },
  incorrect: { color: '#DC143C', fontStyle: 'italic' },
});

export default ExerciseFillBlank;
