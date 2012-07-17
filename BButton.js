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

var BButton = BWidget.extend(
{
    constructor: function( parent, name)
    {
        this.base(parent, name);
    },

    text: function()
    {
        return this._text;
    },

    setText: function(text)
    {
        this._text = text;
        this._button.setAttribute('value', text);
    },

    // Image: BImage object
    setImage: function( /* BImage */ image )
    {
        this._button.setStyle('backgroundImage', "url(\"" + image.getImageUrl() + "\")");
    },

    generateDOMTree: function()
    {
        this.base();
        this._button = new BElement('input');
        this._button.setId( this.getId(), 'button')
        this._button.setAttribute('type', 'button');
        this._button.setStyle('position', 'absolute');
        this._button.setStyle('width', '100%');
        this._button.setStyle('height', '100%');
        this._dom.appendChild( this._button );
    },

    /*signal*/
    onclick: function()
    {
        return this._button.onclick();
    },

});
