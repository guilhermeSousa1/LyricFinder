const tracksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACKS':
      return {
        ...state,
        trackList: action.trackList,
        heading: 'Top 10 Tracks'
      };
    case 'SEARCH_TRACKS':
      return {
        ...state,
        trackList: action.response,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

export default tracksReducer;
