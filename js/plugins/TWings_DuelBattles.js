//=============================================================================
// TWings Plugins
// TWings_DuelBattles.js
//=============================================================================

/*:
 * @plugindesc v1.42 Creates Suikden-like Duel Battles
 * @author TWings (Pierre-Alain Huille)
 *
 * @param GSetting
 * @text Global settings
 *
 * @param dMode
 * @parent GSetting
 * @type select
 * @text Duel type
 * @desc Type of duels : Suikoden-like or Rock/Paper/Scissors.
 * @option Suikoden
 * @value Suikoden
 * @option RPS
 * @value RPS
 * @default Suikoden
 *
 * @param atkCmd
 * @parent GSetting
 * @type text
 * @text Attack command name
 * @desc Name of the Attack command.
 * @default Attack
 *
 * @param grdCmd
 * @parent GSetting
 * @type text
 * @text Guard command name
 * @desc Name of the Guard command.
 * @default Guard
 *
 * @param speCmd
 * @parent GSetting 
 * @type text
 * @text Special command name
 * @desc Name of the Special command.
 * @default Special
 *
 * @param critMulti
 * @parent GSetting 
 * @type number
 * @min 2
 * @text Critical multiplier
 * @desc How much damage is increased by critical.
 * @default 3
 *
 * @param rsltWinCfg
 * @parent GSetting
 * @text Turn result window
 *
 * @param rsltWin
 * @parent rsltWinCfg  
 * @type boolean
 * @text Active
 * @desc Display an information every turn about the turn's outcome.
 * @default false
 *
 * @param rsltTxtWin
 * @parent rsltWinCfg
 * @type text
 * @text Win text
 * @desc Text displayed when the player wins.
 * @default Win
 *
 * @param rsltTxtLose
 * @parent rsltWinCfg
 * @type text
 * @text Lose text
 * @desc Text displayed when the player loses.
 * @default Lose
 *
 * @param rsltTxtDraw
 * @parent rsltWinCfg
 * @type text
 * @text Draw text
 * @desc Text displayed when it's a draw.
 * @default Draw
 * 
 * @param PSetting
 * @text Player settings
 *
 * @param atkId
 * @parent PSetting  
 * @type number
 * @min 1
 * @text Attack skill id
 * @desc Database id of the skill to use as player's Attack.
 * @default 1
 * 
 * @param speId
 * @parent PSetting  
 * @type number
 * @min 3
 * @text Special skill id
 * @desc Database id of the skill to use as player's Special.
 * @default 3
 *
 * @param ESetting
 * @text Enemies settings
 *
 * @param eAtkSwitch
 * @parent ESetting  
 * @type number
 * @min 1
 * @text Attack switch id
 * @desc Switch id for enemies attack.
 * @default 1
 *
 * @param eSpeSwitch
 * @parent ESetting  
 * @type number
 * @min 2
 * @text Special switch id
 * @desc Switch id for enemies special.
 * @default 2
 *
 * @param EnmyAtkPtrn
 * @parent ESetting   
 * @type struct<dEnmyAtkPtrn>[]
 * @text Attack patterns
 * @desc 0=Attack/1=Guard/2=Special.
 * @default []
 *
 * @param RPSMod
 * @text RPS Mode
 *
 * @param grdId
 * @parent RPSMod  
 * @type number
 * @min 2
 * @text Player Guard skill id
 * @desc Database id of the skill to use as player's Guard.
 * @default 2
 *
 * @param eGrdSwitch
 * @parent RPSMod  
 * @type number
 * @min 3
 * @text Enemies Guard switch id
 * @desc Switch id for enemies guard.
 * @default 3
 *
 * @help
 * Free to use with proper credit for non-commercial games.
 * Contact me for commercial games : Discord https://discord.gg/m85SkuY
 * 
 * --------------------------------------------------------------------------------
 *
 * This plugin adds an alternative battle mode.
 * It's inspired from the Suikoden games Duel Battles.
 * You can choose which actor to use and Turn the Duel Mode on or off.
 *
 * This plugin is not plug&play !
 * Make sure to properly define the Attack Switch and Special Switch
 * (that you'll use as conditions for Duel enemies skills). 
 * Be aware that those 2 switches will be used by the plugin 
 * and be turned ON/OFF during Duel Battles.
 * If you're using the RPS duel type, there's also have a 3rd switch for Guard.
 *
 * This plugin may not be compatible with other battle system altering plugins ! 
 *
 * When using Yanfly plugins, make sure to put this plugin after them.
 *
 * --------------------------------------------------------------------------------
 * 
 * Plugin Commands:
 *
 * --------------------------------------------------------------------------------
 *
 * DuelBtlActor [actor id] ([attack skill id] [special skill id] [guard skill id])
 * Select Actor X (Database id) for Duel Battle (to use before Battle Processing).
 * Example 1 :
 *        DuelBtlActor 1
 *        Set the Actor 1 for the next Duel Battle.
 * Example 2 :
 *        DuelBtlActor 3 7 8 
 *        Set the Actor 3 for the next Duel Battle,
 *        with skill 7 as Attack and skill 8 as Special.
 * Example 3 :
 *        DuelBtlActor 2 3 9 4 
 *        Set the Actor 2 for the next Duel Battle,
 *        with skill 3 as Attack, skill 9 as Special and skill 4 as Guard.
 *        The Guard skill modification is only available when using RPS.
 *
 * DuelBtlON
 * Change the default battles system into Duel Battles.
 *
 * DuelBtlOFF
 * Back to default battles system.
 *
 * DuelHintFace [file name] [index]
 * Define the face picture to use in hint messages.
 * Example :
 *        DuelBtlActor Actor1 3
 *        Use the face picture from Actor1.png index 3 for hint messages.
 *
 * DuelHintAtk [text]
 * DuelHintGrd [text]
 * DuelHintSpe [text]
 * Define a hint message to display respectively for Attack, Guard and Special.
 * Use the same command multiple times to definie multiple messages.
 * They'll be picked randomely or in order according to the enemy's pattern.
 * Example :
 *        DuelHintAtk I'm gonna win !
 *        When the enemy is preparing an Attack action, the "I'm gonna win !"
 *        message will be displayed.
 *
 * DuelHintClear
 * Clear the hint parameters.
 * 
 * --------------------------------------------------------------------------------
 *
 * Parameters: (to complete)
 *
 * --------------------------------------------------------------------------------
 *
 * - Global settings :
 *   - Duel type :
 *   Defines the Duel Battle system.
 *   Suikoden : Works similarly to the feature in the Suikoden games.
 *   RPS : True Rock / Paper / Scissors system.
 *         Attack = Rock / Guard = Scissors / Special = Paper
 *   - Attack command name :
 *   Name to display for the duel Attack command.
 *   - Guard command name :
 *   Name to display for the duel Guard command.
 *   - Special command name :
 *   Name to display for the duel Special command.
 *   - Critical multiplier :
 *   How much more damage are dealt by critical hits durin duels.
 *   Critical hits occurs on counters and Special attacks (Suikoden Duel type).
 *   - Turn result window :
 *   Configuration of the Turn result window. This window adds a visual
 *   indication about what happened each turn (won, lost or draw).
 *     - Active :
 *     Activate/Deactivate the window.
 *     - Win text :
 *     Text to display when the player wins.
 *     - Lose text :
 *     Text to display when the player loses.
 *     - Draw text :
 *     Text to display when it's a draw between the player and the enemy. 
 *
 * - Player settings :
 *   - Attack skill id :
 *   Id of the skill in the database to use as the player's duel Attack.
 *   - Special skill id :
 *   Id of the skill in the database to use as the player's duel Special. 
 *
 * - Enemies settings :
 *   - Attack switch id :
 *   Id of the switch to be used as condition for the duel enemies Attacks.
 *   You will need to define the same switch in the database as skill condition.
 *   This switch will be turned ON and OFF by the plugin multiple times
 *   during duel battles, so don't use it elsewhere !
 *   - Special switch id :
 *   Id of the switch to be used as condition for the duel enemies Specials.
 *   You will need to define the same switch in the database as skill condition.
 *   This switch will be turned ON and OFF by the plugin multiple times
 *   during duel battles, so don't use it elsewhere !
 *   - Attack patterns :
 *   (Advanced option)
 *   The default attack pattern for duel enemies is random.
 *   Add only the enemies for who you want to define a specific attack pattern !
 *     - Enemy id : 
 *     Id of the enemy in the database.
 *     - Attack pattern : 
 *     Ordered list of the enemy's actions (0=Attack / 1=Guard / 2=Special).
 *     Loops back from the start when it gets to the end of the list.
 *
 * - RPS Mode :
 * Those parameters will be relevant only if you're using the RPS Duel type.
 *   - Player Guard skill id :
 *   Id of the skill in the database to use as the player's duel Guard.
 *   - Enemies Guard switch id :
 *   Id of the switch to be used as condition for the duel enemies Guards.
 *   You will need to define the same switch in the database as skill condition.
 *   This switch will be turned ON and OFF by the plugin multiple times
 * 
 * --------------------------------------------------------------------------------
 *
 * Versions history :
 *
 * -------------------------------------------------------------------------------- 
 *
 * - Version 1.42 :
 *      + Multiple Hint messages.
 *      + Performance optimisation.  
 *
 * - Version 1.41 :
 *      + New turn result window option.
 *
 * - Version 1.40 :
 *      + New Hint message feature. 
 *
 * - Version 1.30 :
 *      + New true Rock/Paper/Scissors mode (with customisable Guard skill).
 *      + Customisable player Attack skill.
 *      + Updated plugin commands to change the player attacks and special in game.
 *      + Memory usage optimisation. 
 *      + More detailed and organised plugin description.
 * 
 * - Version 1.21 : 
 *      + The Special vs Guard case was causing an error.
 * 
 * - Version 1.20 : 
 *      + Customisable player Special skill.
 *      + Customisable enemies Attack and Special skills.
 *  
 * - Version 1.10 : 
 *      + There was a small compatibility issue with RMMV 1.6+
 *      + Fixed compatibility with YEP_BattleStatusWindow.
 *      + Changed the refresh timing of the enemy HP gauge.
 *      + Fixed Actor/enemy action sequences.
 *      + Fixed a bug occuring when looping an attack pattern.
 * 
 * - Version 1.01 : 
 *      + A bug was crashing the game at the end of a duel battle.
 *      + Some debug lines were displayed in the console.
 * 
 * - Version 1.00 : 
 *      + Release.
 */
