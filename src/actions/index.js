import xml2js from 'xml2js'
import parseStringXML from '../util/xpath'

const MILLI_PER_HOUR = 36e5;
const VALID_EDITION_HOURS = 24; 

export const FETCH_EDITION = 'FETCH_EDITION'
export const SELECT_DRAWER = 'SELECT_DRAWER'

export const handleSelectDrawer = (selectedDrawer) => {
  return {
    type: SELECT_DRAWER,
    index: selectedDrawer
  }
}

export const handleFetchEdition = (edition) => {
  return apiAction({
    baseType: FETCH_EDITION,
    fetch() {
      if (edition == null) { // on open
        return getLocalEdition(); 
      }
      else { 
        return getRemoteEdition(edition);
      }
    }, 
  });
}

const getLocalEdition = () => {
  return browser.storage.local.get('edition').then(
      result => {
        var lastFetched = (new Date().getTime() - result.edition.timestamp) / MILLI_PER_HOUR;
        if (lastFetched > VALID_EDITION_HOURS) {
          return getRemoteEdition(result.edition.url);
        }
        else {
          return {data: result.edition};
        }
      }
    )
}

const getRemoteEdition = (edition) => {
  return fetch(edition)
    .then(response => response.text())
    .then(text => {
      return parseEdition(edition, text);
  });
}

const parseEdition = (url, xmlText) => {
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  console.dir(url);
  return new Promise((fulfill, reject) => {
    parser.parseString(xmlText, 
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }

        var edition = result.edition;
        edition.catalogs = parseStringXML(xmlText, '/edition/catalogs/*');
        edition.timestamp = new Date().getTime();
        edition.url = url;

        browser.storage.local.set({edition}).then(
          (_data) => {
            fulfill({data: edition})
          }).catch(
          (error) => {
            console.log(error)
            reject(error);
          }
        );
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