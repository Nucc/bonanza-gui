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
include('BImage.js');
include('lib/prototype.js');

var BDock = BWidget.extend(
{
    _dock_node: undefined,
    _iconSize: 48,
    _zoom: 50,
    _range: 150,
    _icons: [],

    constructor: function()
    {
        this.base();
    },

    addImage: function( /* BImage */ image)
    {
        this._icons.push(image);

        var element = image.getImageElement();
        element.setStyle('position', 'relative');
        element.setStyle('bottom', '0px');
        element.setStyle('padding', '0px');
        element.setStyle('margin', '0px');
        element.setStyle('left', '0px');
        image.setWidth( this._iconSize );
        image.setHeight( this._iconSize );

        this._dom.appendChild( element );

        this._originalWidth = this._iconSize * this._icons.length +1;
        this.setWidth( this._originalWidth );

        this._dom.setStyle('bottom', '0px');
        this._left = ( BDesktop.getActiveDesktop().getWindowWidth()-this.getWidth() )/2;
        this.setX( this._left );
        this._dom.setStyle('zIndex', 1000 ); // TODO max window level + 1
        connect( element, 'onmouseover', this, 'startWaving');
        connect( element, 'onmousemove', this, 'isWaving');
        connect( this._dom, 'onmouseout', this, 'leaveDock');
    },

    _actual_index: undefined,
    startWaving: function(e, object)
    {
        // Search the actual element from the icons array
        for( i in this._icons )
        {
            if( this._icons[i] instanceof BImage && this._icons[i].getId() == object.id.split('_')[0] )
            this._actual_index = i;
        }
    },

    iconSize: function( half, x )
    {
        return Math.max( this._iconSize * this._zoom * this.getGauss( half, x, this._range ), this._iconSize);
    },

    isWaving: function(e)
    {
        var x = Event.pointerX(e) - this.getX();
        var index = this._actual_index;
        var half = x;

        var length = 0;
        for( i in this._icons )
        {
            if( this._icons[i] instanceof BImage )
            {
                var size = this.iconSize( x, length + this._icons[i].getHeight() / 2);
                length += size;
                this.setWidth( length + 1 );
                this._icons[i].setHeight( size );
                this._icons[i].setWidth( size );
            }
        }
        this.setX( this._left +( (this._originalWidth - length)/2) );
    },

    leaveDock: function(e)
    {
        if( Event.pointerX(e) >= this.getX() && Event.pointerX(e)+5 <= this.getX() + this.getWidth()-5 &&
        Event.pointerY(e) > BDesktop.getActiveDesktop().getWindowHeight()- this._iconSize )
            return;

        for( i in this._icons )
        {
            if( this._icons[i] instanceof BImage )
            {
                this._icons[i].setWidth( this._iconSize );
                this._icons[i].setHeight( this._iconSize );
            }
        }
        this.setX( this._left );
        this.setWidth( this._iconSize * this._icons.length );
    },

    getGauss: function( m, x, ordo)
    {
        var comp = 1 / Math.sqrt( 2 * Math.PI * ordo );
        var exp = Math.exp( - Math.pow( ( x - m ), 2)/ (2 *Math.pow((ordo),2)));
        return comp*exp;
    },

    generateDOMTree: function()
    {
        this.base();
        var background = new BElement('div');
        background.setStyle('background', 'url("Dock/background.png")');
        background.setStyle('opacity', '.40');
        background.setStyle('position', 'absolute');
        background.setStyle('height', this._iconSize + 'px');
        background.setStyle('bottom', '0px');
        background.setStyle('width', '100%');
        this._dom.appendChild( background );
    },

});
