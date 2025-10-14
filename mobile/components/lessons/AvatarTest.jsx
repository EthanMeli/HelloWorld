import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DiceBearAvatar from './DiceBearAvatar';
import COLORS from '../../constants/colors';

/**
 * Simple test component to verify DiceBear avatar functionality
 * This can be temporarily added to any page to test avatar rendering
 */
const AvatarTest = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Avatar Test</Text>
      
      <View style={styles.avatarRow}>
        <View style={styles.avatarItem}>
          <Text style={styles.label}>Ryan</Text>
          <DiceBearAvatar 
            seed="Ryan"
            flip={false}
            size={60}
          />
        </View>
        
        <View style={styles.avatarItem}>
          <Text style={styles.label}>Christian (Flipped)</Text>
          <DiceBearAvatar 
            seed="Christian"
            flip={true}
            size={60}
          />
        </View>
      </View>
      
      <View style={styles.avatarRow}>
        <View style={styles.avatarItem}>
          <Text style={styles.label}>Small (30px)</Text>
          <DiceBearAvatar 
            seed="TestUser"
            flip={false}
            size={30}
          />
        </View>
        
        <View style={styles.avatarItem}>
          <Text style={styles.label}>Large (80px)</Text>
          <DiceBearAvatar 
            seed="BigUser"
            flip={false}
            size={80}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.accent,
    marginBottom: 20,
    fontFamily: 'serif',
  },
  avatarRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  avatarItem: {
    alignItems: 'center',
  },
  label: {
    color: COLORS.textPrimary,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'serif',
  },
});

export default AvatarTest;