import React , { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View ,StatusBar, ScrollView,  Dimensions } from 'react-native';
import { Overlay } from 'react-native-elements';
import { API_KEY, URL } from "./CONSTANTS/api";
import { Image  } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import { useHeaderHeight } from '@react-navigation/stack';




const HomeMovieDetails = ({route , navigation}) =>
{
    const [visible, setVisible] = useState(false);
    const [ details ,setDetails ] = useState([]);

    const movieId = route.params.id ;
    const headerHeight = useHeaderHeight();


const getDetails = async() =>
{
    // console.log("loading....");
        // console.log(movieId);
        setVisible(true);

            await fetch(URL+"i="+movieId+API_KEY)
        .then((response) => response.json())
        .then((json) => {
          setTimeout(function(){ 
          setDetails(json);
        //   console.log(details);
          setVisible(false);
        }, 2000);
        })
        .catch((error) => {
          console.log(error);
          setVisible(false);
        });
}


useEffect(()=>
    {
        getDetails();
    },[movieId]);

  return(
    <>
                <StatusBar barStyle="light-content" backgroundColor="#616161" />
                    <Overlay isVisible={visible}   >
                        <View style={{padding : 30 , }} >
                        <ActivityIndicator
                            size="large"
                            color="black"
                        />
                        <Text style={{fontWeight : "bold" , fontSize : 22 }} >Loading...</Text>
                        </View>
                    </Overlay>
        
            

<HeaderImageScrollView
          showsHorizontalScrollIndicator= {false}
          maxHeight={height* 0.65 }
          scrollViewBackgroundColor = "#424242"
          minHeight={ headerHeight }
          maxOverlayOpacity={0.9}
          minOverlayOpacity={0.2}
          fadeOutForeground
          renderHeader={() => <Image source={
            (details.Poster=="N/A") ? {uri : "https://m.media-amazon.com/images/G/01/imdb/images/nopicture/medium/name-2135195744._CB466677935_.png"}:{uri: details.Poster}}
           style={styles.image} />}
          renderFixedForeground={() => (
              <View style={{ top : 10 , left : 10 , flex : 1 , flexDirection : "row" , }} >
            <TouchableOpacity onPress={()=> { navigation.goBack(); } }  >
                <Ionicons name="md-arrow-round-back" size={35} color="white" />
            </TouchableOpacity>
            </View>
          )}
          
        >

    <View
        style={styles.section} 
    >
        <Text style={styles.movieTitle} >{details.Title}</Text>

              <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >IMDB Rating :   </Text>
                <Text style={styles.rightText} >{details.imdbRating}</Text>
                </View>

                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Actors :   </Text>
                <Text style={styles.rightText} >{details.Actors}</Text>
                </View>

                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Director :   </Text>
                <Text style={styles.rightText} >{details.Director}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Genre :   </Text>
                <Text style={styles.rightText} >{details.Genre}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Language :   </Text>
                <Text style={styles.rightText} >{details.Language}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Released on :   </Text>
                <Text style={styles.rightText} >{details.Released}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Movie / Series  :   </Text>
                <Text style={styles.rightText} >{details.Type}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Year :   </Text>
                <Text style={styles.rightText} >{details.Year}</Text>
                </View>
                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Runtime :   </Text>
                <Text style={styles.rightText} >{details.Runtime}</Text>
                </View>

                <View style={styles.DetailsView} >
                <Text style={styles.LeftText} >Story :   </Text>
                <Text style={styles.rightText} >{details.Plot}</Text>
                </View>
                
    </View>


</HeaderImageScrollView>

</>
  );
}


const height = Dimensions.get("screen").height;
const width = Dimensions.get("screen").width ;

const styles = StyleSheet.create({

    container : 
    {
        flex : 1 ,
        backgroundColor: '#424242'

    },
    section: {
        padding: 20,
        backgroundColor: '#424242',
    },
    image: {
        height: height*0.65 ,
        width: Dimensions.get('window').width,
        resizeMode: "contain",
        backgroundColor : "transparent"
    },
    DetailsView:
    {
        flex : 1 ,
        flexDirection : "column" ,
        borderBottomWidth : 0.5 ,
        borderColor : "grey" ,
        margin : 5 ,
        marginBottom : 30 ,
    },
    LeftText :
    {
        fontSize : 20 ,
        color : "white",
    },
    rightText :
    {
        fontSize : 15 ,
        marginLeft : width * 0.35 ,
        marginBottom : 10,
        color : "white",

    },
    movieTitle :
    {
      fontSize : 30 ,
      fontWeight : "bold" ,
      marginVertical : 10 ,
      color : "white",
    }
  });
  

export default HomeMovieDetails;