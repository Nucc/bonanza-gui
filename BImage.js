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

var BImage = BObject.extend(
{

    constructor: function( image_url, width, height )
    {
        this.base();
        this._imageUrl = image_url;
        this._iconNode = new BElement('img');
        this._iconNode.setAttribute('src', image_url);
        this._iconNode.setId( this.getId() );

        ( width == undefined ) ? this.setWidth(40) : this.setWidth(width);
        ( height == undefined ) ? this.setHeight(60) : this.setHeight(height);
    },

    _width: undefined,
    setWidth: function( w )
    {
        this._width = w;
        this._iconNode.setStyle('width', w + 'px');
    },

    _height: undefined,
    setHeight: function( h )
    {
        this._height = h;
        this._iconNode.setStyle('height', h + 'px');
    },

    getHeight: function()
    {
        return this._height;
    },

    getWidth: function()
    {
        return this._width;
    },

    getImageElement: function()
    {
        return this._iconNode;
    },

    _image_url: undefined,
    getImageUrl: function()
    {
        return this._imageUrl;
    }

});