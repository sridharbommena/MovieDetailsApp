import React , { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import HomeMovieDetails from './HomeMovieDetails';
import MovieScreen from "./MoviesScreen";

const Stack = createStackNavigator();

const HomeStackNavigator = () =>
{

  return(
      <Stack.Navigator
      headerMode="none"
      >
        <Stack.Screen name="MoviesDetails" component={MovieScreen} />
        <Stack.Screen name="MoviesHome" component={HomeMovieDetails} />
      </Stack.Navigator>

  );
}

export default HomeStackNavigator;