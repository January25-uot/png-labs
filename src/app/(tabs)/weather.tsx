
import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
  RefreshControl,
} from 'react-native';

const LOCATIONS = {
  Lae: { latitude: -6.73, longitude: 147.00 },
  'Port Moresby': { latitude: -9.44, longitude: 147.18 },
  'Mount Hagen': { latitude: -5.86, longitude: 144.23 },
};

type LocationName = keyof typeof LOCATIONS;

type ForecastDay = {
  date: string;
  max: number;
  min: number;
};

type WeatherData = {
  current: { temperature_2m: number };
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
  };
};

export default function WeatherScreen() {
  const [location, setLocation] = useState<LocationName>('Lae');
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');

  const loadWeather = useCallback(async () => {
    setError('');
    setLoading(data === null);
    setRefreshing(data !== null);

    try {
      const coords = LOCATIONS[location];
      const url =
        'https://api.open-meteo.com/v1/forecast' +
        `?latitude=${coords.latitude}` +
        `&longitude=${coords.longitude}` +
        '&current=temperature_2m' +
        '&daily=temperature_2m_max,temperature_2m_min' +
        '&forecast_days=7&timezone=auto';

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Weather request failed. Please try again.');
      }

      const json = await response.json();

      if (
        !json.current ||
        !Array.isArray(json.daily?.time) ||
        json.daily.time.length === 0
      ) {
        throw new Error('Weather data is unavailable.');
      }

      setData(json);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Could not load weather. Check your connection.'
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [location]);

  useEffect(() => {
    loadWeather();
  }, [loadWeather]);

  const forecast: ForecastDay[] = data
    ? data.daily.time.map((date, index) => ({
        date,
        max: data.daily.temperature_2m_max[index],
        min: data.daily.temperature_2m_min[index],
      }))
    : [];

  if (loading && !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1F3864" />
        <Text style={styles.message}>Loading weather...</Text>
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>Weather unavailable</Text>
        <Text style={styles.message}>{error}</Text>
        <Pressable style={styles.button} onPress={loadWeather}>
          <Text style={styles.buttonText}>Try again</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      contentContainerStyle={styles.content}
      data={forecast}
      keyExtractor={(item) => item.date}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={loadWeather}
        />
      }
      ListHeaderComponent={
        <View>
          <Text style={styles.title}>PNG Weather</Text>

          <View style={styles.locations}>
            {(Object.keys(LOCATIONS) as LocationName[]).map((name) => (
              <Pressable
                key={name}
                style={[
                  styles.locationButton,
                  location === name && styles.selectedLocation,
                ]}
                onPress={() => setLocation(name)}
              >
                <Text
                  style={[
                    styles.locationText,
                    location === name && styles.selectedText,
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            ))}
          </View>

          {error !== '' && (
            <View style={styles.errorBox}>
              <Text style={styles.errorTitle}>Update failed</Text>
              <Text>{error}</Text>
              <Pressable onPress={loadWeather}>
                <Text style={styles.retryText}>Try again</Text>
              </Pressable>
            </View>
          )}

          {data && (
            <View style={styles.currentCard}>
              <Text style={styles.currentLabel}>
                Current temperature in {location}
              </Text>
              <Text style={styles.temperature}>
                {data.current.temperature_2m} °C
              </Text>
            </View>
          )}

          <Text style={styles.subtitle}>7-day forecast</Text>
          <Text style={styles.updated}>
            Last successful update: {lastUpdated || 'Not available'}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.date}>
            {new Date(item.date + 'T12:00:00').toLocaleDateString(
              undefined,
              { weekday: 'short', day: 'numeric', month: 'short' }
            )}
          </Text>
          <Text style={styles.range}>
            High {item.max}°  ·  Low {item.min}°
          </Text>
        </View>
      )}
      ListEmptyComponent={
        <Text style={styles.message}>No forecast data available.</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  list: { flex: 1, backgroundColor: '#f0f2f5' },
  content: { padding: 16, paddingBottom: 32 },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F3864',
    marginBottom: 16,
  },
  locations: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  locationButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  selectedLocation: { backgroundColor: '#1F3864', borderColor: '#1F3864' },
  locationText: { color: '#1F3864', fontWeight: '600' },
  selectedText: { color: '#ffffff' },
  currentCard: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 20,
  },
  currentLabel: { fontSize: 16, color: '#555555' },
  temperature: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#1F3864',
    marginTop: 8,
  },
  subtitle: { fontSize: 21, fontWeight: 'bold', marginBottom: 6 },
  updated: { fontSize: 12, color: '#666666', marginBottom: 12 },
  row: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  date: { fontWeight: '600', color: '#1F3864' },
  range: { color: '#333333' },
  message: { color: '#555555', textAlign: 'center' },
  errorTitle: { color: '#b00020', fontSize: 20, fontWeight: 'bold' },
  errorBox: {
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 16,
    gap: 8,
  },
  retryText: { color: '#1F3864', fontWeight: 'bold', marginTop: 4 },
  button: {
    backgroundColor: '#1F3864',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: { color: '#ffffff', fontWeight: 'bold' },
});
