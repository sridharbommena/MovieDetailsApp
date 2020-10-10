import { StatusBar } from 'expo-status-bar';
import React , { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import StackNavigator from './screens/StackNavigator';
import MoviesScreen from "./MoviesScreen";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import HomeStackNavigator from './HomeStackNavigator';


const Tab = createMaterialBottomTabNavigator();

const App = () =>
{

  return(
    <NavigationContainer>
      <Tab.Navigator
      keyboardHidesNavigationBar={true}
      backBehavior="initialRoute"
      shifting={true}
      >
        <Tab.Screen name="Movies" component={HomeStackNavigator}
         options={{
          tabBarLabel : "Movies" ,
          tabBarColor : "#37474F",
          tabBarIcon : ({color})=>(<MaterialIcons name="movie" size={25} color="white" />),
          
        }}
        />
        <Tab.Screen name="Search" component={StackNavigator} 
        
         options={{
          tabBarLabel : "Search" ,
          tabBarColor : "#004D40",
          tabBarIcon : ({color})=>(<FontAwesome name="search" size={25} color="white" /> 
          ),
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;