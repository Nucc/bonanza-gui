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

include('BWindow.js');
include('BDesktop.js');
include('BElement.js');

var MainLabel = 'Desktop';
var Dock = 'Dock';

var BPaintDevice = Base.extend(
{
    constructor: function()
    {
        // It must be singleton, but the language doesn't support it
        // I'm thinking of the problem...
        BPaintDevice._device= (BPaintDevice._device == undefined) ? this : BPaintDevice._device;
        return BPaintDevice._device;
    },

    setCaption: function( widget, name )
    {
        if( widget.getParent() != null ) return false;
        var win = BWindow.findWindowByWidget(widget);
        return win.setCaption(name);
    },

    caption: function( widget )
    {
        if( widget.getParent() == null ) return null;
        return BWindow.findWindowByWidget(widget).caption(name);
    },

    setWidth: function(widget, size)
    {
        widget.getDomElement().setStyle('width', size + 'px');
        if( widget.getParent() != null )
        {
            return size;
        }

        BWindow.findWindowByWidget(widget).setWidth( size );

    },

    draw: function( widget )
    {
        var parent = widget.getParent();
        var element;

        if( widget instanceof BDock )
        {
            element = BDesktop.getActiveDesktop().getDockNode();
        }
        else if( parent == null )
        {
            var win = new BWindow;
            element = win.getDomElement();
            BDesktop.getActiveDesktop().getDesktopNode().appendChild( win.getWindowNode() );

            win.setChildWidget(widget);
        }
        else
        {
            element = parent.getDomElement();
        }

        element.appendChild( widget.getDomElement() );
    },

    hide: function( widget )
    {
        if( widget.getParent() != null )
        {
            widget.getDomElement().hide();
            return true;
        }
        return BWindow.findWindowByWidget(widget).hide();
    },

    show: function( widget )
    {
        if( widget._painted != true )
        {
            widget.rePaint();
        }

        if( widget.getParent() != null )
        {
            widget.getDomElement().show();
            return true;
        }

        if( widget instanceof BDock )
        {
            widget.getDomElement().show();
            return true;
        }

        return BWindow.findWindowByWidget(widget).show();
    },

    destroy: function( widget )
    {
        // Drop Element from the document
    }

},
{
    _device: undefined,
    _window: window,

    getDevice: function()
    {
        if( BPaintDevice._device == undefined )
        {
           BPaintDevice._device =  new BPaintDevice;
        }
        return BPaintDevice._device;
    }

});
