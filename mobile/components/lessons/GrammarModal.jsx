import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, FlatList } from 'react-native';
import COLORS from '../../constants/colors';

/**
 * GrammarModal Component - Medieval RPG Style
 * 
 * This component displays a modal with grammar tips in a medieval RPG style.
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
        onPress={understood ? handleClose : undefined}
      >
        <View style={styles.modalContent}>
          {/* Header with elegant border */}
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
          
          {/* Content with medieval styling */}
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
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.accent,
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.accent,
  },
  modalTitle: {
    color: COLORS.accent,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  borderLine: {
    height: 1,
    backgroundColor: COLORS.accent,
    marginHorizontal: 0,
    opacity: 0.3,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.accent,
  },
  closeButtonText: {
    color: COLORS.white,
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
    borderRadius: 8,
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
    fontFamily: 'serif',
    letterSpacing: 0.5,
  },
  tipContent: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.textPrimary,
    fontFamily: 'serif',
    letterSpacing: 0.3,
  },
  confirmationContainer: {
    padding: 15,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.accent,
    backgroundColor: COLORS.cardBackground,
  },
  confirmButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.primary,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  confirmButtonText: {
    color: COLORS.background,
    fontFamily: 'serif',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  }
});

export default GrammarModal;