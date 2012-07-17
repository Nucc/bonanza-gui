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

include('BObject.js');
include('BElement.js');
include('BPaintDevice.js');


var BWidget = BObject.extend({

/*
*   @public
*/

    /**
     * Constructor. It creates the widget. Every widget inherits this
     *
     * @param {parent} The parent widget. Here we set which widget
     *                 contains our widget element.
     * @param {name}   The name of the widget.
     */

    constructor: function( /*BWidget*/ parent, /*String*/ name) {
        this.base(parent, name);
        this.generateDOMTree();
    },

    /**
     * Set the widget height.
     *
     * @param {height} The height of the widget.
     */
    setHeight: function( /*Integer*/ height )
    {
        this._height = height;
        this.getDomElement().setStyle('height', height + "px");
    },

    /**
     * Get the current height of the widget.
     *
     * @return Integer
     */

    getHeight: function()
    {
        return this._height;
    },

    /**
     * Set the minimum height of the widget
     *
     * @param {height} The minimum height.
     */
    setMinHeight: function( /*Integer*/ height )
    {
        this._minHeight = height;
        this.getDomElement().setStyle('min-height', height + 'px');
    },

    /**
     * Get the current minimum height of the widget.
     *
     * @return Integer
     */
    getMinHeight: function()
    {
        return this._minHeight;
    },

    /**
     * Set the maximum height of the widget.
     *
     * @param {height} The maximum height of the widget.
     */
    setMaxHeight: function( /*Integer*/ height )
    {
        this._maxHeight = height;
        this.getDomElement().setStyle('max-height', height + 'px');
    },

    /**
     * Get the maximum height of the widget.
     *
     * @return Integer
     */
    getMaxHeight: function()
    {
        return this._maxHeight;
    },

    /**
     * Set the width of the widget.
     *
     * @param{width} The width of the widget
     */
    setWidth: function( /*Integer*/ width )
    {
        this._width = width;
        this.getDomElement().setStyle('width', width + 'px');
    },

    /**
     * Get the actual width of the widget.
     *
     * @return Integer
     */
    getWidth: function()
    {
        return this._width;
    },

    /**
     * Set the minimum width of the widget
     *
     * @param {width} The minimum width
     */
    setMinWidth: function( /*Integer*/ width )
    {
        this._minWidth = width;
        this.getDomElement().setStyle('min-width', height + 'px');
    },

    /**
     * Get the minimum width of the widget
     *
     * @return Integer
     */
    getMinWidth: function()
    {
        return this._minWidth;
    },

    /**
     * Set the maximum-width of the widget
     *
     * @param {width} The maximum-width of the widget
     */
    setMaxWidth: function( /*Integer*/ width )
    {
        this._maxWidth = width;
        this.getDomElement().setStyle('max-width', height + 'px');
    },

    /**
     * Get the maximum-width of the widget
     */
    getMaxWidth: function()
    {
        return this._maxWidth;
    },

    /**
     * Set the X coordinate of the widget. If parent is set, it counted
     * from the left border of the parent widget. If the parent is null,
     * it's the distance from the window's left border.
     *
     * @param {coor} The coordinate of the widget
     */
    setX: function( /*Integer*/ coor )
    {
        this._xcoor = coor;
        this.getDomElement().setStyle( 'left', coor + 'px');
    },

    /**
     * Get the distance from the parent widget (or window) top border.
     */
    getX: function()
    {
        return this._xcoor;
    },


    /**
     * Set the Y coordinate of the widget. If parent widget is not null,
     * then it will be the distance from the parent widget top border,
     * if the parent is null, the distance from the browser-window top
     * border.
     *
     * @param {coor} The distance from the top.
     */
    setY: function( /*Integer*/ coor )
    {
        this._ycoor = coor;
        this.getDomElement().setStyle( 'top', coor + 'px');
    },

    /**
     * Get the distance from the parent widget's top border.
     */
    getY: function()
    {
        return this._ycoor;
    },

    /**
     * Add a style class to the element, which we defined in a css file.
     * It will be attached to the DOM as class="".
     *
     * @param {css} The class of the stylesheet.
     */
    setStyleClass: function( /*String*/ css )
    {
        this.getDomElement().addStyleSheet(css);
    },

    /**
     * Get the actual stylesheets of the widget.
     */
    getStyleClass: function()
    {
        return this.getDomElement().getStyleSheet();
    },


/**
 * @public slot
 */

    /**
     * Show the widget in the browser.
     */
    show: function()
    {
        if( this._appear == true ) return;
        this._appear = BPaintDevice.getDevice().show(this);
    },

    /**
     * Hide the widget
     */
    hide: function()
    {
        if( this._appear == false ) return;
        this._appear = !BPaintDevice.getDevice().hide(this);
    },

    /**
     * Set the title of the window. If parent widget is not null,
     * then it will generate nothing.
     *
     * @param {title} The title of the widget
     */
    setCaption: function( /*String*/ title )
    {
        //TODO: if the window is not exists, it isn't work...
        if( BPaintDevice.getDevice().setCaption(this, title) )
        {
            this._caption = title;
        }
    },

    /**
     * Get the current title of the window
     *
     * @return String
     */
    caption: function()
    {
        return this._caption;
    },

    /**
     * Repaint the widget
     */
    rePaint: function()
    {
        this._painted = false;
        try
        {
            BPaintDevice.getDevice().draw( this );
        }
        catch( exception )
        {

        }
        this._painted = true;
    },

/*
*   @protected
*/

    // The DOM element, where the widget begins in the HTML source code.
    /* BElement */ _dom: undefined,

    // The current height of the widget.
    /* Integer */ _height: undefined,

    // The current width of the widget
    /* Integer */ _width: undefined,
    /* Integer */ _minHeight: undefined,
    /* Integer */ _minWidth: undefined,
    /* Integer */ maxHeight: undefined,
    /* Integer */ maxWidth: undefined,

    /* Integer */ _xcoor: 0,
    /* Integer */ _ycoor: 0,

    /* String */ _styleclass: undefined,

    /* Boolean */ _appear: undefined,
    /* Boolean */ _painted: false,


    /**
     * Get the Widget base DOM
     *
     * @return BElement
     */
    getDomElement: function()
    {
        return this._dom;
    },

    /**
     * It will generate the skeleton of the widget. It will generate
     * the design of the widget.
     *
     * @return BElement
     */
    generateDOMTree: function()
    {
        var id = this.getId();
        this._dom = new BElement('div');
        this._dom.setId( id );
        this._dom.setStyle('position', 'absolute');
        this._dom.setStyle('overflow', 'hidden');
        return this._dom;
    },
});

