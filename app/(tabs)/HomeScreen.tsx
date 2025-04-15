import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  Home: undefined;
  Articles: undefined;
  Results: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContent}>
        <View style={styles.topImages}>
          <Image source={require('../../assets/images/jaguar.png')} style={styles.logo} />
          <Image source={require('../../assets/images/cscsc.png')} style={styles.logo} />
        </View>

        <Text style={styles.title}>Hockey 2026 : Suivez nos Jaguars</Text>
        <Text style={styles.subtitle}>Suivez l'actualité et les résultats de notre équipe!!!</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#2c3e5f' }]}
            onPress={() => navigation.navigate('Articles')}
          >
            <Text style={styles.buttonText}>Articles</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#003184' }]}
            onPress={() => navigation.navigate('Results')}
          >
            <Text style={styles.buttonText}>Résultats</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonContainer, { marginBottom: 5 }]}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: '#e55d20' }]}
          >
            <Text style={styles.buttonText}>Notre équipe</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#c9c8c7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topImages: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  logo: {
    width: 140,
    height: 140,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: '#003184',
    marginBottom: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    fontFamily: 'Cochin',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fd6a25',
    marginBottom: 20,
    textAlign: 'center',
    fontStyle: 'italic',
    letterSpacing: 1,
    textTransform: 'capitalize',
    textShadowColor: '#fd6a25',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default HomeScreen;
