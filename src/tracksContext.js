import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import tracksReducer from './tracksReducer';

export const TracksContext = createContext();

const TracksContextProvider = props => {
  const [tracks, dispatch] = useReducer(tracksReducer, {
    trackList: [],
    heading: 'Top 10 Tracks'
  });

  useEffect(() => {
    //Changed the paze size to 10 songs per request and the country to portugal
    //need to use 'https://cors-anywhere.herokuapp.com/' because of the access blocked for the number of cors
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=pt&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        //set the track list proprety to the tracks from the API
        dispatch({
          type: 'SET_TRACKS',
          trackList: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <TracksContext.Provider value={{ tracks, dispatch }}>
      {props.children}
    </TracksContext.Provider>
  );
};

export default TracksContextProvider;
