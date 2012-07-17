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

var BWindow = BWidget.extend(
{
    constructor: function( parent, name )
    {
        this.base();
        var level = BWindow.addWindow( this );
        this.setLevel( level );
        BWindow.setActiveWindow( this.getId() );
    },

    setChildWidget: function( widget )
    {
        // Every window contains only one widget... Because the widgets parent are null...
        this._child = widget;
        widget.getDomElement().setStyle('position', 'relative');
    },

    getChildWidget: function()
    {
        return this._child;
    },

    hide: function()
    {
        this._window.hide();
        return true;
    },

    show: function()
    {
        this._window.show();
        return true;
    },

    // Set the title of a window
    // @title: The new title of window
    _title: 'No Title',
    setTitle: function( title )
    {
        //this._title = title;
        //this.getTitleNode().nodeValue = title;
    },

    // Get the current window title
    getTitle: function()
    {
        return this._title;
    },

    // Get the DOM of the title. It contains the title of the window
    getTitleNode: function()
    {
        //this.skeleton();
        //return this._titleNode;
    },

    // Set the window Z-Index level. Here we can set the visibility
    // @level: In which level the window will be available
    _level: 0,
    setLevel: function( level )
    {
        this._window.setStyle('zIndex', level);
        this._level = level;
    },

    // Get the window's current level
    getLevel: function()
    {
        return this._level;
    },

    _xcoor: 0,
    setX: function( coor )
    {
        this._xcoor = coor;
        this._window.setStyle( 'left', coor + 'px');
    },

    _ycoor: 0,
    setY: function( coor )
    {
        this._ycoor = coor;
        this._window.setStyle( 'top', coor + 'px');
    },


    getX: function()
    {
        return this._xcoor;
    },

    getY: function()
    {
        return this._ycoor;
    },

    _width: undefined,
    setWidth: function( width )
    {
        this._width = width;
        this._window.setStyle('width', width + 'px');
        return this._width;
    },

    _height: undefined,
    setHeight: function( height)
    {
        this._height = height;
        this._window.setStyle('height', height + 'px');
        return this._height;
    },

    getWidth: function()
    {
        return this._width || this.getChildWidget().getWidth() + parseInt(this._border_left) + parseInt(this._border_right);
    },

    getHeight: function()
    {
        //TODO
    },

    getWindowNode: function()
    {
        return this._window;
    },

    // Generate the skeleton of the window. Here we set the visual elements
    // to the HTML code.
    _window: undefined,
    _titleBar: undefined,
    _titleText: undefined,
    _content: undefined,
    _bottomBorder: undefined,
    _contentNode: undefined,

    _border_left: undefined,
    _border_right: undefined,


    generateDOMTree: function()
    {
        var id = this.getId();
        // Frame
        this._window = new BElement('div');
        this._window.setId( id, 'window');
        this._window.addStyleSheet("frame");
        this._window.setStyle('position', 'absolute');
        this._window.setStyle('overflow', 'hidden');
        this._window.setStyle('display','block');
        this.setX(100);
        this.setY(300);

        this._titleBar = new BElement('div');
        this._titleBar.setId( id, 'titleBar' );
        this._titleBar.addStyleSheet('titleBar');
        this._titleBar.setStyle('position', 'relative' );
        this._titleBar.setStyle('left', '0px');
        this._titleBar.setStyle('top', '0px');
        this._titleBar.setStyle('right', '0px');
        this._window.appendChild( this._titleBar );

        var titleBorderLeft = new BElement('div');
        titleBorderLeft.setId( id, 'titleBorderLeft' );
        titleBorderLeft.addStyleSheet('titleBorderLeft');
        titleBorderLeft.setStyle('position','absolute');
        titleBorderLeft.setStyle('left', '0px');
        titleBorderLeft.setStyle('bottom', '0px');
        titleBorderLeft.setStyle('top', '0px');
        this._titleBar.appendChild(titleBorderLeft);

        var titleContent = new BElement('div');
        titleContent.setId( id, 'titleContent');
        titleContent.addStyleSheet('titleContent');
        titleContent.setStyle('position', 'absolute');
        titleContent.setStyle('height', '100%');
        titleContent.setStyle('width', '100%');
        titleContent.setStyle('display', 'block');
        this._titleBar.appendChild(titleContent);

        var titleIcon = new BElement('div');
        titleIcon.setId(id, 'titleIcon');
        titleIcon.addStyleSheet('titleIcon');
        titleIcon.setStyle('position', 'absolute');
        titleContent.appendChild(titleIcon);

        this.titleText = new BElement('div');
        this.titleText.setId( id, 'titleText' );
        this.titleText.addStyleSheet('titleText');
        this.titleText.setStyle('position', 'absolute');
        this.titleText.setStyle('overflow', 'hidden');
        this.titleText.setStyle('height','100%');
        titleContent.appendChild(this.titleText);

        var minimize = new BElement('div');
        minimize.setId( id, 'minimize' );
        minimize.addStyleSheet('minimize');
        minimize.setStyle('position', 'absolute');
        titleContent.appendChild(minimize);

        var maximize = new BElement('div');
        maximize.setId( id, 'maximize');
        maximize.addStyleSheet('maximize');
        maximize.setStyle('position', 'absolute');
        titleContent.appendChild(maximize);

        var close = new BElement('div');
        close.setId( id, 'close');
        close.addStyleSheet('close');
        close.setStyle('position', 'absolute');
        titleContent.appendChild(close);


        var titleBorderRight = new BElement('div');
        titleBorderRight.setId(id, 'titleBorderRight');
        titleBorderRight.addStyleSheet('titleBorderRight');
        titleBorderRight.setStyle('position', 'absolute');
        titleBorderRight.setStyle('right', '0px');
        titleBorderRight.setStyle('bottom', '0px');
        titleBorderRight.setStyle('top', '0px');
        this._titleBar.appendChild( titleBorderRight );

        this._content = new BElement('div');
        this._content.setId(id, 'content');
        this._content.setStyle('display', 'block');
        this._content.setStyle('position', 'relative');
        this._window.appendChild(this._content);



        var contentBorderLeft = new BElement('div');
        contentBorderLeft.setId(id, 'contentBorderLeft');
        contentBorderLeft.addStyleSheet('contentBorderLeft');
        contentBorderLeft.setStyle('display', 'table-cell');
        contentBorderLeft.setStyle('cursor', 'w-resize');
        this._border_left = contentBorderLeft.getStyle('width').split('px')[0] || 0;
        this._content.appendChild( contentBorderLeft );

        this.contentNode = new BElement('div');
        this.contentNode.setId(id, 'contentNode');
        this.contentNode.addStyleSheet('contentNode');
        this.contentNode.setStyle('display', 'table-cell');
        this._content.appendChild( this.contentNode );



        var contentBorderRight = new BElement('div');
        contentBorderRight.setId(id, 'contentBorderRight');
        contentBorderRight.addStyleSheet('contentBorderRight');
        contentBorderRight.setStyle('display', 'table-cell');
        contentBorderRight.setStyle('cursor', 'e-resize');
        this._border_right = contentBorderRight.getStyle('width' ).split('px')[0] || 0;
        this._content.appendChild( contentBorderRight );

        var bottom = new BElement('div');
        bottom.setId(id, 'bottom');
        bottom.addStyleSheet('bottom');
        bottom.setStyle('display', 'block');
        bottom.setStyle('position', 'relative');
        this._window.appendChild( bottom );


        var bottomBorderLeft = new BElement('div');
        bottomBorderLeft.setId(id, 'bottomBorderLeft');
        bottomBorderLeft.addStyleSheet('bottomBorderLeft');
        bottomBorderLeft.setStyle('position', 'absolute');
        bottomBorderLeft.setStyle('top', '0px');
        bottomBorderLeft.setStyle('left', '0px');
        bottomBorderLeft.setStyle('bottom', '0px');
        bottomBorderLeft.setStyle('cursor', 'sw-resize');
        bottom.appendChild(bottomBorderLeft);


        var bottomBorder = new BElement('div');
        bottomBorder.setId(id, 'bottomBorder');
        bottomBorder.addStyleSheet('bottomBorder');
        bottomBorder.setStyle('position', 'absolute');
        bottomBorder.setStyle('top', '0px');
        bottomBorder.setStyle('left', '0px');
        bottomBorder.setStyle('bottom', '0px');
        bottomBorder.setStyle('right', '0px');
        bottomBorder.setStyle('cursor', 's-resize');
        bottom.appendChild(bottomBorder);


        var bottomBorderRight = new BElement('div');
        bottomBorderRight.setId(id, 'bottomBorderRight');
        bottomBorderRight.addStyleSheet('bottomBorderRight');
        bottomBorderRight.setStyle('position', 'absolute');
        bottomBorderRight.setStyle('right', '0px');
        bottomBorderRight.setStyle('top', '0px');
        bottomBorderRight.setStyle('bottom', '0px');
        bottomBorderRight.setStyle('cursor', 'se-resize');
        bottom.appendChild(bottomBorderRight);


        connect( this._window, 'onclick', this, 'activateWindow' );
        connect( titleContent, 'ondblclick', this, 'titleDoubleClick' );
        connect( titleContent, 'onmousedown', this, 'dragWindowStart' );
        connect( titleContent, 'onmousedown', this, 'activateWindow' );
        connect( close, 'onclick', this, 'closeWindow');
        connect( minimize, 'onclick', this, 'minimize');
        connect( maximize, 'onclick', this, 'minimize' );

        connect( contentBorderLeft, 'onmousedown', this, 'resizeWindowL' );
        connect( contentBorderRight, 'onmousedown', this, 'resizeWindowR' );
        connect( bottomBorderRight, 'onmousedown', this, 'resizeWindowR' );
        connect( bottomBorderRight, 'onmousedown', this, 'resizeWindowB' );
        connect( bottomBorder, 'onmousedown', this, 'resizeWindowB' );
        connect( bottomBorderLeft, 'onmousedown', this, 'resizeWindowL' );
        connect( bottomBorderLeft, 'onmousedown', this, 'resizeWindowB' );
        connect( titleContent, 'onrightclick', this, 'nothing');

        this._bottomBorder = bottomBorder;
        this._dom = this.contentNode;
        return this._dom;
    },

    nothing: function(e)
    {
        return false;
    },

    windowWidth: function()
    {
        // TODO: need children element to know the width
    },


    // SLOTS....

    activateWindow: function()
    {
        BWindow.setActiveWindow( this.getId() );
    },

    resizeWindowL: function(e, object)
    {
        this._resize_x = Event.pointerX(e); //this.getX()-1;
        this.eventResizeL = this.resizeWindowLA.bindAsEventListener(this);
        this.eventResizeStop = this.resizeStop.bindAsEventListener(this);
        Event.observe( document, 'mousemove', this.eventResizeL );
        Event.observe( document, 'mouseup', this.eventResizeStop );
    },
    resizeWindowLA: function(e, object)
    {
        var pointer = Event.pointerX(e);
        var change = pointer - this._resize_x;
        this.setX( this.getX() + change );
        this.setWidth( this.getWidth() - change );
        this.getChildWidget().setWidth( this.getChildWidget().getWidth() - change );
        this._resize_x = pointer;
    },

    resizeWindowR: function(e, object)
    {
        this._resize_x = Event.pointerX(e); //this.getX() + this.getWidth();
        this.eventResizeR = this.resizeWindowRA.bindAsEventListener(this);
        this.eventResizeStop = this.resizeStop.bindAsEventListener(this);
        Event.observe( document, 'mousemove', this.eventResizeR );
        Event.observe( document, 'mouseup', this.eventResizeStop );

    },

    resizeWindowRA: function(e, object)
    {
        var pointer = Event.pointerX(e);
        var change = pointer - this._resize_x;
        this.setWidth( this.getWidth() + change );
        this.getChildWidget().setWidth( this.getChildWidget().getWidth() + change);
        this._resize_x = pointer;
    },

    resizeWindowB: function(e, object)
    {
        this._resize_y = Event.pointerY(e);
        this.eventResizeB = this.resizeWindowBA.bindAsEventListener(this);
        this.eventResizeStop = this.resizeStop.bindAsEventListener(this);
        Event.observe( document, 'mousemove', this.eventResizeB );
        Event.observe( document, 'mouseup', this.eventResizeStop );

    },

    resizeWindowBA: function(e, object)
    {
        var pointer = Event.pointerY(e);
        var change = pointer - this._resize_y;
        this.getChildWidget().setHeight( this.getChildWidget().getHeight() + change );
        this._resize_y = pointer;

    },

    resizeStop: function()
    {
        Event.stopObserving( document, 'mousemove', this.eventResizeL );
        Event.stopObserving( document, 'mousemove', this.eventResizeR );
        Event.stopObserving( document, 'mousemove', this.eventResizeB );
        window.getSelection().removeAllRanges();
    },

    // Hide the window on doubleclick
    _shade: false,
    titleDoubleClick: function()
    {
        if( !this._shade )
        {
            this._window.find('content').hide();
            this._window.find('bottom').hide();
            if( this._width == undefined )
                this.setWidth( this.getWidth() );
            this._shade = true;
            return;
        }
        else
        {
            this._window.find('content').show();
            this._window.find('bottom').show();
            this._shade = false;
            return;
        }
    },

    _m_x_coor: undefined,
    _m_y_coor: undefined,
    dragWindowStart: function( e, element )
    {
        this._m_x_coor = Event.pointerX(e);
        this._m_y_coor = Event.pointerY(e);

        this.eventDragStop = this.dragWindowStop.bindAsEventListener(this);
        this.eventDragWindow = this.dragWindow.bindAsEventListener(this);
        Event.observe( document, 'mouseup', this.eventDragStop );
        Event.observe( document, 'mousemove', this.eventDragWindow );
    },

    dragWindow: function( e, element )
    {
        this.setY( Event.pointerY(e) - this._m_y_coor + this.getY() );
        this.setX( Event.pointerX(e) - this._m_x_coor + this.getX());
        this._m_x_coor = Event.pointerX(e);
        this._m_y_coor = Event.pointerY(e);

//      this.setX( this.getX() - this._mouse_x_coor + Event.pointerX(e) );
    },

    dragWindowStop: function( e, element )
    {
        Event.stopObserving( document, 'mousemove', this.eventDragWindow );
        Event.stopObserving( document, 'mouseup', this.eventDragStop );
    },

    _title: '',
    setCaption: function( title )
    {
        this.titleText.createTextNode(title);
        this._title = title;
        return true;
    },

    caption: function()
    {
        return this._title;
    }

},
{

    _windows: [],
    _count: 0,

    // Add a window to the _windows array
    // @window: A BWindow object, which we want to add...
    addWindow: function( bwindow )
    {
        //var id = bwindow.getId();
        BWindow._windows[ bwindow.getId() ] = bwindow;
        BWindow._count += 1;
        return BWindow._count;
    },

    findWindowByWidget: function( widget )
    {
        for( var i=0; i< BWindow._windows.length; i++)
        {
            if( BWindow._windows[i] != undefined && BWindow._windows[i].getChildWidget() == widget )
            {
                return BWindow._windows[i];
            }
        }
    },

    // Get the Window Object by ID
    // @id : the id of window
    getWindow: function( id )
    {
        return BObject.getObject( id );
    },

    // Number of windows in the desktop
    countWindows: function( obj )
    {
        return BWindow._count;
    },

    // Set Z-index of the active window to max
    // @id : Id of window
    _current: undefined,
    setActiveWindow: function( id )
    {
        // Window which we want to be active
        var obj = BObject.getObject( id );
        // The Current level of the window
        var min_level = obj.getLevel();

        // For all windows
        for (  i in BWindow._windows )
        {
            // If element is not a window, then we return
            if( !(BWindow._windows[i] instanceof BWindow) )
            {
                continue;
            }

            // The current element in the iterator
            var current = BWindow.getWindow( i );

            // We don't change the low-level window
            if( current.getLevel() > min_level )
            {
                current.setLevel( current.getLevel() -1 );
            }

            // If the current element is the activate window
            // We change its level to max
            if( i == id )
            {
                current.setLevel( BWindow._count );
            }
        }
        if( BWindow._current != undefined )
            BWindow.getWindow( BWindow._current )._window.setStyle('opacity', '0.7');
        BWindow.getWindow(id)._window.setStyle('opacity', '1.0');
        BWindow._current = id;
    }
});
