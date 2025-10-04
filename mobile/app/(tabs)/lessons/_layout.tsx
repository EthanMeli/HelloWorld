import { Stack } from "expo-router";
import COLORS from "../../../constants/colors";

export default function LessonsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.accent, // Changed to yellow
        headerTitleStyle: {
          fontWeight: '700',
          color: COLORS.accent, // Changed to yellow
          fontFamily: "monospace",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{ 
          title: "Your Lesson Plan",
        }} 
      />
      <Stack.Screen 
        name="[id]" 
        options={{ 
          title: "Lesson",
        }} 
      />
    </Stack>
  );
}