import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function TipCalculator() {
  const [bill, setBill] = useState('');
  const [tipPercent, setTipPercent] = useState(10);
  const [people, setPeople] = useState(1);

  const amount = parseFloat(bill);
  const validBill = bill.trim() !== '' && Number.isFinite(amount) && amount >= 0;

  const tip = validBill ? amount * tipPercent / 100 : 0;
  const total = validBill ? amount + tip : 0;
  const perPerson = total / people;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tip Calculator</Text>

      <Text style={styles.label}>Bill amount (K)</Text>
      <TextInput
        style={styles.input}
        value={bill}
        onChangeText={setBill}
        keyboardType="numeric"
        placeholder="Enter bill amount"
      />

      <Text style={styles.label}>Choose tip percentage</Text>
      <View style={styles.row}>
        {[5, 10, 15].map((percent) => (
          <Pressable
            key={percent}
            style={[
              styles.tipButton,
              tipPercent === percent && styles.selected,
            ]}
            onPress={() => setTipPercent(percent)}
          >
            <Text
              style={[
                styles.buttonText,
                tipPercent === percent && styles.selectedText,
              ]}
            >
              {percent}%
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Number of people</Text>
      <View style={styles.row}>
        <Pressable
          style={styles.peopleButton}
          onPress={() => setPeople(Math.max(1, people - 1))}
        >
          <Text style={styles.buttonText}>−</Text>
        </Pressable>

        <Text style={styles.peopleCount}>{people}</Text>

        <Pressable
          style={styles.peopleButton}
          onPress={() => setPeople(people + 1)}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      {validBill && (
        <View style={styles.results}>
          <Text style={styles.resultTitle}>Results</Text>
          <Text>Tip: K{tip.toFixed(2)}</Text>
          <Text>Total bill: K{total.toFixed(2)}</Text>
          <Text style={styles.perPerson}>
            Each person pays: K{perPerson.toFixed(2)}
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F3864',
    textAlign: 'center',
    marginBottom: 28,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 14,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginTop: 8,
  },
  tipButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1F3864',
  },
  selected: {
    backgroundColor: '#1F3864',
  },
  buttonText: {
    color: '#1F3864',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#ffffff',
  },
  peopleButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#1F3864',
  },
  peopleCount: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 40,
    textAlign: 'center',
  },
  results: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginTop: 28,
    gap: 12,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  perPerson: {
    fontWeight: 'bold',
    fontSize: 17,
  },
});