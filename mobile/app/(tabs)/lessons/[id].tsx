import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import React, { JSX, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { lessons } from '../../../data/lessons.js'
import styles from '../../../assets/styles/lesson.styles';
import COLORS from '../../../constants/colors';
// @ts-ignore - JSX file without types
import TappableText from '../../../components/lessons/TappableText';
// @ts-ignore - JSX file without types
import GrammarTipButton from '../../../components/lessons/GrammarTipButton';
// @ts-ignore - JSX file without types
import GrammarModal from '../../../components/lessons/GrammarModal';
// @ts-ignore - JSX file without types
import DiceBearAvatar from '../../../components/lessons/DiceBearAvatar';

const LessonDetail = () => {
  // State for managing the grammar modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTips, setCurrentTips] = useState<any[]>([]);
  const [completedTips, setCompletedTips] = useState<number[]>([]);
  
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

    // Handle opening grammar tips modal
    const handleGrammarTipPress = () => {
      setCurrentTips(dialogue.grammarTips);
      setModalVisible(true);
    };
    
    // Check if this tip has been completed
    const isTipCompleted = dialogue.grammarTips && 
      dialogue.grammarTips.length > 0 && 
      dialogue.grammarTips.every(tip => completedTips.includes(tip.id));

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

  // Handle opening lesson title grammar tips
  const handleLessonTipPress = () => {
    if (lesson.grammarTips && lesson.grammarTips.length > 0) {
      setCurrentTips(lesson.grammarTips);
      setModalVisible(true);
    }
  };
  
  // Handle completed tips
  const handleTipsComplete = (tipIds: number[]) => {
    setCompletedTips(prev => [...prev, ...tipIds]);
  };
  
  // Check if lesson title tips are completed
  const isLessonTipCompleted = lesson.grammarTips && 
    lesson.grammarTips.length > 0 && 
    lesson.grammarTips.every((tip: any) => completedTips.includes(tip.id));

  return (
    <View style={styles.container}>
      <View style={customStyles.titleContainer}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        
        {/* Grammar Tip Button for lesson title */}
        {lesson.grammarTips && lesson.grammarTips.length > 0 && !isLessonTipCompleted && (
          <GrammarTipButton
            onPress={handleLessonTipPress}
            count={lesson.grammarTips.length}
            style={{ marginLeft: 10 }}
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
    justifyContent: 'flex-start',
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