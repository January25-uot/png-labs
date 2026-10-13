
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: '#1F3864' },
        headerTintColor: '#ffffff',
        tabBarActiveTintColor: '#1F3864',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Provinces',
          tabBarLabel: 'Provinces',
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarLabel: 'Search',
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: 'About',
          tabBarLabel: 'About',
        }}
      />

      <Tabs.Screen
  name="register"
  options={{
    title: 'Register',
    tabBarLabel: 'Register',
  }}
/>

<Tabs.Screen
  name="weather"
  options={{
    title: 'Weather',
    tabBarLabel: 'Weather',
  }}
/>
    </Tabs>
  );
}
