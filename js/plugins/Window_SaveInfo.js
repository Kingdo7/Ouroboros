Window_SaveInfo.prototype.drawDarkRect = function(dx, dy, dw, dh) {
//var color = this.gaugeBackColor(0); old
//var color = '#5A3A22'; use this for hex color
var color = this.textColor(0); //use this for MV color codes
this.contents.paintOpacity = 0;
this.contents.fillRect(dx + 1, dy + 1, dw - 2, dh - 2, color);
this.changePaintOpacity(true);
};