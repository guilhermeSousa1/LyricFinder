import React, { useState, useContext } from 'react';
import axios from 'axios';
import { TracksContext } from '../../tracksContext';

const Search = () => {
  const { dispatch } = useContext(TracksContext);
  const [search, setSearch] = useState({ trackTitle: '' });

  const onChange = e => {
    setSearch({ [e.target.name]: e.target.value });
  };

  const findTrack = e => {
    e.preventDefault();

    if (search.trackTitle !== '') {
      axios
        .get(
          `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${search.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
        )
        .then(res => {
          dispatch({
            type: 'SEARCH_TRACKS',
            response: res.data.message.body.track_list
          });
          setSearch({ trackTitle: '' });
        })
        .catch(err => console.log(err));
    }
  };
  return (
    <div className='card card-body mb-4 p-4'>
      <h1 className='display-4 text-center'>
        <i className='fas fa-music'></i> Search For A Song
      </h1>
      <p className='lead text-center'>Get the lyrics for any song</p>
      <form onSubmit={findTrack}>
        <div className='form-group'>
          <input
            type='text'
            className='form-control form-control-lg'
            placeholder='Search For a Song...'
            name='trackTitle'
            value={search.trackTitle}
            onChange={onChange}
          />
        </div>
        <button className='btn btn-primary btn-lg btn-block mb-5' type='submit'>
          Get Track Lyrics
        </button>
      </form>
    </div>
  );
};

export default Search;
