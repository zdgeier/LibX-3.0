import xml2js from 'xml2js';
import parseStringXML from '../util/xpath'

export const FETCH_EDITION = 'FETCH_EDITION'

export const handleFetchEdition = (edition) => {
  return apiAction({
    baseType: FETCH_EDITION,
    fetch() {
      /*
      const gotEdition = (editionData) => {
        if (Object.keys(editionData).length == 0) {
          console.log('no existing edition, fetching edition');
          return fetchEdition(edition);
        }
        else {
          console.log('using existing edition');
          console.dir(editionData);
          return editionData.edition;
        }
      }
      
      return browser.storage.local.get(edition).then(gotEdition, 
        (error) => {
          console.log(error);
        });*/
      return fetchEdition(edition);
    }, 
  });
}

const fetchEdition = (editionURL) => {
  return fetch(editionURL)
    .then(response => response.text())
    .then(text => {
      console.log("text");
      console.dir(text);
      return parseEdition(text);
      /*
      console.log("edition");
      console.dir(edition)
      browser.storage.local.set({edition}).then(
        () => console.log("edition fetched and stored locally"),  
        (error) => console.log(error)
      );
      return edition;
      */
    });
}

const parseEdition = (xmlText) => {
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  return new Promise((fulfill, reject) => {
    parser.parseString(xmlText, 
      (err, result) => {
        console.dir(result);
        if (err) {
          reject(err);
          return;
        }
        var edition = result.edition;
        edition.catalogs = parseStringXML(xmlText, '/edition/catalogs/*');
        browser.storage.local.set({edition}).then(
          () => console.log("edition fetched and stored locally"),  
          (error) => console.log(error)
        );
        console.dir(edition);
        fulfill({data: edition});
    });
  })
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