import { View, Text } from 'react-native'
import React from 'react'
import LessonCard from '../../../components/lessons/LessonCard'
import styles from "../../../assets/styles/lesson.styles";

const index = () => {
  return (
    <View style={styles.container}>
      <LessonCard />
    </View>
  )
}

export default index