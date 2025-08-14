import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      {/* "book-outline" */}
      <Tabs.Screen
        name='index'
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name='home-outline' color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name='active'
        options={{
          title: "Active",
          tabBarIcon: ({ color }) => (
            <Ionicons name='book-outline' color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name='history'
        options={{
          title: "History",
          tabBarIcon: ({ color }) => (
            <Entypo name='back-in-time' color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name='stories'
        options={{
          title: "New Story",
          tabBarIcon: ({ color }) => (
            <Feather name='book' color={color} size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name='chats'
        options={{
          title: "Chats",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='chat-outline'
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='friends'
        options={{
          title: "Friends",
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name='users' color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
//
