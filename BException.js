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

var CONSTRAINT_ERROR = 0x1;
var RANGE_ERROR = 0x2;

var BException = Base.extend(
{

    constructor: function( module, error, code)
    {
        this.module = module;
        this.error = error;
        this.code = code;

    },

    getModule: function()
    {
        return this.module;
    },

    getError: function()
    {
        return this.error;
    },

    getErrorCode: function()
    {
        return this.code;
    },

});