import { Stack } from "expo-router";
import COLORS from "../../../constants/colors";

export default function LessonsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: {
          fontWeight: '600',
          color: COLORS.textPrimary,
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