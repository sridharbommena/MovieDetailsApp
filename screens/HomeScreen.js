import React , { useState } from 'react';
import { KeyboardAvoidingView,  StatusBar, StyleSheet, Text, View , Image, ActivityIndicator, Keyboard } from 'react-native';
import { Input, Overlay } from 'react-native-elements';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from "react-native-paper";
import { API_KEY, URL } from "../CONSTANTS/api";
import { FontAwesome } from '@expo/vector-icons';
import { ListItem, Avatar } from 'react-native-elements'


const HomeScreen = ({navigation}) =>{

    const [ query , setQuery ] = useState("");

    const [ movies , setMovies ] = useState([  ]);
    const [visible, setVisible] = useState(false);


    const search = async(query) =>
    {
        setVisible(true);
        if(query)
        {
            query = query.trim();
            await fetch(URL+"s="+query+API_KEY)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(function(){ 
          setMovies(json.Search);
          setVisible(false);
        }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setVisible(false);
        });

        }
        else
        {
            alert("please enter anything..");
            setVisible(false);
        }
        
    }
    
    
    return (
        <View style={styles.container}>
              <StatusBar barStyle="light-content" backgroundColor="#616161" />

                    <Overlay isVisible={visible}   >
                    <View style={{padding : 30 , }} >
                    <ActivityIndicator
                    size="large"
                    color="black"
                    />
                    <Text style={{fontWeight : "bold" , fontSize : 22 }} >Searching...</Text>
                    </View>
                    </Overlay>
                
              <Input
                value={query}
                underlineColorAndroid = "transparent"
                onChangeText= {(item)=>setQuery(item)}
                 placeholder='Search Movies'
                rightIcon={
                    <TouchableOpacity  onPress={()=>
                    {
                        Keyboard.dismiss();
                        search(query);
                    }
                    }>
                <FontAwesome name="search" size={24} color="black" /> 
                    </TouchableOpacity>
                }
                inputContainerStyle={{
                    borderRadius : 30 ,
                    paddingLeft : 25,
                    backgroundColor : "white" ,
                    borderBottomWidth : 0 ,
                    marginTop : 15 ,
                    
                }}
                rightIconContainerStyle={{
                    paddingRight : 30 ,
                    paddingLeft : 10 
                }}
                onSubmitEditing={ ()=>
                    {
                        Keyboard.dismiss();
                        search(query);
                    } }
                returnKeyLabel = "search"
                returnKeyType = "search"
            />
                
                <ScrollView >
                {
                    (typeof movies !== "undefined") ?
                    movies.map((l, i) => (
                    <ListItem key={i} 
                    containerStyle={{
                        backgroundColor: '#424242' 
                    }}
                    bottomDivider onPress={()=>navigation.navigate("SearchDetails" ,{id : l.imdbID })}  >
                        <Avatar source={(l.Poster=="N/A") ? {uri : "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png"}:{uri: l.Poster}} />
                        <ListItem.Content>
                        <ListItem.Title style={{color : "white"}} >{l.Title}</ListItem.Title>
                    <ListItem.Subtitle style={{color : "white"}}  >{l.Year} , {l.Type}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron color="white" size={25} />
                    </ListItem>
                    )) : 
                    <Text style={{padding:20 , alignSelf : "center" , fontSize : 20 , color : "white"}}>No results found.</Text>
                }
                </ScrollView>
                
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
      flexDirection : "row" ,
      justifyContent : "space-between"
    },
    search : 
    {
        backgroundColor : "skyblue" ,
        padding : 15 ,
        borderRadius : 15 ,
        alignSelf : "center" ,
        alignItems : "center" ,
        alignContent : "center" ,
        marginTop : 10 ,
    } ,
    container : 
    {
        flex : 1 ,
        backgroundColor: '#424242' ,
    }
  });
  
export default HomeScreen;