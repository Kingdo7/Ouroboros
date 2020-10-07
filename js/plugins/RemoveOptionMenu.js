//=============================================================================
// RemoveOptionMenu.js
//=============================================================================
 
/*:
 * @plugindesc Plugin used to remove some option in the menu
 * @author Oniromancie (rpg-maker.fr)
 *
 * @help This plugin remove the options 'alwaysDash' and 'commandRemember' for the main menu
 *
 */
 
(function() {
 
    Window_Options.prototype.makeCommandList = function() {
            //this.addGeneralOptions();
            this.addVolumeOptions();
    };

})();