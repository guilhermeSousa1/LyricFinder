import React, { useContext, Fragment } from 'react';
import { TracksContext } from '../../tracksContext';
import Spinner from '../layout/Spinner';
import Track from '../tracks/Track';

const Tracks = () => {
  //the dispatch method and the reducer are not required for this component
  const { tracks } = useContext(TracksContext);
  const { trackList, heading } = tracks;

  if (trackList === undefined || trackList.length === 0) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <h3 className='text-center mb-4'>{heading}</h3>
        <div className='row'>
          {trackList.map((item, index) => (
            <Track key={index} track={item.track} />
          ))}
        </div>
      </Fragment>
    );
  }
};

export default Tracks;
