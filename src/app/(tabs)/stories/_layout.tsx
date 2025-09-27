import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { withLayoutContext } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator);

export default function StoriesLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#25292e' }}>
      <TopTabs
        screenOptions={{
          tabBarActiveTintColor: '#ffd33d',
          tabBarInactiveTintColor: '#909296',
          tabBarStyle: {
            backgroundColor: '#25292e',
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#ffd33d',
          },
        }}
      >
        <TopTabs.Screen name="index" options={{ title: 'New Story' }} />
        <TopTabs.Screen name="active" options={{ title: 'Active' }} />
        <TopTabs.Screen name="history" options={{ title: 'History' }} />
      </TopTabs>
    </SafeAreaView>
  );
}
