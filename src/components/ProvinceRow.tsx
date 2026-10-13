import { StyleSheet, Text, View } from 'react-native';
import type { Province } from '../data/provinces';

type Props = {
  province: Province;
};

export default function ProvinceRow({ province }: Props) {
  return (
    <View style={styles.row}>
      <View>
        <Text style={styles.name}>{province.name}</Text>
        <Text style={styles.region}>{province.region} Region</Text>
      </View>
      <Text style={styles.capital}>{province.capital}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F3864',
  },
  region: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  capital: {
    fontSize: 14,
    color: '#333333',
  },
});