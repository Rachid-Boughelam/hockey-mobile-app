import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './HomeScreen';
import ArticleScreen from './ArticleScreen';
import ResultScreen from './ResultScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
  name="Home" 
  component={HomeScreen} 
  options={{ 
    title: 'Accueil',
    headerLeft: () => null 
  }}  
/>
      <Stack.Screen 
        name="Articles" 
        component={ArticleScreen} 
        options={{ title: 'Articles' }}  
      />
      <Stack.Screen 
        name="Results" 
        component={ResultScreen} 
        options={{ title: 'Résultats' }}  
      />
    </Stack.Navigator>
  );
}

export default function Layout() {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Root" 
        component={HomeStack}
        options={{
          tabBarLabel: 'Accueil',
          headerShown: false
        }} 
      />
    </Tab.Navigator>
  );
}
