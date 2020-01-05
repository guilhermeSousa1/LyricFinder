import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { TracksContext } from '../../tracksContext';
import axios from 'axios';

const Navbar = () => {
  const { dispatch } = useContext(TracksContext);

  //when the title is clicked, reset the searched tracks, to the top 10 tracks of the moment
  const onClick = () => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=pt&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        dispatch({
          type: 'SET_TRACKS',
          trackList: res.data.message.body.track_list
        });
      })
      .catch(err => console.log(err));
  };

  return (
    <nav className='navbar navbar-dark bg-dark mb-5'>
      <Link to='/' className='navbar-brand mb-0 h1 mx-auto' onClick={onClick}>
        LyricFinder
      </Link>
    </nav>
  );
};

export default Navbar;
