import React , { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View ,StatusBar, ScrollView,  Dimensions, Image ,FlatList } from 'react-native';
import { Overlay } from 'react-native-elements';
import { idImdb_API_KEY , idImdb_URL ,idImdb_Top ,idImdb_Theater , idImdb_Coming_Soon } from "./CONSTANTS/api";
import { Header } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);

const DummyScreen = ({route , navigation}) =>
{
    const [visible, setVisible] = useState(false);
    const [ movies ,setMovies ] = useState([]);
    const [ TheaterMovies ,setTheaterMovies ] = useState([]);
    const [ comingSoon ,setComingSoon ] = useState([]);


const getTopMovies = async() =>
{
    setVisible(true);

        await fetch(idImdb_URL+idImdb_Top+idImdb_API_KEY)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(function(){ 
          setMovies(json.data.movies);
          // console.log(movies);
          setVisible(false);
        }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setVisible(false);
        });
}
const getTheaterMovies = async() =>
{
    setVisible(true);

        await fetch(idImdb_URL+idImdb_Theater+idImdb_API_KEY)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(function(){ 
          setTheaterMovies(json.data.inTheaters[0].movies);
          // console.log(json.data.inTheaters[0].movies);
          setVisible(false);
        }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setVisible(false);
        });
}

const getComingSoon = async() =>
{
    setVisible(true);

        await fetch(idImdb_URL+idImdb_Coming_Soon+idImdb_API_KEY)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(function(){ 
            setComingSoon(json.data.comingSoon[0].movies);
          setVisible(false);
        }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setVisible(false);
        });
}

const renderItem = ({ item }) => (
    <View style={styles.imageView} >
      <TouchableOpacity style={styles.touchable} onPress={()=>{navigation.navigate('MoviesHome',{ id : item.idIMDB });  }} >
    <Image source={
      (item.urlPoster=="N/A") ? 
      {uri : "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png"}
      :{uri: item.urlPoster}
      }
    style={{width : width * 0.4 , height : height * 0.35 , resizeMode:"contain" }}
    />
    <View style={{}}>
    <Text style={styles.textView}>{item.title}</Text>
    <Text style={styles.subView} >{item.year}</Text>
    </View>
    </TouchableOpacity>
    </View>
);


useEffect(()=>
    {
        getComingSoon();
        getTopMovies();
        getTheaterMovies();
    },[]);

  return(
            <View style={styles.container} >
                <StatusBar barStyle="light-content" backgroundColor="#616161" />
                    <Overlay isVisible={visible}   >
                        <View style={{padding : 30  }} >
                        <ActivityIndicator
                            size="large"
                            color="black"
                        />
                        <Text style={{fontWeight : "bold" , fontSize : 22 }} >Loading...</Text>
                        </View>
                    </Overlay>



            <ScrollView style={{flex : 1 }} >
            <FlatList
                  numColumns={2}
              horizontal={false}
              data={comingSoon}
              renderItem={renderItem}
              keyExtractor={(item) => item.idIMDB}
              ListHeaderComponent={()=>(
              <Text style={styles.Title}>Coming Soon</Text>
              )}
            />
                  <FlatList
                  numColumns={2}
              horizontal={false}
              data={movies}
              renderItem={renderItem}
              keyExtractor={(item) => item.idIMDB}
              ListHeaderComponent={()=>(
              <Text style={styles.Title}>Top Rated Movies</Text>
              )}
            />
            <FlatList
                  numColumns={2}
              horizontal={false}
              data={TheaterMovies}
              renderItem={renderItem}
              keyExtractor={(item) => item.idIMDB}
              ListHeaderComponent={()=>(
              <Text style={styles.Title}>In Theater</Text>
              )}
            />
            
            </ScrollView>

            </View>
  );
}


const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width ;

const styles = StyleSheet.create({

    container : 
    {
        flex : 1 ,
        backgroundColor : "#424242"
    },
    imageView : 
     {
      margin : 10 , 
      flex : 1 , 
      backgroundColor : "#212121" , 
      alignItems : "center" ,
      borderRadius : 20 ,
    },
    textView : 
     {
      fontSize : 16 , 
      alignItems : "center",
      color : "white"
     },
    subView :
     {
       color : "white"
     },
    Title:
     {
       fontSize :25 ,
       fontWeight : "bold" ,
       margin : 15 ,
       color : "white"
     } ,
    touchable :
     {
      padding : 10 , 
      alignItems : "center" ,
      borderRadius : 20 ,
     }


  });
  

export default DummyScreen;