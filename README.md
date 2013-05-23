Bonanza GUI
===========

The aim of this project is to implement the Qt UI framework with window manager in javascript.

Demo video: http://www.youtube.com/watch?v=hYE8oewhFkE

The implemented features:

BWidget
-------

BWidget is a container to store special widgets (buttons, comboboxes, ...) inside it. If you don't define parent widget in its constructor, the widget gets window frame.

<pre>
var widget = new BWidget();
widget.setWidth(445);
widget.setHeight(55);
widget.show();
</pre>

Note: Without defining its parent it creates a window border with close and minimize icons.

BButton
---------------

You can use signal-slot mechanism to bind the button click signal to a method.
<pre>
var button = new BButton();
button.show();
button.setWidth(445);
button.setHeight(55);
button.setText('This is a button...');
connect(button, 'onclick', this, 'selection');

function selection()
{
	alert("Clicked");
}
</pre>


BCombobox
---------

<pre>
var combobox = new BComboBox();
combobox.setWidth(150);
combobox.setHeight(20);
combobox.insertItem('This', 0);
combobox.insertItem('is', 1);
combobox.insertItem('a', 2);
combobox.insertItem('combobox', 2);
combobox.show();
</pre>

Get the selected value of the combobox:
<pre>
combobox.currentText();
</pre>

Change to multi-selection mode:
<pre>
combobox.setSelectionMode( SelectionMode.Multi );
</pre>


BListBox
--------

<pre>
var listbox = new BListBox(parent_widget, 'my listbox');
listbox.setWidth(100);
listbox.setHeight(60);
listbox.show();

listbox.insertItem('one',0);
listbox.insertItem('two',1);
listbox.insertItem('three', 1);
</pre>

Window containing buttons
-------------------------

Creating 3x3 button widget in a window. You just need to set common widget element as a parent of the buttons to see them in the same window.

<pre>
var window = new BWidget();
window.setCaption('3x3 buttons');

for(var i = 0; i != 10; i++)
{
	var button = new BButton(window);
	button.setHeight(50);
	button.setWidth(50);
	button.setText(i+1);
	button.setX( 50 * (i % 3) + 1);
	button.setY( 50 * parseInt(i / 3));
	button.show();
    connect( button, 'onclick', button, 'hide');
}

window.setWidth(150);
window.setHeight(150);
window.show();
</pre>


OSX like dock
-------------

Just for fun there is a BDock element to create a dock widget like in OSX's window manager.
<pre>
var dock = new BDock;
var icon = new BImage('icon/finder.png', 50, 50 );
dock.addImage( icon );
var icon = new BImage('icon/mail.png', 50, 50 );
dock.addImage( icon );
var icon = new BImage('icon/browser.png', 50, 50 );
dock.addImage( icon );
dock.show();
</pre>
