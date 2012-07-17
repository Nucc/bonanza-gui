/*
Copyright (C) 2007  Laszlo Papp (Bonanza Team)

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

var BElement = Base.extend({

// PUBLIC methods

    _element: undefined,
    /**
     *  Constructor. Create a BElement object.
     *
     * @param {elementType} What element need to create
     */
    constructor: function( /*String*/ elementType ) {

        if( elementType == undefined ) return;

        this._element = document.createElement( elementType );
    },

    /**
     * Remove the node from the Html source.
     */

    destroy: function()
    {
        this._element.parentNode.removeChild( this._element );
        this._element = undefined;
    },

    /**
     * Returns the Html source of the node
     *
     * @return BElement
     */

    node: function()
    {
        return this._element;
    },

    /**
     * Append a BElement object as a child
     *
     * @param {e} The element that we want to attach
     */

    appendChild: function( /*BElement*/ e )
    {
        this._element.appendChild( e.node() );
        return true;
    },

    /**
     * Insert an other BElement before this node in the hierarchy
     */
    insertBefore: function( /* BElement */ e)
    {
        this._element.parentNode.insertBefore( e.node(), this._element );
    },

    /**
     * Create a text node, which append to this BElement
     *
     * @param {content} The string, that we want to attach to the DOM
     */
    createTextNode: function( /*String*/ content )
    {
        var node = document.createTextNode(content);
        this._element.appendChild( node );
        return true;
    },

    changeTextNode: function( /*String*/ text )
    {
        //try
        //{
            this._element.innerHTML = text;
        //}
    },


    /**
     * Set an attribute of the node
     *
     * @param {name} The name of the attribute
     * @param {value} The value of the attribute
     */
    setAttribute: function(/*String*/ name, /*String*/ value)
    {
        this._element.setAttribute(name, value);
    },

    /**
     * Get an attribute value
     *
     * @return String
     */
    getAttribute: function( /*String*/ name)
    {
        return this._element.getAttribute(name);
    },

    /**
     * Set a style tag to the element
     *
     * @param {name} The name of the style tag
     * @param {value} The value of the style tag
     */
    setStyle: function( /*String*/ name, /*String*/ value )
    {
        this._element.style[name] = value;
    },

    /**
     * Get a style value
     *
     * @return String
     */
    getStyle: function( /*String*/ name, /*String*/ group )
    {
        if ( this._element.style[name] != '' )
            return this._element.style[name];

        // If not, we search in the css files... We search backward, because the last will be available
        var tag = '.' + (( group == undefined ) ? this.getStyleSheet() : group + '.' + this.getStyleSheet());
        var sheets = document.styleSheets;
        for( var i= sheets.length; i > 0; i--) {

            var rules = sheets[i-1].cssRules;
            for( var j=rules.length; j > 0; j-- )
            {
                if( rules[j-1].selectorText == tag )
                {
                    return rules[j-1].style[name];
                }
            }
        }
        return undefined;
    },

    /**
     * Set the id of the element
     *
     * @param{id} The id group, every element under this, get the same id
     * @param{name} Name in the group.
     */
    setId: function( /*Integer*/ id, /*String*/ name )
    {
        this._element.id = (name == undefined ) ? id : id + '_' + name;
    },

    /**
     * Returns the id number of the element
     *
     * @return Integer
     */
    getId: function()
    {
        return parseInt( this._element.id.split('_')[0] );
    },

    /**
     * Returns the name in the group of the element
     *
     * @return String
     */
    getName: function()
    {
        var name = this._element.id.split('_');
        var newname = '';
        for (var index = 1, len = name.length-1; index < len; ++index) {
          newname += name[index] + '_';
        }
        newname += name[name.length-1];
        return newname;
    },

    /**
     * Add a stylesheet class to the element
     *
     * @param {css} The name of the class, that we want to add
     */
    addStyleSheet: function( /*String*/ css )
    {
        this._element.className += ' ' + css;
    },

    /**
     * Remove a stylesheet class of the element
     *
     * @param {css} The name of the stylesheet
     */
    removeStyleSheet: function( /* String */ css )
    {
        styles = this._element.className.split(' ');
        newstyle = '';
        for( var i=0; i < styles.length; i++) {
            if( styles[i] != css )
                newstyle += styles[i] + ' '
        }
        this._element.className = newstyle;
    },

    /**
     * Returns the stylesheet classes of the element
     *
     * @return String TODO: Array
     */
    getStyleSheet: function()
    {
        return this._element.className;
    },

    /**
     * Returns the element, with a defined name in the group
     *
     * @param {name} The name of the element in the group
     * @return BElement
     */
    find: function( /*String*/ name )
    {
        var e = new BElement;
        var tag = this.getId() || '';
        e._element = document.getElementById( tag + '_' + name );
        return e;
    },

/**
 * public slots
 */

    /**
     * Hide the element from the DOM tree
     */
    hide: function()
    {
        this._element.style.display = 'none';
    },

    /**
     * Show the element in the DOM tree
     */
    show: function()
    {
        this._element.style.display = '';
    },

/**
 * @signals
 */

    onclick: function()
    {
        return new signal(this._element, 'click');
    },

    onmouseover: function()
    {
        return new signal(this._element, 'mouseover');
    },

    onmousemove: function()
    {
        return new signal(this._element, 'mousemove');
    },

    onmousedown: function()
    {
        return new signal(this._element, 'mousedown');
    },

    onmouseup: function()
    {
        return new signal(this._element, 'mouseup');
    },

    ondblclick: function()
    {
        return new signal(this._element, 'dblclick');
    },

    onkeydown: function()
    {
        return new signal(this._element, 'keydown');
    },

    onrightclick: function()
    {
        return new signal(this._element, 'contextmenu');
    },

    onmouseout: function()
    {
        return new signal(this._element, 'mouseout');
    },

    onchange: function()
    {
        return new signal(this._element, 'change');
    },

    onselect: function()
    {
        return new signal(this._element, 'select');
    },

},

/**
 * @static tags
 */

{
    /**
     * Find the group head in the html source
     *
     * @param {id} The id of the group
     * @return BElement
     */
    find: function(/*Integer*/ id )
    {
        var element = new BElement();
        element._element = document.getElementById( id );
        return element;
    },

    /**
     * Get the id of the HTML element
     *
     * @return Integer
     */
    getId: function(/*HTMLElement*/ e) {
        return parseInt(e.id.split('_')[0]);
    },

    findByHTMLTag: function( /* HtmlElement */ element) {
        var e = new BElement();
        try {
            e._element = document.getElementById( element.id );
            return e;
        }
        catch (e) {
            throw new BException(CONSTRAINT_ERROR, 'No id');
        }
    }
});

Function.prototype.bindAsEventListener = function(object) {
  var __method = this;
  return function(event) {
    // Insert object to second argument, to know who send the signal
        return __method.call(object, event || window.event, this);
  }
}

var  $E = BElement.findByHTMLTag;