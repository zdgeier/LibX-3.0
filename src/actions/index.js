import xml2js from 'xml2js';

export const SET_LINKS = 'SET_LINKS'
export const SET_EDITION = 'SET_EDITION'
export const SELECT_DRAWER_CONTENT = 'SELECT_DRAWER_CONTENT'
export const REQUEST_EDITION = 'REQUEST_EDITION'
export const RECEIVE_EDITION = 'RECEIVE_EDITION'

export const setLinks = links => ({
  type: SET_LINKS,
  links 
})

export const setEdition = edition => ({
  type: SET_EDITION,
  edition 
})

export const fetchEdition = edition => dispatch => {
  var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
  return fetch(edition)
    .then(response => response.text())
    .then(text => parser.parseString(text, 
      (err, result) => {
        console.dir(result);
        dispatch(setLinks(result.edition.links.url));
        dispatch(setEdition(result.edition.name.short));
      }
    ));
}

/*storeItem = ({item, key}) => {
    localStorage.setItem(key, JSON.stringify(item));
    this.setState({links: item});
  }

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
