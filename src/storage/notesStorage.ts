
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'notes';

export type Note = {
  id: string;
  text: string;
  location: string;
};

export async function saveNotes(notes: Note[]) {
  await AsyncStorage.setItem(KEY, JSON.stringify(notes));
}

export async function loadNotes(): Promise<Note[]> {
  const raw = await AsyncStorage.getItem(KEY);
  return raw ? JSON.parse(raw) as Note[] : [];
}
