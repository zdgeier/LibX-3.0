import xml2js from 'xml2js';

const findNodesXML = (doc, xpathexpr, root, namespaceresolver) =>  {
    var r;
    try {
        r = doc.evaluate(xpathexpr, root ? root : doc, 
                         function (prefix) { 
                             return namespaceresolver[prefix]; 
                         }, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
    }
    catch (e) {
        //XXX: Need to use a more specific log type
        console.err("In findNodesXML: XPath expression " + xpathexpr + " does not return a set of nodes: " + e);
        return null;    // XXX should you rethrow here?
    }

    var rr = new Array();
    var n;
    while ((n = r.iterateNext()) != null)
        rr.push(n);
    return rr;
}

const parseStringXML = (xmlText, xpath) => {
    var domParser = new DOMParser;
    var xmlDom = domParser.parseFromString(xmlText, "text/xml");
    var xmlNodes = findNodesXML(xmlDom, xpath);

    var a = new Array();
    var xmlParser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
    xmlNodes.forEach((node) => {
        xmlParser.parseString(node.outerHTML, (err, result) => a.push(result));
    });
    
    return a;
}

export default parseStringXML;