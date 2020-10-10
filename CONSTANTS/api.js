import React , { useState } from 'react';
import { exp } from 'react-native-reanimated';

// the below is the api key
// export const API_KEY = "e99e4ec1";

// the below is the api key we use in url to retrieve data from the omdb api

//below are the keys from omdb api
//usage http://www.omdbapi.com/?apikey=[yourkey]&

export const API_KEY = "&apikey=e99e4ec1" ;

export const Type_Movie = "&type=movie";

export const Type_Series = "&type=series";

export const Type_Episode = "&type=episode";

export const yearOfRelease = "&y="

export const full_plot = "&plot=full";

export const short_plot  = "&plot=short";

export const URL = "https://www.omdbapi.com/?";

//below are the keys from https://www.myapifilms.com/
//usage https://www.myapifilms.com/imdb/inTheaters?token=827bcbe5-db20-45d6-8a1d-fbf43446f853

export const idImdb_URL = "https://www.myapifilms.com/imdb/";

export const idImdb_Top = "top";

export const idImdb_Theater = "inTheaters";

export const idImdb_Coming_Soon = "comingSoon";

export const idImdb_API_KEY = "?token=827bcbe5-db20-45d6-8a1d-fbf43446f853";