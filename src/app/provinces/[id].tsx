
import { Stack, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import { PROVINCES } from '../../data/provinces';

export default function ProvinceDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const province = PROVINCES.find((p) => p.id === id);

  if (!province) {
    return <Text>Province not found.</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: province.name }} />
      <Text style={styles.name}>{province.name}</Text>
      <Text>Capital: {province.capital}</Text>
      <Text>Region: {province.region}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
