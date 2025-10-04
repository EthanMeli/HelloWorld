import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.accent, // Changed from primary (green) to accent (yellow)
        headerTitleStyle: {
          color: COLORS.accent,
          fontWeight: "600",
          fontFamily: "monospace",
          letterSpacing: 1,
          textTransform: "uppercase"
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 3, // Thicker border for pixelated look
          borderTopColor: COLORS.accent,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
          // Add pixel shadow
          shadowColor: COLORS.accent,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.6,
          shadowRadius: 0,
          elevation: 8,
        }
      }}
    >
      <Tabs.Screen name="index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (<Ionicons name="person-outline" size={size} color={color} />)
        }}
      />
      <Tabs.Screen name="lessons"
        options={{
          title: "Lessons",
          tabBarIcon: ({ color, size }) => (<Ionicons name="earth-outline" size={size} color={color} />)
        }}
      />
      <Tabs.Screen name="flashcards"
        options={{
          title: "Flashcards",
          tabBarIcon: ({ color, size }) => (<Ionicons name="albums-outline" size={size} color={color} />)
        }}
      />
    </Tabs>
  )
}