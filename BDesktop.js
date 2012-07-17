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

var BDesktop = Base.extend(
{
    _desktop_node: undefined,
    _dock_node: undefined,
    constructor: function()
    {
        this._desktop_node = new BElement('div');
        this._dock_node = new BElement('div');
        this._windows = new BElement('div');

        // For multiple desktop we need to controll this id, but now we fixed it...
        var id = 1;

        this._desktop_node.setId(id, 'Desktop');
        this._dock_node.setId(id, 'Dock');

        this._desktop_node.setStyle('height', '100%');
        this._desktop_node.setStyle('width', '100%');
        this._desktop_node.setStyle('top', '0px');
        this._desktop_node.setStyle('left', '0px');
        this._desktop_node.setStyle('position', 'absolute');
        this._desktop_node.setStyle('background', 'url(Desktop/background.jpeg)');

        if ( BDesktop._body == undefined) BDesktop.createBody();


        BDesktop._body.appendChild( this._desktop_node );
        this._desktop_node.appendChild( this._dock_node );
        BDesktop.addDesktop( this );

    },

    getDesktopNode: function()
    {
        return this._desktop_node;
    },

    getDockNode: function()
    {
        return this._dock_node;
    },

    changeWindowWidth: function()
    {

    },

    changeWindowHeight: function()
    {

    },

    getWindowWidth: function()
    {
        return window.innerWidth;
    },

    getWindowHeight: function()
    {
        return window.innerHeight;
    },

},
{
    _desktops : [],
    _body: undefined,
    createBody: function()
    {
        var html = BElement.find('BonanzaGUI');
        BDesktop._body = new BElement('body');
        BDesktop._body.setAttribute( 'oncontextmenu' , 'return false;');
        html.appendChild(BDesktop._body);
    },

    addDesktop: function( desktop )
    {
        BDesktop._desktops[ BDesktop._desktops.length ] = desktop;
    },

    getActiveDesktop: function()
    {
        if( BDesktop._desktops.length == 0 )
        {
            var desk = new BDesktop;
            BDesktop.addDesktop(desk);
        }
        return BDesktop._desktops[0];
    }
});