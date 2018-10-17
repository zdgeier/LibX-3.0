/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is LibX Firefox Extension.
 *
 * The Initial Developer of the Original Code is Annette Bailey (libx.org@gmail.com)
 * Portions created by the Initial Developer are Copyright (C) 2005
 * the Initial Developer and Virginia Tech. All Rights Reserved.
 *
 * Contributor(s): Godmar Back (godmar@gmail.com)
 *                 Mike Doyle (vtdoylem@gmail.com)
 *                 Nathan Baker (nathanb@vt.edu)
 * 
 * ***** END LICENSE BLOCK ***** */

/**
* Turns (string) "true" -> true
*       (string) "false" -> false
*       (string) "" -> null
* Otherwise, returns input.
*
* @param {String} value - input string
* @return {String|Boolean|null} - converted input
*/ 
const normalize = (value) => {
   if (value == "false")
       return false;
   if (value == "true")
       return true;
   if (value == "")
       return null;
   return String(value);
};

const findSingleXML = (doc, xpathexpr, root, namespaceresolver)  => {
    var r,node;
    try {
      //if( libx.cs.browser.safari || libx.cs.browser.opera || libx.cs.browser.chrome || libx.cs.browser.mozilla ){ //standard
         /* See http://developer.mozilla.org/en/docs/Introduction_to_using_XPath_in_JavaScript
          * and http://www.xulplanet.com/references/objref/XPathResult.html
          *
          * var xpathResult = document.evaluate(xpathExpression, 
          *                                     contextNode, 
          *                                     namespaceResolver, 
          *                                     resultType, 
          *                                     result);
          *
          * Note: namespaceResolver is required if examined XML uses namespaces.
          * namespaceResolver is an object where the namespace prefix is the key and
          * the URI is the value.  It's encapsulated in an anonymous function.
          */
          r = doc.evaluate(xpathexpr, root ? root : doc, 
                           function (prefix) { 
                               return namespaceresolver[prefix]; 
                           }, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
          node = r.singleNodeValue;
       //}else if ( libx.cs.browser.msie ) { //IE
         /*Iterate through namespaceresolver object to get the prefixes*/
          /*var ns = "";
          for ( prefix in namespaceresolver)
            ns += "xmlns:"+prefix+"='"+namespaceresolver[prefix]+"' ";
          ns += "xmlns='http://www.w3.org/2005/Atom'";*/
          /* See : http://www.w3schools.com/XPath/xpath_examples.asp#selecting_nodes
          * IE5 and later has implemented that [0] should be the first node, 
          * but according to the W3C standard it should have been [1].
          * To solve the [0] and [1] problem in IE5+, 
          * we set the SelectionLanguage to XPath.
          */        
          //if( root ){ /*sometimes root is a DOMElem rathery Doc type*/
          /*    try { 
                root.setProperty("SelectionLanguage","XPath"); 
                root.setProperty("SelectionNamespaces",ns);
              }catch(er) { 
                  // do nothing 
              }
              node = root.selectSingleNode(xpathexpr);
          }else { 
              doc.setProperty("SelectionLanguage","XPath");
              doc.setProperty("SelectionNamespaces",ns);
              node = doc.selectSingleNode(xpathexpr);
          } 
       }else {
           console.err("Error - Unknown Browser! Check for appropriate feature support for libx.utils.xpath.findSingleNode");
           node = null;
       }*/
   }
   catch (e) {
       //XXX: Need to use a more specific log type
       console.err("In findSingleXML: XPath expression " + xpathexpr + " does not return a node: " + e.message + "\n Desc: "+ e.description);
       node = null;
   }
   //If there's no result, this is set to null
   return node;
 }

/**
 * Wrap an XML document containing a configuration XML document
 * and provide support for extracting attributes and copying them
 * into JS objects from it.
 *
 * @class
 */
class XMLConfigWrapper {
    constructor(xmlDocument) {
        this.xml = xmlDocument;
    }

    getNode = (xpathExpr) => {
        return findSingleXML(this.xml, xpathExpr)
    }

    getAttr = (xpath, attr) => {
        var n = this.getNode(xpath);
        return n ? n.getAttribute(attr) : null;
    }

    copyAttributes = (xnode, obj) => {
        for (var i = 0; i < xnode.attributes.length; i++) {
            var attr = xnode.attributes.item(i);
            var opt = normalize(attr.value);
            if (opt != null)
                obj[attr.nodeName] = opt;
            // else preserve default.
        }
    }
}

export default XMLConfigWrapper;