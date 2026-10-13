import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.statusStrip} />

        <Image
          source={{ uri: 'https://picsum.photos/200' }}
          style={styles.avatar}
        />

        <Text style={styles.name}>January Maipson</Text>
        <Text style={styles.studentNumber}>Student No: 24704330</Text>
        <Text style={styles.programme}>Bachelor of Business in IT — Year 3</Text>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={() =>
            Alert.alert('Student Verification', '24704330')
          }
        >
          <Text style={styles.buttonText}>Verify</Text>
        </Pressable>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Faculty: Business</Text>
          <Text style={styles.footerText}>Campus: Unitech</Text>
          <Text style={styles.footerText}>Status: Active</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    padding: 16,
  },
  card: {
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  statusStrip: {
    height: 8,
    backgroundColor: '#1F3864',
    width: '100%',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  studentNumber: {
    fontSize: 14,
    color: '#777777',
    marginBottom: 8,
  },
  programme: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#1F3864',
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonPressed: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  footerText: {
    fontSize: 10,
    color: '#555555',
  },
});