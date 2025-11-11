import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

// Utility: split sentence into tokens (words and punctuation) and normalize spaces
const tokenize = (str = '') =>
  str
    .replace(/[\n\r]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .filter(Boolean);

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const ExerciseTranslation = ({ items = [], onComplete }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);

  const current = items[index] || {};
  const targetTokens = useMemo(() => tokenize(current.english || ''), [current.english]);
  const bank = useMemo(() => shuffle(targetTokens), [targetTokens]);

  const onWordPress = (word, i) => {
    if (checked) return;
    setSelected((prev) => [...prev, { word, i }]);
  };

  const onUndo = () => {
    if (checked) return;
    setSelected((prev) => prev.slice(0, -1));
  };

  const onCheck = () => {
    const user = selected.map((s) => s.word).join(' ').trim();
    const target = targetTokens.join(' ');
    const isCorrect = user.toLowerCase() === target.toLowerCase();
    setCorrect(isCorrect);
    setChecked(true);
  };

  const onNext = () => {
    if (index < items.length - 1) {
      setIndex(index + 1);
      setSelected([]);
      setChecked(false);
      setCorrect(false);
    } else {
      onComplete && onComplete();
    }
  };

  // Render
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Exercise 1: Translate using word bank</Text>
      <Text style={styles.promptLabel}>German</Text>
      <Text style={styles.prompt}>
        {current.german}
      </Text>

      <Text style={styles.subLabel}>Build the English sentence</Text>

      <View style={styles.answerArea}>
        {selected.length === 0 ? (
          <Text style={styles.placeholder}>Tap words below to build your answer…</Text>
        ) : (
          <Text style={styles.answerText}>{selected.map((s) => s.word).join(' ')}</Text>
        )}
      </View>

      <View style={styles.bank}>
        {bank.map((word, i) => {
          const usedCount = selected.filter((s) => s.word === word).length;
          const totalCount = targetTokens.filter((t) => t === word).length;
          const disabled = usedCount >= totalCount || checked;
          return (
            <TouchableOpacity
              key={`${word}-${i}`}
              onPress={() => onWordPress(word, i)}
              disabled={disabled}
              style={[styles.bankChip, disabled && styles.bankChipDisabled]}
            >
              <Text style={styles.bankText}>{word}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.actions}>
        {!checked ? (
          <>
            <TouchableOpacity onPress={onUndo} style={[styles.button, styles.secondary]} disabled={selected.length === 0}>
              <Text style={styles.buttonText}>Undo</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCheck} style={[styles.button, styles.primary]} disabled={selected.length === 0}>
              <Text style={styles.buttonText}>Check</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={[styles.feedback, correct ? styles.correct : styles.incorrect]}>
              {correct ? 'Correct!' : `Not quite. Target: ${targetTokens.join(' ')}`}
            </Text>
            <TouchableOpacity onPress={onNext} style={[styles.button, styles.primary]}>
              <Text style={styles.buttonText}>{index < items.length - 1 ? 'Next' : 'Finish'}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  heading: {
    color: COLORS.accent,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    fontFamily: 'serif',
  },
  promptLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 4,
  },
  prompt: {
    color: COLORS.textPrimary,
    fontSize: 18,
    marginBottom: 12,
    fontFamily: 'serif',
  },
  subLabel: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginBottom: 6,
  },
  answerArea: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: COLORS.accent,
    borderRadius: 8,
    padding: 8,
    backgroundColor: COLORS.cardBackground,
    marginBottom: 12,
    justifyContent: 'center',
  },
  placeholder: {
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  answerText: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  bank: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  bankChip: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.primary,
    marginRight: 8,
    marginBottom: 8,
  },
  bankChipDisabled: {
    opacity: 0.4,
  },
  bankText: {
    color: COLORS.textPrimary,
    fontFamily: 'serif',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
  },
  primary: {
    backgroundColor: COLORS.accent,
  },
  secondary: {
    backgroundColor: COLORS.background,
  },
  buttonText: {
    color: COLORS.background,
    fontWeight: 'bold',
  },
  feedback: {
    flex: 1,
    fontFamily: 'serif',
  },
  correct: { color: '#3CB371', fontWeight: 'bold' },
  incorrect: { color: '#DC143C', fontStyle: 'italic' },
});

export default ExerciseTranslation;
