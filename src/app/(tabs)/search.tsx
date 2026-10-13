
import { StyleSheet, Text, View } from 'react-native';


export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Provinces</Text>

      <Text style={styles.description}>
        Search for a province by name using the search
        box on the Provinces tab.
      </Text>

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
  },
});
