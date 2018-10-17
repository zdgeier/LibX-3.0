import XMLConfigWrapper from './XMLConfigWrapper';

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

export default findNodesXML;

/**
 * Iterates over nodes given by an xpath Expression and turn them into
 * a NameableItemArray.
 * @param {libx.config.XMLConfigWrapper} doc configuration document
 * @param {String} xpathExpr XPath expression describing nodes to be added
 * @param {Factory} factory Factory - a map of keys to constructors
 * @param {Function} getFactoryKey Function to obtain the key used for the factory from the node
 * @param {Function} postAddFunc Function called after item has been constructed 
 */
/*
const makeConfigurationItemArray = ( doc, xpathExpr ) => {
    var items = new Array();
    var xmlItems = findNodesXML(doc.xml, xpathExpr);
    for ( var i = 0; i < xmlItems.length; i++) {
        var node = xmlItems[i];
        var item = { };

        if (factory != null) {
          var factoryKey = getFactoryKey(node);

          if (typeof (factory[factoryKey]) != "function") {
              console.err("Factory key " + factoryKey + " not supported.");
              continue;
          }

          item = new factory[factoryKey]();
          item.type = factoryKey;
        }
        doc.copyAttributes(node, item); 
        items.push(item);
    }

    items.primary = items[0];
    return items;
}
*/


// const loadCatalogs = ( doc, edition ) => {
//   return this.makeConfigurationItemArray (doc,
//       "/edition/catalogs/*", libx.catalog.factory, 
//       function (node) {
//           return node.nodeName;
//       },
//       /* add xISBN-related attributes post construction */
//       function (node, cat) {
//           var xisbnNode = libx.utils.xpath.findSingleXML ( doc.xml, "xisbn", node );
//           if ( xisbnNode ) {
//               /* Most catalogs will inherit the xisbn property from their prototype,
//                * but since the xisbn settings can be overridden on a per catalog basis,
//                * each catalog must have its own xisbn object.
//                * Otherwise, the prototyped object would be aliased and changes propagated.
//                * Therefore, we clone the inherited xisbn object, then override the
//                * inherited xisbn property.
//                */
//               var xisbnCopy = new Object();
//               for (var k in cat.xisbn) {
//                   xisbnCopy[k] = cat.xisbn[k];
//               }
//               cat.xisbn = xisbnCopy;
      
//               doc.copyAttributes ( xisbnNode, cat.xisbn );
              
//               if (node.nodeName != "bookmarklet") {
//                   self.loadContextMenuPrefs(cat.name, "xisbn", 
//                       cat.xisbn.includeincontextmenu ? "xisbn" : "");
//               }
              
//           }
                  
//           cat.urlregexp = new RegExp( cat.urlregexp );
//           if (typeof (cat.__init) == "function") {
//               cat.__init(edition);
//           }
      
//           self.loadContextMenuPrefs(cat.name, cat.options, cat.contextmenuoptions);
//           libx.log.write("registered " + cat.name + " (type=" + node.nodeName + ", options=" + cat.options + ")");
//       });
// }
