import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/colors';

/**
 * ProgressCard Component
 * 
 * Displays a horizontal progress card with title, progress bar, and fraction
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Card title (e.g., "Lessons Completed")
 * @param {number} props.current - Current progress value
 * @param {number} props.total - Total/goal value
 * @param {string} props.icon - Optional icon name
 */
const ProgressCard = ({ title, current, total, icon }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;
  
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {icon && <Text style={styles.icon}>{icon}</Text>}
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${Math.min(percentage, 100)}%` }
            ]} 
          />
        </View>
      </View>
      
      <Text style={styles.fraction}>
        {current}/{total}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    flex: 1,
  },
  icon: {
    fontSize: 20,
    marginLeft: 8,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: COLORS.background,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.primary,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  fraction: {
    fontSize: 14,
    color: COLORS.textSecondary,
    fontFamily: 'serif',
    textAlign: 'right',
    fontWeight: '600',
  },
});

export default ProgressCard;