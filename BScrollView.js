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

include('BWidget.js');
include('BElement.js');

var ScrollBarMode =
{
    Auto: 0x01,
    AlwaysOff: 0x02,
    AlwaysOn: 0x03,
};

var BScrollView = BWidget.extend(
{
    constructor: function( parent, name ) {
        this.base(parent, name)
    },

    setVScrollBarMode: function( /* ScrollBarMode */ mode ) {
        this.getDomElement().setStyle('overflowY', this.convertScrollMode(mode) );
        this._vscroll = mode;
    },

    vScrollBarMode: function()  {
        return this._vscroll;
    },

    setHScrollBarMode: function( /* ScrollBarMode */ mode)  {
        this.getDomElement().setStyle('overflowX', this.convertScrollMode(mode) );
        this._hscroll = mode;
    },

    hScrollBarMode: function() {
        return this._hscroll;
    },

/*
* @private
*/

    convertScrollMode: function( /*ScrollBarMode*/ mode ) {
        switch( mode ) {
            case 0x01: return 'auto';
            case 0x02: return 'hidden';
            case 0x03: return 'scroll';
        }
    },

    generateDOMTree: function()
    {
        this.base();
    }

});
