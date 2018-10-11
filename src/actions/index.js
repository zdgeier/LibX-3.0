import xml2js from 'xml2js';
import { request } from 'https';

export const FETCH_EDITION = 'FETCH_EDITION'

export function fetchEdition(edition) {
  return apiAction({
    baseType: FETCH_EDITION,
    fetch() {
      var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
      return fetch(edition)
        .then(response => response.text())
        .then(text => {
          var json = {};
          parser.parseString(text, 
            (err, result) => {
              json = { data: {edition: result.edition} };
          });
          return json;
        });
    },
  });
}

/** TODO: Credit pcs */
export default function apiAction (
  { baseType, fetchIf, fetch, onSuccess, onError, params }
) {
  return (dispatch, getState) => {
    if (fetchIf != null && !fetchIf()) {
      return;
    }
    dispatch({
      type: baseType + ':BEGIN',
      params,
    });

    fetch().then(
      response => {
        console.dir(response);
        if (onSuccess) {
          onSuccess(dispatch, response.data, getState);
        }
        dispatch({
          type: baseType + ':OK',
          response: response.data,
          params,
        });
      },
      error => {
        if (onError) {
          onError(dispatch, error, getState);
        }
        dispatch({
          type: baseType + ':ERROR',
          error: error.data,
          params,
        });
      }
    );
  };
}

/*
export const fetchEditionIfNeeded = edition => dispatch => {
  var result = localStorage.getItem(edition);
  if (result === null) {
    localStorage.setItem(edition, JSON.stringify(result));
  }
  else {
    dispatch(setLinks(result.edition.links.url));
    dispatch(setEdition(result.edition.name.short));
  }
}
*/

/*
  submitSettings = (values) => {
    const editionHit = localStorage.getItem(values.edition);
    if (editionHit) {
      this.setState({links: editionHit});
      return;
    }

    fetch(values.edition).then((data) => {
      var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
      data.text().then((text) => {
        parser.parseString(text, (err, result) => {
        console.dir(result);
        this.storeItem({item: result.edition.links.url, key: "links"});
        //this.setState({links: result.edition.links.url});
      }) });
    })
  };
*/
