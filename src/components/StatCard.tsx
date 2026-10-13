import { StyleSheet, Text, View } from 'react-native';

type StatCardProps = {
  label: string;
  value: number;
};

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#e8eef7',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    margin: 5,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  label: {
    color: '#555555',
  },
});