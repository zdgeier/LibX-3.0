import xml2js from 'xml2js';
import parseStringXML from '../util/xpath'

export const FETCH_EDITION = 'FETCH_EDITION'

export const handleFetchEdition = (edition) => {
  console.log("HI");
  console.dir(edition);
  return apiAction({
    baseType: FETCH_EDITION,
    fetch() {
      /*
      if (edition == null) { // on open
        return browser.storage.local.get('edition').then((e) => {
          return e;
        });
      }
      else {
        */
        return fetch(edition)
          .then(response => response.text())
          .then(text => {
            return parseEdition(text);
        });
      //}
    }, 
  });
}

const parseEdition = (xmlText) => {
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  return new Promise((fulfill, reject) => {
    parser.parseString(xmlText, 
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        var edition = result.edition;
        edition.catalogs = parseStringXML(xmlText, '/edition/catalogs/*');
        console.dir(edition);
<<<<<<< HEAD
        browser.storage.local.set({edition}).then(
          (_data) => {
            fulfill({data: edition})
          }).catch(
          (error) => {
            console.log(error)
            reject(error);
          }
=======
        browser.storage.local.set({edition}).catch(
          (error) => console.log(error)
>>>>>>> 5c9baed809c064c618cb09cafaa0a0422076254c
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