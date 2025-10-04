import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { JSX, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { lessons } from '../../../data/lessons.js'
import styles from '../../../assets/styles/lesson.styles';
// @ts-ignore - JSX file without types
import TappableText from '../../../components/lessons/TappableText';
// @ts-ignore - JSX file without types
import GrammarTipButton from '../../../components/lessons/GrammarTipButton';
// @ts-ignore - JSX file without types
import GrammarModal from '../../../components/lessons/GrammarModal';
// @ts-ignore - JSX file without types
import DiceBearAvatar from '../../../components/lessons/DiceBearAvatar';

// Define interfaces for better type safety
interface GrammarTip {
  id: number;
  title: string;
  content: string;
}

const LessonDetail = () => {
  // State for managing the grammar modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTips, setCurrentTips] = useState<GrammarTip[]>([]);
  const [currentTipSource, setCurrentTipSource] = useState<string>('');
  const [completedTipSources, setCompletedTipSources] = useState<string[]>([]);
  
  // Get the id parameter from the route
  const { id } = useLocalSearchParams();

  // Convert id to number and find the matching lesson
  const lessonId = parseInt(id as string);
  const lesson = lessons.find(lesson => lesson.id === lessonId);

  // Handle case where lessons is not found
  if (!lesson) {
    return (
      <View style={styles.container}>
        <Text style={styles.lessonTitle}>Lesson not found</Text>
      </View>
    );
  }

  // Handle displaying multiple dialogues and speakers
  const renderDialogueBox = (dialogue: any, index: number): JSX.Element => {
    const isLeftSide = dialogue.isSpeaker1;
    const hasTips = dialogue.grammarTips && dialogue.grammarTips.length > 0;

    // Create a unique source ID for this dialogue
    const dialogueSourceId = `dialogue-${index}`;
    
    // Handle opening grammar tips modal
    const handleGrammarTipPress = () => {
      setCurrentTips(dialogue.grammarTips);
      setCurrentTipSource(dialogueSourceId);
      setModalVisible(true);
    };
    
    // Check if this specific dialogue's tips have been completed
    const isTipCompleted = completedTipSources.includes(dialogueSourceId);

    return (
      <View
        key={index}
        style={[
          styles.messageContainer,
          isLeftSide ? styles.leftMessage : styles.rightMessage
        ]}
      >
        <View style={[
          customStyles.speakerContainer,
          isLeftSide ? customStyles.speakerContainerLeft : customStyles.speakerContainerRight
        ]}>
          {isLeftSide ? (
            <>
              <DiceBearAvatar 
                seed="Ryan"
                flip={false}
                size={30}
                style={{marginRight: 8}}
              />
              <Text style={styles.speakerName}>{dialogue.speaker}</Text>
            </>
          ) : (
            <>
              <Text style={styles.speakerName}>{dialogue.speaker}</Text>
              <DiceBearAvatar 
                seed="Christian"
                flip={true}
                size={30}
                style={{marginLeft: 8}}
              />
            </>
          )}
        </View>
        <View style={[
          styles.messageBubble,
          isLeftSide ? styles.leftBubble : styles.rightBubble
        ]}>
          <TappableText 
            text={dialogue.text}
            translations={dialogue.translations}
            vocabularyMap={dialogue.vocabularyMap}
            dialogueEntry={dialogue}
            isLeftSide={isLeftSide}
            textStyle={styles.messageText}
          />
          <Text style={isLeftSide ? styles.leftTranslationText : styles.rightTranslationText}>
            {dialogue.translationText}
          </Text>
          
          {/* Grammar Tip Button */}
          {hasTips && !isTipCompleted && (
            <GrammarTipButton
              onPress={handleGrammarTipPress}
              count={dialogue.grammarTips.length}
              style={isLeftSide ? { alignSelf: 'flex-start' } : { alignSelf: 'flex-end' }}
            />
          )}
        </View>
      </View>
    )
  }

  // Create a unique source ID for the lesson title
  const lessonTitleSourceId = `lesson-title-${lessonId}`;

  // Handle opening lesson title grammar tips
  const handleLessonTipPress = () => {
    if (lesson.grammarTips && lesson.grammarTips.length > 0) {
      setCurrentTips(lesson.grammarTips);
      setCurrentTipSource(lessonTitleSourceId);
      setModalVisible(true);
    }
  };
  
  // Handle completed tips - now just stores the source ID
  const handleTipsComplete = () => {
    // Only add the current tip source to completed sources
    if (currentTipSource) {
      setCompletedTipSources(prev => [...prev, currentTipSource]);
    }
  };
  
  // Check if lesson title tips are completed
  const isLessonTipCompleted = completedTipSources.includes(lessonTitleSourceId);

  return (
    <View style={styles.container}>
      <View style={customStyles.titleContainer}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        
        {/* Grammar Tip Button for lesson title */}
        {lesson.grammarTips && lesson.grammarTips.length > 0 && !isLessonTipCompleted && (
          <GrammarTipButton
            onPress={handleLessonTipPress}
            count={lesson.grammarTips.length}
            style={{ marginLeft: 15, marginBottom: 15 }}
          />
        )}
      </View>
      
      <ScrollView style={styles.chatContainer}>
        {lesson.dialogue.map((dialogue, index) =>
          renderDialogueBox(dialogue, index)
        )}
      </ScrollView>
      
      {/* Grammar Tips Modal */}
      <GrammarModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)} 
        tips={currentTips}
        onComplete={handleTipsComplete}
      />
    </View>
  )
}

// Custom styles for this component
const customStyles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Changed to center
    marginBottom: 15,
  },
  speakerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  speakerContainerLeft: {
    justifyContent: 'flex-start',
  },
  speakerContainerRight: {
    justifyContent: 'flex-end',
  }
});

export default LessonDetail;