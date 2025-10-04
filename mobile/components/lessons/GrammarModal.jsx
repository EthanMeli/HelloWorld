import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList, Animated } from 'react-native';
import COLORS from '../../constants/colors';
import { pixelText, pixelBorders, pixelButtons } from '../../constants/retroStyles';

/**
 * GrammarModal Component - Retro 8-bit Style
 * 
 * This component displays a modal with grammar tips in a retro 8-bit style.
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.visible - Whether the modal is visible
 * @param {Function} props.onClose - Function to close the modal
 * @param {Array} props.tips - Array of grammar tips to display
 * @param {Function} props.onComplete - Function to call when user completes reading tips
 */
const GrammarModal = ({ visible, onClose, tips = [], onComplete }) => {
  const [understood, setUnderstood] = useState(false);
  
  // Handle user confirming they understood the tips
  const handleUnderstood = () => {
    setUnderstood(true);
    
    // If there's an onComplete callback, call it with no parameters
    if (onComplete) {
      onComplete();
    }
  };
  
  // Reset the understood state when modal closes
  const handleClose = () => {
    onClose();
    setUnderstood(false);
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        // Only allow closing by tapping outside if user has understood
        onPress={understood ? handleClose : undefined}
      >
        <View style={styles.modalContent}>
          {/* Header with pixelated border */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {tips.length > 1 ? "GRAMMAR TIPS" : "GRAMMAR TIP"}
            </Text>
            {understood && (
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Border line to separate header from content */}
          <View style={styles.borderLine} />
          
          {/* Content with pixelated styling */}
          <FlatList
            data={tips}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.tipContainer}>
                <Text style={styles.tipTitle}>{item.title}</Text>
                <View style={styles.divider} />
                <Text style={styles.tipContent}>{item.content}</Text>
              </View>
            )}
            contentContainerStyle={styles.tipsList}
          />
          
          {/* Confirmation button to mark as understood */}
          {!understood && (
            <View style={styles.confirmationContainer}>
              <TouchableOpacity 
                style={styles.confirmButton} 
                onPress={handleUnderstood}
              >
                <Text style={styles.confirmButtonText}>I UNDERSTAND</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: COLORS.background,
    // No border radius for pixel art aesthetic
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: COLORS.primary,
    // Pixel shadow effect
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },
  modalTitle: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'monospace',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  borderLine: {
    height: 2,
    backgroundColor: COLORS.accent,
    marginHorizontal: 0,
  },
  closeButton: {
    width: 30,
    height: 30,
    // No border radius for pixel art aesthetic
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: COLORS.textDark,
  },
  closeButtonText: {
    color: COLORS.background,
    fontSize: 20,
    fontWeight: 'bold',
  },
  tipsList: {
    padding: 15,
  },
  tipContainer: {
    marginBottom: 20,
    paddingBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.primary,
    padding: 10,
    backgroundColor: COLORS.cardBackground,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.primary,
    marginVertical: 8,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: COLORS.primary,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textPrimary,
    fontFamily: 'monospace',
    letterSpacing: 0.5,
  },
  confirmationContainer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 3,
    borderTopColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
  },
  confirmButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 2,
    borderTopColor: '#FFFFAA', // Lighter yellow
    borderLeftColor: '#FFFFAA', // Lighter yellow
    borderRightColor: '#888800', // Darker yellow
    borderBottomColor: '#888800', // Darker yellow
  },
  confirmButtonText: {
    color: COLORS.background,
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 1,
  }
});

export default GrammarModal;
