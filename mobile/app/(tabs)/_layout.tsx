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
        tabBarActiveTintColor: COLORS.primary,
        headerTitleStyle: {
          color: COLORS.textPrimary,
          fontWeight: "600"
        },
        headerShadowVisible: false,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopWidth: 1,
          borderTopColor: COLORS.border,
          paddingTop: 5,
          paddingBottom: insets.bottom,
          height: 60 + insets.bottom,
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