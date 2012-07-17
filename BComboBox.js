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

include('BElement.js');
include('BWidget.js');
include('BException.js');

var BComboBox = BWidget.extend(
{
    constructor: function( parent, name)
    {
        this.base( parent, name);
    },

    _elements: [],

    count: function()
    {
        return this._contains.length;
    },

    insertStringList: function( /*array*/ strlist, index )
    {
    },

    insertItem: function( value, index)
    {
        var element = new BElement('option');
        element.createTextNode( value || 'undefined' );

        if( index >= this._elements.length )
        {
            index = this._elements.length;
            element.setAttribute('name', index );
            this._elements[index] = element;
            this._combo.appendChild( element );
            return true;
        }

        for (var i = this._elements.length-1; i >= index; i--)
        {
            this._elements[i].setAttribute('name', i+1);
            this._elements[i+1] = this._elements[i];
        }
        this._elements[index] = element;
        element.setAttribute('name', index );
        this._elements[index+1].insertBefore( element );
        return true;
    },

    removeItem: function( index )
    {
        if( index >= this._elements.length ) return;

        this._elements[index].destroy();
        for( var i = index; i < this._elements.length; i++)
        {
            this._elements[i] = this._elements[i+1];
            this._elements[i].setAttribute('name', i);
        }
        delete this._element[ this._elements.length-1];
    },

    currentItem: function()
    {
        return this._combo.node().selectedIndex;
    },

    currentText: function()
    {
        return this._elements[ this.currentItem() ].node().text;
    },

    setCurrentText: function( text )
    {
        this._elements[ this.currentItem() ].node().innerHTML = text;
    },

    text: function( index )
    {
        try
        {
            return this._elements[ index ].node().text;
        }
        catch(e)
        {
            throw new BException( RANGE_ERROR );
        }
    },

/*
* @public slots
*/

    clear: function()
    {
        while( this._elements.length != 0 )
        {
            this.removeItem( this._elements.length -1);
        }
    },

/*
* @signals
*/

    activated: function()
    {
        return this._combo.onchange();
    },

    highlighted: function()
    {
        // TODO: if just change the current without click
        return this._combo.onchange();
    },


/*
* @protected
*/

    generateDOMTree: function()
    {
        this.base();

        var combo = new BElement('select');
        combo.setId( this.getId(), 'combobox');
        combo.addStyleSheet('combobox');
        combo.setStyle('width', '100%');
        combo.setStyle('height', '100%');
        combo.setStyle('position', 'absolute');
        this._dom.appendChild( combo );
        this._combo = combo;
        return this._dom;
    },


});