import xml2js from 'xml2js';

export const FETCH_EDITION = 'FETCH_EDITION'

export const handleFetchEdition = (edition) => {
  return apiAction({
    baseType: FETCH_EDITION,
    fetch() {
      const gotEdition = (editionData) => {
        if (Object.keys(editionData).length == 0) {
          console.log("fetching edition");
          return fetchEdition(edition);
        }
        else {
          console.log("using existing edition");
          console.dir(editionData);
          return editionData.edition;
        }
      }
      
      return browser.storage.local.get(edition).then(gotEdition, 
        (error) => {
          console.log(error);
        });
    }, 
  });
}

const fetchEdition = (editionURL) => {
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  return fetch(editionURL)
  .then(response => response.text())
  .then(text => {
    var edition = {};
    parser.parseString(text, 
      (err, result) => {
        edition = {data: result.edition};
    });
    browser.storage.local.set({edition}).then(
      () => console.log("edition fetched and stored locally"), 
      (error) => console.log(error)
    );
    return edition;
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
        console.log("response");
        console.log(response);
        console.log(response.data);
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