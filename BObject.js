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

include('lib/prototype.js');

var BObject = Base.extend({

    /******
    //      Create new BObject...
    //      @parent = Parent BObject. It has to be BObject
    //      @name   = Name of the widget
    */

    constructor: function( parent, name)
    {
        try
        {
            this.parent = ( parent == undefined ) ? null : parent;
            this.name = name;
            this.children = [];
            this.id = BObject.getId( this );
        }
        catch( e )
        {
            switch(e)
            {
                case RANGE_ERROR:
                    alert( 'Can\'t create widget ' );
                    delete this;
                    break;
            }
        }

        if( this.parent != null )
        {
            parent.setChild( this );
        }
    },

    destroy: function()
    {
        BObject.deleteId( this );
    },

    setName: function( name )
    {
        this.name = name
    },

    getName: function()
    {
        return this.name;
    },

    setParent: function( /* BObject */ parent )
    {
        if( !(parent instanceof BObject) ) return;
        this.parent = parent;
        parent.setChild( this );
    },

    getParent: function()
    {
        return this.parent;
    },



    setChild: function( child )
    {
        this.children[ this.children.length ] = child;
    },

    getChildren: function()
    {
        return this.children;
    },

    getId: function()
    {
        return this.id;
    },

},
    // Static tags
{

    // ID Controller

    _lastId: 0x0,
    _maxRange: 0xFFFFFFFF,
    _widgets: [],
    getId: function( object )
    {
        var id = BObject._lastId +1;
        var max = 0;
        while ( BObject._widgets[id] != undefined && max < BObject._maxRange)
        {
            id = (id+1) % BObject._maxRange;
            max += 1;
        }

        if ( BObject._widgets[ id ] == undefined )
        {
            BObject._widgets[ id ] = object;
            return id;
        }
        else
        {
            throw RANGE_ERROR;
        }
    },

    deleteId: function( object )
    {
        delete BObject._widgets[ object.getId() ];
    },

    getObject: function( obj )
    {
        return BObject._widgets[obj];
    },

    signal: function( element, signal)
    {
        this.element = element;
        this.signal = signal;
    },

    connect: function( source, signal, target, slot )
    {
        try
        {

            var sig = eval('source.' + signal ).call(source);
            var calling = eval( 'target.' + slot + '.bindAsEventListener(target)' );
            ret = Event.observe(sig.element, sig.signal, calling);
        }
        catch(e)
        {

        }
        return ret;
    }
}
);

connect = BObject.connect;
signal = BObject.signal;
