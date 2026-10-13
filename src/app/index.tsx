import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ProvinceRow from '../components/ProvinceRow';
import { PROVINCES } from '../data/provinces';

export default function ProvinceList() {
  const [search, setSearch] = useState('');

  const filteredProvinces = PROVINCES.filter((province) =>
    province.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <FlatList
      style={styles.list}
      data={filteredProvinces}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>Papua New Guinea Provinces</Text>
          <Text style={styles.subtitle}>
            {filteredProvinces.length} provinces found
          </Text>
          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setSearch}
            placeholder="Search provinces..."
            autoCapitalize="none"
          />
        </View>
      }
      ListEmptyComponent={
        <Text style={styles.empty}>
          {PROVINCES.length === 0
            ? 'No provinces available.'
            : 'No provinces match your search.'}
        </Text>
      }
      renderItem={({ item }) => <ProvinceRow province={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F3864',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 6,
    marginBottom: 12,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#dddddd',
  },
  empty: {
    textAlign: 'center',
    padding: 24,
    color: '#777777',
  },
});