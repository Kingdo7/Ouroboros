Scene_Gameover.prototype.gotoTitle = function() {
    SceneManager.goto(Scene_Boot);
};

Scene_GameEnd.prototype.commandToTitle = function() {
    this.fadeOutAll();
    SceneManager.goto(Scene_Boot);
};

// Return to Title Screen
Game_Interpreter.prototype.command354 = function() {
    SceneManager.goto(Scene_Boot);
    return true;
};