import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

const Lyrics = props => {
  const [song, setSong] = useState({ track: {}, lyrics: {} });

  useEffect(() => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then(res => {
        //setting the proprety lyrics equal to the object returned from the API.
        setSong({
          ...song,
          lyrics: Object.assign(lyrics, res.data.message.body.lyrics)
        });
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${props.match.params.id}&apikey=${process.env.REACT_APP_MM_KEY}`
        );
      })
      .then(res => {
        //setting the proprety track equal to the object returned from the API.
        setSong({
          ...song,
          track: Object.assign(track, res.data.message.body.track)
        });
      })
      .catch(err => console.log(err));
  }, []);

  const { track, lyrics } = song;
  if (
    track === undefined ||
    lyrics === undefined ||
    Object.keys(track).length === 0 ||
    Object.keys(lyrics).length === 0
  ) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to='/' className='btn btn-dark btn-sm mb-4'>
          Go Back
        </Link>
        <div className='card'>
          <h5 className='card-header'>
            {track.track_name} by{' '}
            <span className='text-secondary'>{track.artist_name}</span>
          </h5>
          <div className='card-body'>
            <p className='card-text'>{lyrics.lyrics_body}</p>
          </div>
        </div>

        <ul className='list-group mt-3'>
          <li className='list-group-item'>
            <strong>Album ID</strong>: {track.album_id}
          </li>
          <li className='list-group-item'>
            <strong>Song Genre</strong>:{' '}
            {track.primary_genres.music_genre_list[0] === undefined
              ? ''
              : track.primary_genres.music_genre_list[0].music_genre
                  .music_genre_name}
          </li>
          <li className='list-group-item'>
            <strong>Explicit Words</strong>:{' '}
            {track.explicit === 0 ? (
              <i className='fas fa-times'></i>
            ) : (
              <i className='fas fa-check'></i>
            )}
          </li>
        </ul>
      </Fragment>
    );
  }
};

export default Lyrics;
