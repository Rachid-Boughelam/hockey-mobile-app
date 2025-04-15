import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, StatusBar, Image } from 'react-native';
import axios from 'axios';
import { Config } from '../Config';

type Article = {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
};

export default function ArticleScreen() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(`${Config.API_BASE_URL}/article`);
        setArticles(response.data);
      } catch (err: any) {
        console.error('Erreur lors de la récupération des articles :', err.message);
        setError("Impossible de charger les articles. Vérifie ta connexion ou l'adresse du serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Chargement des articles...</Text>
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
        data={articles.slice().reverse()}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.image ? (
              <Image source={{ uri: item.image }} style={styles.articleImage} />
            ) : null}
            <Text style={styles.articleTitle}>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.date}>{item.date}</Text>
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
  articleTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
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
  date: {
    fontStyle: 'italic',
    marginTop: 8,
    fontSize: 12,
    color: '#666',
  },
  articleImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
  },
});
