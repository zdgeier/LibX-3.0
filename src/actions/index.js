import xml2js from 'xml2js';

export const SET_LINKS = 'SET_LINKS'
export const SELECT_DRAWER_CONTENT = 'SELECT_DRAWER_CONTENT'
export const REQUEST_EDITION = 'REQUEST_EDITION'
export const RECEIVE_EDITION = 'RECEIVE_EDITION'

export const setLinks = links => ({
  type: 'SET_LINKS',
  links 
})

export const setEdition = edition => ({
  type: 'SET_EDITION',
  edition 
})

export const selectDrawerContent = selectedDrawerContent => ({
    type: 'SELECT_DRAWER_CONTENT',
    selectedDrawerContent
})

export const requestEdition = edition => ({
  type: REQUEST_EDITION,
  edition
})

export const receiveEdition = (edition, json) => ({
  type: RECEIVE_EDITION,
  edition,
  json: json,
})

export const fetchEdition = edition => dispatch => {
  dispatch(requestEdition(edition));
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  return fetch(edition)
    .then(response => response.text())
    .then(text => parser.parseString(text, 
      (err, result) => dispatch(setLinks(result.edition.links.url)))
    );
}

export const fetchEditionIfNeeded = edition => (dispatch, getState) => {
  return dispatch(fetchEdition(edition))
}

/*
const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  return fetch(`https://www.reddit.com/r/${subreddit}.json`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}
*/