/*:
-------------------------------------------------------------------------------
@title Window Background Designer
@author Hime --> HimeWorks (http://himeworks.com)
@version 1.1
@date Apr 25, 2016
@filename HIME_WindowBackgroundDesigner.js
@url http://himeworks.com/2016/04/window-background-designer/

If you enjoy my work, consider supporting me on Patreon!

* https://www.patreon.com/himeworks

If you have any questions or concerns, you can contact me at any of
the following sites:

* Main Website: http://himeworks.com
* Facebook: https://www.facebook.com/himeworkscom/
* Twitter: https://twitter.com/HimeWorks
* Youtube: https://www.youtube.com/c/HimeWorks
* Tumblr: http://himeworks.tumblr.com/

-------------------------------------------------------------------------------
@plugindesc v1.1 - Decorate all of your windows with custom images
@help 
-------------------------------------------------------------------------------
== Description ==

Tired of the same old windows? Want to use your own custom image to create your
background?

This plugin allows you to assign images to your windows and use them as the
window backgrounds. It also allows you to remove the window frame so that all
the player will see is your custom image.

Images are drawn under the contents of the window, so text and other images
drawn on the window will be displayed above the image.

This plugin supports any window, as long as you add them to the supplied
configuration file.

== Terms of Use ==

- Free for use in non-commercial projects with credits
- Free for use in commercial projects, but it would be nice to let me know
- Please provide credits to HimeWorks

== Change Log ==

1.1 - Apr 25, 2016
 * Fixed bug with scene-specific entries.
1.0 - Apr 1, 2016
 * initial release

== Usage ==

In the data folder, create a configuration file called "window_config.csv".
This file will store all of the backgrounds that will be used for your windows.

The format of the file is

Window Name,Image Name (in System folder),Window Opacity,Scene Name
Window_MenuStatus,bg_menuStatus,0,
Window_MenuCommand,bg_menuCommand,0
  
You can start by copying this into your csv file, or just download a template
that I have provided.
  
All images will be stored in the img/system folder.

You can then determine which image will be used for which windows, depending
on which scene you're in.

-- Assigning Images to Windows --

This plugin assigns images based on the class name of the window as it is
defined in the code.

In the template configuration file, I have written down a list of windows
that exist in the default codebase, so you just need to figure out
which one is the window you want.

The names are somewhat intuitive most of the time. For example,

“Window_Gold” refers to the window that is used to display how much
gold you have.

“Window_MenuStatus” refers to the window that displays all of the
actors in the menu

“Window_EquipList” refers to the window that shows all of the equips
you can choose to equip, in the equip menu

If you are using plugins that provide custom windows, you will have to
figure out the name of the window and add it to the configuration file.
This is typically done by opening up the plugin and looking for something
of the form

   function WINDOW_SOMETHING()

Where WINDOW_SOMETHING is the name of the window you’re interested in.
It doesn’t always follow this pattern, but if you’re lucky they will be.
You can always have something tell you what the window names are.

-- Setting Window Opacity

By default, all windows have an opacity of 255.
If you would like to make the window transparent, you can set that to 0.

-------------------------------------------------------------------------------
 */ 
var Imported = Imported || {} ;
var TH = TH || {};
Imported.TH_WindowBackgroundDesigner = 1;
TH.WindowBackgroundDesigner = TH.WindowBackgroundDesigner || {};

(function ($) {

  $.configLoaded = false;
  
  $.getData = function(windowName) {
    return $._data[windowName];
  };

  $.loadConfig = function() {
    var xhr = new XMLHttpRequest();
    var url = 'data/window_config.csv';
    xhr.open('GET', url);
    // xhr.overrideMimeType('application/json');
    xhr.onload = function() {
      if (xhr.status < 400) {
        $.onLoad(xhr.responseText);
      }
    };
    xhr.onerror = function() {
        DataManager._errorUrl = DataManager._errorUrl || url;
    };
    xhr.send();
  };
  
  $.onLoad = function(data) {
    $._data = {};
    data = data.split("\n");
    for (var i = 1; i < data.length; i++) {
      var dat = {}
      var tokens = data[i].split(",");
      dat.windowName = tokens[0];
      dat.imageName = tokens[1];
      dat.opacity = Math.floor(tokens[2]);
      dat.sceneName = tokens[3];
      
      var key;
      if (dat.sceneName !== '') {
        key = dat.sceneName + "-" + dat.windowName;
      }
      else {      
        key = dat.windowName;
      }
          
      $._data[key] = dat;
    }
    $.configLoaded = true;
  };
  
  var TH_DataManager_loadDatabase = DataManager.loadDatabase;
  DataManager.loadDatabase = function() {
    TH_DataManager_loadDatabase.call(this);
    $.loadConfig();
  };

  var TH_DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
  DataManager.isDatabaseLoaded = function() {
    var res = TH_DataManager_isDatabaseLoaded.call(this);
    if (res) {
      res = $.configLoaded;
    }
    return res;
  };
  
  var TH_WindowBase_initialize = Window_Base.prototype.initialize;
  Window_Base.prototype.initialize = function(x, y, width, height) {
    TH_WindowBase_initialize.call(this, x, y, width, height);
    var data = $.getData(SceneManager._scene.constructor.name + "-" + this.constructor.name);
    if (!data) {
      data = $.getData(this.constructor.name);
    }    
    if (data) {
      this.opacity = data.opacity;
      this._bgSprite = new Sprite();
      // this._bgSprite.move(0, 0, this.width, this.height);
      this._bgSprite.bitmap = ImageManager.loadSystem(data.imageName);
      this.addChildAt(this._bgSprite, 0);
    }
  };

})(TH.WindowBackgroundDesigner);