/*~struct~dEnmyAtkPtrn:
 * @param enmyId
 * @type number
 * @text Enemy id
 * @min 1
 * @default 1
 * @param atkPtrn
 * @type number[]
 * @min 0
 * @max 2 
 * @text Attack pattern
 * @desc 0=Attack/1=Guard/2=Special
 */ 
var Imported=Imported||{},TW=TW||{};function TW_DuelEnemy(t,e){this.actorId=t,this.actionList=e,this.nbActions=e.length,this.lastAction=0,this.getAction=function(){var t=this.actionList[this.lastAction],e=this.nbActions-1;return this.lastAction<e?this.lastAction++:this.lastAction=0,t}}function TW_DuelSetting(){this.enemies=Array(),this.nbenemies=0,this.addEnemy=function(t,e){this.enemies[t]=new TW_DuelEnemy(t,e),this.nbenemies++},this.isNotRandom=function(t){return!!this.enemies[t]},this.clearActions=function(){for(var t of this.enemies)t&&(t.lastAction=0,TW.duelBattles.hintTracker=[])}}if(TW.duelBattles=TW.duelBattles||{},TW.duelBattles.params=PluginManager.parameters("TWings_DuelBattles"),TW.duelBattles.atkCmd=String(TW.duelBattles.params.atkCmd||"Attack"),TW.duelBattles.grdCmd=String(TW.duelBattles.params.grdCmd||"Guard"),TW.duelBattles.speCmd=String(TW.duelBattles.params.speCmd||"Special"),TW.duelBattles.atkId=Number(TW.duelBattles.params.atkId||1),TW.duelBattles.speId=Number(TW.duelBattles.params.speId||3),TW.duelBattles.critMulti=Number(TW.duelBattles.params.critMulti||3),TW.duelBattles.turnWindow=JSON.parse(TW.duelBattles.params.rsltWin||!1),TW.duelBattles.resWinTxt=Array(String(TW.duelBattles.params.rsltTxtWin||"Win"),String(TW.duelBattles.params.rsltTxtLose||"Lose"),String(TW.duelBattles.params.rsltTxtDraw||"Draw")),TW.duelBattles.active=!1,TW.duelBattles.actor=1,TW.duelBattles.enmyAct=0,TW.duelBattles.aPtySave=Array(),TW.duelBattles.hints=Array(Array(),Array(),Array()),TW.duelBattles.hintTracker=Array(),TW.duelBattles.result=0,TW.duelBattles.YEPBSW=!1,TW.duelBattles.aCharList=JSON.parse(TW.duelBattles.params.EnmyAtkPtrn),TW.duelBattles.charListLength=TW.duelBattles.aCharList.length,TW.duelBattles.charListLength>0){TW.duelBattles.duelSettings=new TW_DuelSetting;for(var i=0;i<TW.duelBattles.charListLength;i++){for(var enemy=JSON.parse(TW.duelBattles.aCharList[i]),aActions=JSON.parse(enemy.atkPtrn),actLength=aActions.length,aAtkPtrn=Array(),j=0;j<actLength;j++)aAtkPtrn.push(Number(aActions[j]));TW.duelBattles.duelSettings.addEnemy(enemy.enmyId,aAtkPtrn)}}function Window_TWDuelEnmyWindow(){this.initialize.apply(this,arguments)}function Window_TWDuelResult(){this.initialize.apply(this,arguments)}TW.duelBattles.eAtkSwitch=Number(TW.duelBattles.params.eAtkSwitch||1),TW.duelBattles.eSpeSwitch=Number(TW.duelBattles.params.eSpeSwitch||2),"RPS"==String(TW.duelBattles.params.dMode)?TW.duelBattles.RPS=!0:TW.duelBattles.RPS=!1,TW.duelBattles.grdId=Number(TW.duelBattles.params.grdId||2),TW.duelBattles.eGrdSwitch=Number(TW.duelBattles.params.eGrdSwitch||3),TW.duelBattles.params=!0,TW.duelBattles.aCharList=[],TW.duelBattles.Game_Interpreter_pluginCommand=Game_Interpreter.prototype.pluginCommand,Game_Interpreter.prototype.pluginCommand=function(t,e){TW.duelBattles.Game_Interpreter_pluginCommand.call(this,t,e),"DuelBtlActor"===t&&(TW.duelBattles.actor=Number(e[0]),e.length>1&&(TW.duelBattles.atkId=Number(e[1]),e.length>2&&(TW.duelBattles.speId=Number(e[2]),e.length>3&&(TW.duelBattles.grdId=Number(e[3]))))),"DuelBtlON"===t&&(TW.duelBattles.active=!0),"DuelBtlOFF"===t&&(TW.duelBattles.active=!1),"DuelHintAtk"===t&&(TW.duelBattles.hints[0][TW.duelBattles.hints[0].length]=e.join(" ")),"DuelHintGrd"===t&&(TW.duelBattles.hints[1][TW.duelBattles.hints[1].length]=e.join(" ")),"DuelHintSpe"===t&&(TW.duelBattles.hints[2][TW.duelBattles.hints[2].length]=e.join(" ")),"DuelHintFace"===t&&(TW.duelBattles.hints[3]=String(e[0]),TW.duelBattles.hints[4]=Number(e[1])),"DuelHintClear"===t&&(TW.duelBattles.hints=[])},Scene_Map.prototype.update=function(){this.updateDestination(),this.updateMainMultiply(),this.isSceneChangeOk()?this.updateScene():SceneManager.isNextScene(Scene_Battle)&&(TW.duelBattles.active&&this.updateDuelBattle(),this.updateEncounterEffect()),this.updateWaitCount(),Scene_Base.prototype.update.call(this)},Scene_Map.prototype.updateDuelBattle=function(){for(var t=$gameParty._actors.length,e=0;e<t;e++)TW.duelBattles.aPtySave.push($gameParty._actors[e]);for(e=0;e<t;e++)$gameParty.removeActor($gameParty._actors[0]);$gameParty.addActor(TW.duelBattles.actor),Imported.YEP_BattleStatusWindow&&!Yanfly.Param.BSWAdjustCol&&(Yanfly.Param.BSWAdjustCol=!0,TW.duelBattles.YEPBSW=!0)},TW.duelBattles.Scene_Battle_updateBattleProcess=Scene_Battle.prototype.updateBattleProcess,Scene_Battle.prototype.updateBattleProcess=function(){TW.duelBattles.active?(!this.isAnyInputWindowActive()||BattleManager.isAborting()||BattleManager.isBattleEnd())&&(BattleManager.update(),$gameMessage.isBusy()||this.changeInputWindow()):TW.duelBattles.Scene_Battle_updateBattleProcess.call(this)},TW.duelBattles.Scene_Battle_createDisplayObjects=Scene_Battle.prototype.createDisplayObjects,Scene_Battle.prototype.createDisplayObjects=function(){TW.duelBattles.Scene_Battle_createDisplayObjects.call(this),TW.duelBattles.active&&(BattleManager.setDuelEStatusWindow(this._TWDuelEnmyWindow),BattleManager.setDuelResultWindow(this._TWDuelResult))},TW.duelBattles.Scene_Battle_createStatusWindow=Scene_Battle.prototype.createStatusWindow,Scene_Battle.prototype.createStatusWindow=function(){TW.duelBattles.Scene_Battle_createStatusWindow.call(this),TW.duelBattles.active&&(this._TWDuelEnmyWindow=new Window_TWDuelEnmyWindow,this.addWindow(this._TWDuelEnmyWindow),this._TWDuelResult=new Window_TWDuelResult,this._TWDuelResult.y=this._TWDuelEnmyWindow.y-this._TWDuelResult.height,this.addWindow(this._TWDuelResult),this._TWDuelResult.close())},TW.duelBattles.Scene_Battle_refreshStatus=Scene_Battle.prototype.refreshStatus,Scene_Battle.prototype.refreshStatus=function(){TW.duelBattles.Scene_Battle_refreshStatus.call(this),TW.duelBattles.active&&this._TWDuelEnmyWindow.refresh()},TW.duelBattles.Scene_Battle_startPartyCommandSelection=Scene_Battle.prototype.startPartyCommandSelection,Scene_Battle.prototype.startPartyCommandSelection=function(){TW.duelBattles.active?(BattleManager.duelEnmyAtk=!1,BattleManager.duelEnmyCnt=!1,this.selectNextCommand()):TW.duelBattles.Scene_Battle_startPartyCommandSelection.call(this)},TW.duelBattles.Scene_Battle_stop=Scene_Battle.prototype.stop,Scene_Battle.prototype.stop=function(){TW.duelBattles.Scene_Battle_stop.call(this),TW.duelBattles.active&&(this._TWDuelEnmyWindow.close(),this._TWDuelResult.close())},TW.duelBattles.Scene_Battle_terminate=Scene_Battle.prototype.terminate,Scene_Battle.prototype.terminate=function(){if(TW.duelBattles.Scene_Battle_terminate.call(this),TW.duelBattles.duelSettings&&TW.duelBattles.duelSettings.clearActions(),TW.duelBattles.active){$gameParty.removeActor(TW.duelBattles.actor);for(var t=TW.duelBattles.aPtySave.length,e=0;e<t;e++)$gameParty.addActor(TW.duelBattles.aPtySave[e]);TW.duelBattles.YEPBSW&&(Yanfly.Param.BSWAdjustCol=!1)}},TW.duelBattles.Scene_Battle_createActorCommandWindow=Scene_Battle.prototype.createActorCommandWindow,Scene_Battle.prototype.createActorCommandWindow=function(){TW.duelBattles.active?(this._actorCommandWindow=new Window_ActorCommand,this._actorCommandWindow.setHandler("attack",this.commandDAttack.bind(this)),this._actorCommandWindow.setHandler("special",this.commandDSkill.bind(this)),this._actorCommandWindow.setHandler("guard",this.commandDGuard.bind(this)),this._actorCommandWindow.setHandler("cancel",this.selectPreviousCommand.bind(this)),this.addWindow(this._actorCommandWindow)):TW.duelBattles.Scene_Battle_createActorCommandWindow.call(this)},Scene_Battle.prototype.commandDAttack=function(){var t=BattleManager.inputtingAction();t.setDuelActId(0),t.setSkill(TW.duelBattles.atkId),t.setTarget(0),this.selectNextCommand()},Scene_Battle.prototype.commandDSkill=function(){var t=BattleManager.inputtingAction();t.setDuelActId(2),t.setSkill(TW.duelBattles.speId),t.setTarget(0),this.selectNextCommand()},Scene_Battle.prototype.commandDGuard=function(){var t=BattleManager.inputtingAction();t.setDuelActId(1),t.setTarget(0),TW.duelBattles.RPS?t.setSkill(TW.duelBattles.grdId):t.setGuard(),this.selectNextCommand()},TW.duelBattles.Scene_Battle_updateWindowPositions=Scene_Battle.prototype.updateWindowPositions,Scene_Battle.prototype.updateWindowPositions=function(){TW.duelBattles.active||TW.duelBattles.Scene_Battle_updateWindowPositions.call(this)},TW.duelBattles.Window_ActorCommand_numVisibleRows=Window_ActorCommand.prototype.numVisibleRows,Window_ActorCommand.prototype.numVisibleRows=function(){return TW.duelBattles.active?3:TW.duelBattles.Window_ActorCommand_numVisibleRows.call(this)},TW.duelBattles.Window_ActorCommand_makeCommandList=Window_ActorCommand.prototype.makeCommandList,Window_ActorCommand.prototype.makeCommandList=function(){TW.duelBattles.active?this._actor&&this.addDuelCommands():TW.duelBattles.Window_ActorCommand_makeCommandList.call(this)},Window_ActorCommand.prototype.addDuelCommands=function(){this.addCommand(TW.duelBattles.atkCmd,"attack"),this.addCommand(TW.duelBattles.grdCmd,"guard"),this.addCommand(TW.duelBattles.speCmd,"special")},TW.duelBattles.Window_BattleStatus_createContents=Window_BattleStatus.prototype.createContents,Window_BattleStatus.prototype.createContents=function(){Imported.YEP_BattleStatusWindow&&TW.duelBattles.active?Window_Selectable.prototype.createContents.call(this):TW.duelBattles.Window_BattleStatus_createContents.call(this)},TW.duelBattles.Window_BattleStatus_drawAllItems=Window_BattleStatus.prototype.drawAllItems,Window_BattleStatus.prototype.drawAllItems=function(){Imported.YEP_BattleStatusWindow&&TW.duelBattles.active?Window_Selectable.prototype.drawAllItems.call(this):TW.duelBattles.Window_BattleStatus_drawAllItems.call(this)},TW.duelBattles.Window_BattleStatus_drawItem=Window_BattleStatus.prototype.drawItem,Window_BattleStatus.prototype.drawItem=function(t){if(Imported.YEP_BattleStatusWindow&&TW.duelBattles.active){var e=$gameParty.battleMembers()[t];this.drawBasicArea(this.basicAreaRect(t),e),this.drawGaugeArea(this.gaugeAreaRect(t),e)}else TW.duelBattles.Window_BattleStatus_drawItem.call(this,t)},TW.duelBattles.Window_BattleStatus_updateTransform=Window_BattleStatus.prototype.updateTransform,Window_BattleStatus.prototype.updateTransform=function(){Imported.YEP_BattleStatusWindow&&TW.duelBattles.active?Window_Selectable.prototype.updateTransform.call(this):TW.duelBattles.Window_BattleStatus_updateTransform.call(this)},TW.duelBattles.Window_BattleStatus_windowWidth=Window_BattleStatus.prototype.windowWidth,Window_BattleStatus.prototype.windowWidth=function(){return TW.duelBattles.active?(Graphics.boxWidth-192)/1.5:TW.duelBattles.Window_BattleStatus_windowWidth.call(this)},TW.duelBattles.Window_BattleStatus_numVisibleRows=Window_BattleStatus.prototype.numVisibleRows,Window_BattleStatus.prototype.numVisibleRows=function(){return TW.duelBattles.active?1:TW.duelBattles.Window_BattleStatus_numVisibleRows.call(this)},TW.duelBattles.Window_BattleStatus_drawBasicArea=Window_BattleStatus.prototype.drawBasicArea,Window_BattleStatus.prototype.drawBasicArea=function(t,e){if(!TW.duelBattles.active)return TW.duelBattles.Window_BattleStatus_drawBasicArea.call(this,t,e);this.drawActorName(e,t.x+40,t.y,200)},TW.duelBattles.Window_BattleStatus_basicAreaRect=Window_BattleStatus.prototype.basicAreaRect,Window_BattleStatus.prototype.basicAreaRect=function(t){if(TW.duelBattles.active){var e=this.itemRectForText(t);return e.x+=e.width-this.gaugeAreaWidth(),e.width=this.gaugeAreaWidth(),e}return TW.duelBattles.Window_BattleStatus_basicAreaRect.call(this,t)},TW.duelBattles.Window_BattleStatus_gaugeAreaRect=Window_BattleStatus.prototype.gaugeAreaRect,Window_BattleStatus.prototype.gaugeAreaRect=function(t){if(TW.duelBattles.active){var e=this.itemRectForText(t);return e.width-=this.gaugeAreaWidth()+15,e}return TW.duelBattles.Window_BattleStatus_gaugeAreaRect.call(this,t)},TW.duelBattles.Window_BattleStatus_drawGaugeArea=Window_BattleStatus.prototype.drawGaugeArea,Window_BattleStatus.prototype.drawGaugeArea=function(t,e){if(!TW.duelBattles.active)return TW.duelBattles.Window_BattleStatus_drawGaugeArea.call(this,t,e);this.drawGaugeAreaWithoutTp(t,e)},TW.duelBattles.Window_BattleStatus_gaugeAreaWidth=Window_BattleStatus.prototype.gaugeAreaWidth,Window_BattleStatus.prototype.gaugeAreaWidth=function(){return TW.duelBattles.active?200:TW.duelBattles.Window_BattleStatus_gaugeAreaWidth.call(this)},TW.duelBattles.Window_BattleStatus_drawGaugeAreaWithoutTp=Window_BattleStatus.prototype.drawGaugeAreaWithoutTp,Window_BattleStatus.prototype.drawGaugeAreaWithoutTp=function(t,e){if(!TW.duelBattles.active)return TW.duelBattles.Window_BattleStatus_drawGaugeAreaWithoutTp.call(this,t,e);this.drawActorHp(e,t.x+0,t.y,200)},Window_TWDuelEnmyWindow.prototype=Object.create(Window_BattleStatus.prototype),Window_TWDuelEnmyWindow.prototype.constructor=Window_TWDuelEnmyWindow,Window_TWDuelEnmyWindow.prototype.initialize=function(){var t=this.windowWidth(),e=this.windowHeight(),a=Graphics.boxWidth-1.5*t,l=Graphics.boxHeight-2*e;Window_Selectable.prototype.initialize.call(this,a,l,t,e),this.refresh()},Window_TWDuelEnmyWindow.prototype.drawItem=function(t){var e=$gameTroop.members()[t];this.drawBasicArea(this.basicAreaRect(t),e),this.drawGaugeArea(this.gaugeAreaRect(t),e)},Window_TWDuelEnmyWindow.prototype.basicAreaRect=function(t){var e=this.itemRectForText(t);return e.width-=this.gaugeAreaWidth()+15,e},Window_TWDuelEnmyWindow.prototype.gaugeAreaRect=function(t){var e=this.itemRectForText(t);return e.x+=e.width-this.gaugeAreaWidth(),e.width=this.gaugeAreaWidth(),e},Window_TWDuelEnmyWindow.prototype.drawBasicArea=function(t,e){this.drawActorName(e,t.x+0,t.y,200)},Window_TWDuelEnmyWindow.prototype.drawGaugeArea=function(t,e){this.drawGaugeAreaWithoutTp(t,e)},Window_TWDuelEnmyWindow.prototype.drawGaugeAreaWithoutTp=function(t,e){this.drawActorHp(e,t.x+0,t.y,200)},Window_TWDuelResult.prototype=Object.create(Window_Base.prototype),Window_TWDuelResult.prototype.constructor=Window_TWDuelResult,Window_TWDuelResult.prototype.initialize=function(){var t=Graphics.boxWidth/2-125;Window_Base.prototype.initialize.call(this,t,0,250,65),this.setBackgroundType(1),this.refresh()},Window_TWDuelResult.prototype.drawItem=function(){this.drawText(TW.duelBattles.resWinTxt[TW.duelBattles.result],0,-5,225,"center")},Window_TWDuelResult.prototype.refresh=function(){this.contents.clear(),this.drawItem()},Game_Action.prototype.setDuelActId=function(t){this.duelActId=t},Game_Action.prototype.setDuelCrit=function(t){this.duelCrit=t},Game_Action.prototype.setEnmyGuard=function(t){this.enmyGuard=t},TW.duelBattles.Game_Action_Apply=Game_Action.prototype.apply,Game_Action.prototype.apply=function(t){if(TW.duelBattles.active){Imported.YEP_BattleEngineCore&&(t._result=null,t._result=new Game_ActionResult,this.subject()._result=null,this.subject()._result=new Game_ActionResult);var e=t.result();if(this.subject().clearResult(),e.clear(),e.used=!0,e.missed=!1,e.evaded=!1,e.physical=this.isPhysical(),e.drain=this.isDrain(),e.isHit()){if(this.item().damage.type>0){e.critical=this.duelCrit;var a=this.makeDDamageValue(t,e.critical);this.executeDamage(t,a)}this.item().effects.forEach(function(e){this.applyItemEffect(t,e)},this),this.applyItemUserEffect(t)}Imported.YEP_BattleEngineCore&&$gameParty.inBattle()&&(t.startDamagePopup(),t.performResultEffects(),t!==this.subject()&&this.subject().startDamagePopup())}else TW.duelBattles.Game_Action_Apply.call(this,t)},Game_Action.prototype.makeDDamageValue=function(t,e){var a=this.item(),l=this.evalDamageFormula(t),s=l*this.calcElementRate(t);return this.isPhysical()&&(s*=t.pdr),this.isMagical()&&(s*=t.mdr),l<0&&(s*=t.rec),e&&(s*=TW.duelBattles.critMulti),s=this.applyVariance(s,a.damage.variance),s=this.applyDGuard(s,t,e),s=Math.round(s)},Game_Action.prototype.applyDGuard=function(t,e,a){return t/(t>0&&!a&&(e.isGuard()||this.enmyGuard)?2*e.grd:1)},TW.duelBattles.Game_Enemy_makeActions=Game_Enemy.prototype.makeActions,Game_Enemy.prototype.makeActions=function(){if(TW.duelBattles.active){$gameSwitches.setValue(TW.duelBattles.eAtkSwitch,!1),$gameSwitches.setValue(TW.duelBattles.eSpeSwitch,!1),$gameSwitches.setValue(TW.duelBattles.eGrdSwitch,!1);var t=$gameTroop._enemies[0]._enemyId,e=!1;if(TW.duelBattles.duelSettings&&(e=TW.duelBattles.duelSettings.isNotRandom(t)),TW.duelBattles.enmyAct=e?TW.duelBattles.duelSettings.enemies[t].getAction():Math.randomInt(3),0==TW.duelBattles.enmyAct?$gameSwitches.setValue(TW.duelBattles.eAtkSwitch,!0):2==TW.duelBattles.enmyAct?$gameSwitches.setValue(TW.duelBattles.eSpeSwitch,!0):TW.duelBattles.RPS&&1==TW.duelBattles.enmyAct&&$gameSwitches.setValue(TW.duelBattles.eGrdSwitch,!0),Game_Battler.prototype.makeActions.call(this),this.numActions()>0){var a=this.enemy().actions.filter(function(t){return this.isActionValid(t)},this);a.length>0&&this.selectAllActions(a)}this.setActionState("waiting")}else TW.duelBattles.Game_Enemy_makeActions.call(this)},TW.duelBattles.BattleManager_startInput=BattleManager.startInput,BattleManager.startInput=function(){if(TW.duelBattles.active){this._phase="input",$gameParty.makeActions(),$gameTroop.makeActions(),this.clearActor(),this._TWDuelResltWindow.close();var t="";if(TW.duelBattles.hints[TW.duelBattles.enmyAct]){var e=0,a=TW.duelBattles.hints[TW.duelBattles.enmyAct].length;TW.duelBattles.duelSettings.isNotRandom($gameTroop._enemies[0]._enemyId)?((e=TW.duelBattles.hintTracker[TW.duelBattles.enmyAct]+1||0)>=a&&(e=0),TW.duelBattles.hintTracker[TW.duelBattles.enmyAct]=e):e=Math.randomInt(a),t=TW.duelBattles.hints[TW.duelBattles.enmyAct][e]||""}if(""!=t){var l=TW.duelBattles.hints[3]||"",s=TW.duelBattles.hints[4]||"";""!=l&&""!=s&&$gameMessage.setFaceImage(l,s),$gameMessage.add(t)}!this._surprise&&$gameParty.canInput()||this.startTurn()}else TW.duelBattles.BattleManager_startInput.call(this)},BattleManager.setDuelEStatusWindow=function(t){this._TWDuelEnmyWindow=t},BattleManager.setDuelResultWindow=function(t){this._TWDuelResltWindow=t},TW.duelBattles.BattleManager_refreshStatus=BattleManager.refreshStatus,BattleManager.refreshStatus=function(){TW.duelBattles.BattleManager_refreshStatus.call(this),TW.duelBattles.active&&this._TWDuelEnmyWindow.refresh()},TW.duelBattles.BattleManager_makeActionOrders=BattleManager.makeActionOrders,BattleManager.makeActionOrders=function(){if(TW.duelBattles.active){var t=[];t=(t=t.concat($gameParty.members())).concat($gameTroop.members()),this._actionBattlers=t}else TW.duelBattles.BattleManager_makeActionOrders.call(this)},TW.duelBattles.BattleManager_startAction=BattleManager.startAction,BattleManager.startAction=function(){if(TW.duelBattles.active)if(Imported.YEP_BattleEngineCore){if(this._subject.isActor()||this.duelEnmyAtk){if(!(a=this._subject))return this.endAction();var t=a.currentAction();if(this._action=t,!this._action)return this.endAction();if(!this._action.item())return this.endAction();var e=t.makeTargets();this.setTargets(e),this.setDuelAction(this._subject,e[0]),this.duelActionResult>0&&(this._allTargets=e.slice(),this._individualTargets=e.slice(),this._phase="phaseChange",this._phaseSteps=["setup","whole","target","follow","finish"],this._returnPhase="",this._actionList=[],a.useItem(this._action.item()),this._action.applyGlobal(),this._logWindow.startAction(this._subject,this._action,this._targets))}}else{var a;e=(t=(a=this._subject).currentAction()).makeTargets();this._phase="action",this._action=t,this._targets=e,this.setDuelAction(this._subject,this._targets[0]),this.duelActionResult>0&&(a.useItem(t.item()),this._action.applyGlobal(),this.refreshStatus(),this._logWindow.startAction(a,t,e))}else TW.duelBattles.BattleManager_startAction.call(this)},BattleManager.setDuelAction=function(t,e){if(this._action.setDuelCrit(!1),this._action.setEnmyGuard(!1),this.duelActionResult=0,t.isActor()){switch(1==this._action.duelActId&&this._action.opponentsUnit().smoothTarget(0),!0){case TW.duelBattles.enmyAct==this._action.duelActId:switch(TW.duelBattles.result=2,TW.duelBattles.enmyAct){case 0:this.duelEnmyAtk=!0,this.duelActionResult=1;break;case 1:TW.duelBattles.RPS&&(this.duelEnmyAtk=!0),this.duelActionResult=2;break;case 2:this.duelEnmyAtk=!0,this.duelActionResult=3}break;case 0==TW.duelBattles.enmyAct:1==this._action.duelActId?(this.duelEnmyAtk=!0,TW.duelBattles.RPS||(this.duelActionResult=4),TW.duelBattles.result=1):(TW.duelBattles.RPS?this.duelActionResult=4:(this.duelEnmyAtk=!0,this.duelEnmyCnt=!0),TW.duelBattles.result=0);break;case 1==TW.duelBattles.enmyAct:TW.duelBattles.RPS||this._action.setEnmyGuard(!0),0==this._action.duelActId?(this.duelActionResult=6,TW.duelBattles.result=0):(TW.duelBattles.RPS?this.duelEnmyAtk=!0:this.duelActionResult=7,TW.duelBattles.result=1);break;case 2==TW.duelBattles.enmyAct:0==this._action.duelActId?(TW.duelBattles.RPS?this.duelEnmyAtk=!0:this.duelActionResult=8,TW.duelBattles.result=1):(TW.duelBattles.RPS?this.duelActionResult=4:(this.duelEnmyAtk=!0,this.duelEnmyCnt=!0),TW.duelBattles.result=0)}TW.duelBattles.turnWindow&&(this._TWDuelResltWindow.refresh(),this._TWDuelResltWindow.open())}else this.duelEnmyCnt?0==TW.duelBattles.enmyAct?this.duelActionResult=5:this.duelActionResult=9:this.duelEnmyAtk&&(this.duelActionResult=4)},BattleManager.applyDuelAction=function(t,e){switch(this.duelActionResult){case 1:this.invokeNormalAction(t,e);break;case 2:TW.duelBattles.RPS&&this.invokeNormalAction(t,e);break;case 3:case 4:this.invokeNormalAction(t,e);break;case 5:this.invokeCounterAttack(t,e,5);break;case 6:this.invokeNormalAction(t,e);break;case 7:case 8:this.invokeCounterAttack(t,e);break;case 9:this.invokeCounterAttack(t,e,9)}},TW.duelBattles.BattleManager_invokeAction=BattleManager.invokeAction,BattleManager.invokeAction=function(t,e){TW.duelBattles.active?(Imported.YEP_BattleEngineCore&&Yanfly.Param.BECOptSpeed||this._logWindow.push("pushBaseLine"),this.applyDuelAction(t,e),Imported.YEP_BattleEngineCore?(t&&t.setLastTarget(e),Yanfly.Param.BECOptSpeed||this._logWindow.push("popBaseLine")):(t.setLastTarget(e),this._logWindow.push("popBaseLine"),this.refreshStatus())):TW.duelBattles.BattleManager_invokeAction.call(this,t,e)},TW.duelBattles.BattleManager_invokeCounterAttack=BattleManager.invokeCounterAttack,BattleManager.invokeCounterAttack=function(t,e){if(TW.duelBattles.active){var a=new Game_Action(e);if(a.setDuelCrit(!0),e.isActor())5==this.duelActionResult?a.setSkill(TW.duelBattles.speId):a.setSkill(TW.duelBattles.atkId);else{var l=$gameTroop._enemies[0];7==this.duelActionResult&&$gameSwitches.setValue(TW.duelBattles.eAtkSwitch,!0);var s=l.enemy().actions.filter(function(t){return this.isActionValid(t)},l);a.setEnemyAction(l.selectAction(s,2))}this._logWindow.displayCounter(e),a.apply(t),this._logWindow.displayActionResults(e,t),t.isDead()&&t.performCollapse()}else TW.duelBattles.BattleManager_invokeCounterAttack.call(this,t,e)};