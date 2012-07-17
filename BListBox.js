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

include('BException.js');
include('BScrollView.js');
include('BElement.js');

var SelectionMode = {
    Single : 0x01,
    Multi : 0x02,
    Extended : 0x03,
    NoSelection : 0x04,
}


/*****
*   BListBox Class
*/

var BListBox = BScrollView.extend(
{
    constructor: function( parent, name ) {
        this.base(parent, name)
    },

    /**
     * Get how many elements contain the box
     */
    count: function(){
        return this._elements.length;
    },

    /**
     * Insert new item to the ListBox, at index. If the size of the
     * box is greater than index, then push the elements right.
     *
     * @param item {String} The string, that we want to insert
     * @param index {Integer} The index, where we want to insert.
     */
    insertItem: function( item, index ) {

        var newElement = new BElement('div');
        newElement.setStyle('position', 'relative');
        newElement.setStyle('top', '2px');
        newElement.setStyle('width', '100%');
        newElement.addStyleSheet('listboxElement');
        newElement.createTextNode( item );

        if( index > this._elements.length-1 )
            index = this._elements.length;

        for( var i = this._elements.length-1; i >= index ; i--) {
            this._elements[i+1] = this._elements[i];
            this._elements[i+1].setAttribute('name', i+1);
            this._elements[i+1].setId( this.getId(), i+1 )
        }
        newElement.setAttribute('name', index);
        newElement.setId( this.getId(), index);
        this._elements[index] = newElement;

        if( index == this._elements.length-1)   {
            this.getDomElement().appendChild( newElement );
        }
        else {
            this._elements[index+1].insertBefore( newElement );
        }
        connect( newElement, 'onclick', this, 'selectItem' );
    },

    /**
     * Remove element from the list
     *
     * @param {index} The index of the element which we want to delete
     */

    removeItem: function( index ) {
        try {
            this._elements[index].destroy();
            delete this._elements[index];
        }
        catch(e) {
            throw new BException(RANGE_ERROR);
        }
    },

    text: function( index ) {
        try {
            return this._elements[index].innerHTML;
        }
        catch(e) {
            throw new BException(RANGE_ERROR);
        }
    },

    changeItem: function( item, index ) {
        try {
            this._elements[index].createTextNode(item);
        }
        catch(e) {
            throw new BException( RANGE_ERROR );
        }
    },

    currentItem: function() {
        var ret = [];
        for( var i=0; i < this._selected.length; i++ )
            if( this._selected[i] == true )
                ret.push(i);

        switch( this._selection ) {
            case SelectionMode.NoSelection: return [];
            case SelectionMode.Single: return ret;
            case SelectionMode.Multi: return ret;

        }
    },

    setSelected: function( index, select ) {

        if( this._selection == SelectionMode.NoSelection )
            return;

        if( this._selection == SelectionMode.Single) {
            for( var i = 0; i < this._selected.length; i++) {
                if( this._selected[i] != undefined ) {
                    this.setDomSelected( i, false );
                    delete this._selected[i];
                }
            }
        }

        if( select != undefined ) {
            try {
                this._selected[index] = select;
                this.setDomSelected(index, select);
                return true;
            }
            catch(e) {
                throw new BException(RANGE_ERROR);
            }
        }

        try
        {
            var set = !this.isSelected(index);
            this._selected[index] = set;
            this.setDomSelected(index, set);
        }
        catch(e) {
            throw new BException(RANGE_ERROR);
        }
    },

    isSelected: function( index ) {
        return ( this._selected[index] == undefined ) ? false : this._selected[index];
    },

    setSelectionMode: function( /*SelectionMode*/ selection) {
        this._selection = selection;
    },

/*
* @protected slots
*/

    selectItem: function( event, element ) {
        index =  parseInt( $E(element).getName() );
        this.setSelected(index);
    },


/*
* @private
*/

    _elements: [],
    _selected: [],
    _selection: SelectionMode.Single,

    setDomSelected: function(index, select) {
        if( select ) {
            this._elements[index].addStyleSheet('listboxSelected');
        }
        else {
            this._elements[index].removeStyleSheet('listboxSelected');
        }
    },

    generateDOMTree: function()
    {
        this.base();
    }
});
