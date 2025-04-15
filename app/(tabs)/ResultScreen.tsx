import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { Config } from '../Config';
type Match = {
  id: number;
  teamA: string;
  teamB: string;
  score: string;
  winner: string;
};

export default function ResultScreen() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get(`${Config.API_BASE_URL}/result`);
        setMatches(response.data);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des matchs :', err.message);
        setError("Impossible de charger les résultats. Vérifie ta connexion ou l'adresse du serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement des résultats...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <FlatList
        contentContainerStyle={styles.list}
        data={matches.reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.matchTitle}>{item.teamA} vs {item.teamB}</Text>
            <Text style={styles.matchInfo}>Score : {item.score}</Text>
            <Text style={styles.winner}>Vainqueur : {item.winner}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: 'black',
  },
  list: {
    paddingBottom: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  matchTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
    color: '#000',
  },
  matchInfo: {
    fontSize: 14,
    color: '#333',
  },
  winner: {
    fontStyle: 'italic',
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  card: {
    padding: 16,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
