import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from './HomeScreen';
import MovieDetails from "./MovieDetails";

const Stack = createStackNavigator();

const StackNavigator = () =>
{

  return(
      <Stack.Navigator
      headerMode="none"
      >
        <Stack.Screen name="SearchHome" component={HomeScreen} />
        <Stack.Screen name="SearchDetails" component={MovieDetails} />
      </Stack.Navigator>

  );
}

export default StackNavigator;