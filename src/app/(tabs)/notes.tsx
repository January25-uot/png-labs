
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import {
    loadNotes,
    saveNotes,
    type Note,
} from '../../storage/notesStorage';


const TOWNS = ['Port Moresby', 'Lae', 'Mount Hagen'];

export default function NotesScreen() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [permissionMessage, setPermissionMessage] = useState('');
  const [town, setTown] = useState('Port Moresby');
  const [coords, setCoords] = useState('');

  useEffect(() => {
    async function initialLoad() {
      try {
        const saved = await loadNotes();
        setNotes(saved);
          
      } catch {
        Alert.alert('Storage error', 'Could not load your saved notes.');
      } finally {
        setLoading(false);
      }
    }
    initialLoad();
  }, []);

  useEffect(() => {
    if (loading) return;
    saveNotes(notes).catch(() => {
      Alert.alert('Storage error', 'Could not save your notes.');
    });
  }, [notes, loading]);

  async function getPosition() {
    try {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setCoords('');
        setPermissionMessage(
          'Location permission was refused. Your note will still save, but it will not include GPS coordinates. You can choose a town instead.'
        );
        return '';
      }

      const position = await Location.getCurrentPositionAsync({});
      const result =
        `${position.coords.latitude.toFixed(5)}, ` +
        `${position.coords.longitude.toFixed(5)}`;

      setCoords(result);
      setPermissionMessage('');
      return result;
    } catch {
      setCoords('');
      setPermissionMessage(
        'Location could not be retrieved. You can still save notes and choose a town.'
      );
      return '';
    }
  }

  async function addNote() {
    const text = input.trim();
    if (!text) {
      Alert.alert('Empty note', 'Please enter a note first.');
      return;
    }

    const gps = await getPosition();

    setNotes((previous) => [
      {
        id: `${Date.now()}-${Math.random()}`,
        text,
        location: gps || town,
      },
      ...previous,
    ]);
    setInput('');
  }

  function deleteNote(id: string) {
    Alert.alert('Delete note?', 'This note will be removed.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () =>
          setNotes((previous) =>
            previous.filter((note) => note.id !== id)
          ),
      },
    ]);
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading saved notes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Notes</Text>

      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Write a short note..."
      />

      <Text style={styles.label}>Town if GPS is unavailable:</Text>
      <View style={styles.towns}>
        {TOWNS.map((item) => (
          <Pressable
            key={item}
            onPress={() => setTown(item)}
            style={[
              styles.townButton,
              town === item && styles.selectedTown,
            ]}
          >
            <Text
              style={town === item ? styles.selectedText : undefined}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      {permissionMessage !== '' && (
        <Text style={styles.warning}>{permissionMessage}</Text>
      )}

      <Pressable style={styles.addButton} onPress={addNote}>
        <Text style={styles.addText}>Add Note</Text>
      </Pressable>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.empty}>No notes yet. Add your first note.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.note}>
            <View style={styles.noteContent}>
              <Text style={styles.noteText}>{item.text}</Text>
              <Text style={styles.location}>
                Location: {item.location || 'Not available'}
              </Text>
            </View>
            <Pressable onPress={() => deleteNote(item.id)}>
              <Text style={styles.delete}>Delete</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f0f2f5' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1F3864', marginBottom: 16 },
  input: { backgroundColor: '#ffffff', borderWidth: 1, borderColor: '#cccccc', borderRadius: 8, padding: 12, marginBottom: 12 },
  label: { marginBottom: 8, color: '#444444' },
  towns: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  townButton: { backgroundColor: '#ffffff', padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#cccccc' },
  selectedTown: { backgroundColor: '#1F3864' },
  selectedText: { color: '#ffffff' },
  warning: { color: '#9a5700', marginBottom: 12 },
  addButton: { backgroundColor: '#1F3864', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 16 },
  addText: { color: '#ffffff', fontWeight: 'bold' },
  note: { backgroundColor: '#ffffff', padding: 14, borderRadius: 8, marginBottom: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8 },
  noteContent: { flex: 1 },
  noteText: { fontSize: 16, fontWeight: '600' },
  location: { fontSize: 12, color: '#666666', marginTop: 5 },
  delete: { color: '#b00020', fontWeight: 'bold' },
  empty: { textAlign: 'center', padding: 24, color: '#666666' },
});
