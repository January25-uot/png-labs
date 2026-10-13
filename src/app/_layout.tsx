
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#1F3864' },
        headerTintColor: '#ffffff',
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="provinces/[id]"
        options={{ title: 'Province Details' }}
      />
    </Stack>
  );
}
