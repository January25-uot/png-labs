import { StyleSheet, Text, View } from 'react-native';

export default function LayoutLab() {
  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerText}>My Dashboard</Text>
        <Text style={styles.headerText}>Menu</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.number}>120</Text>
          <Text style={styles.caption}>Students</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.number}>8</Text>
          <Text style={styles.caption}>Courses</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.number}>95%</Text>
          <Text style={styles.caption}>Progress</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text>Dashboard content</Text>
      </View>

      <View style={styles.floatingButton}>
        <Text style={styles.buttonText}>+</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F3864',
    padding: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  number: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 12,
    color: '#777777',
  },
  divider: {
    width: 1,
    backgroundColor: '#cccccc',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1F3864',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 28,
  },
});