/*
        TEMPLATE WINDOW v1

NOTE
    Vous aurez ici, toutes les fonctions de chaque classe.
*/

/*
        WINDOW_BASE
    
Acteurs :
    this.drawActorName(actor, x, y, w);
        Dessine le nom de l'acteur. (retourne un texte)
    this.drawActorLevel(actor, x, y);
        Affiche le niveau de l'acteur. (retourne un texte)
    this.drawActorIcons(actor, x, y);
        Affiche les icône de l'acteur. (retourne une image)
    this.drawActorClass(actor, x, y);
        Affiche le nom de la classe de l'acteur x. (retourne un texte)
    this.drawActorHp(actor, x, y, w);
        Affiche le nombre de point de vie (HP) et la jauge de l'acteur x. (retourne un texte, jauge et le current/max)
    this.drawActorMp(actor, x, y, w);
        Affiche le nombre de point de magie (MP) et la jauge  de l'acteur x. (retourne un texte, jauge et le current/max)
    this.drawActorNickname(actor, x, y, w);
        Affiche le surnom de l'acteur x. (retourne un texte)
    this.drawActorLevel(actor, x, y);
        Affiche le niveau de l'acteur x. (retourne un texte)
    this.drawCurrentAndMax(current, max, x, y, w, color1, color2);
        Affiche un nombre avec un slash puis un nombre max. ex: current/max, 10/300. (retourne un texte)
    this.drawActorTp(actor, x, y, w);
        Affiche les points technique. (retourne un texte, jauge et le current/max)
    this.drawActorSimpleStatus(actor, x, y, w);
        Affiche toute les informations d'un acteur x. (retourne le nom, niveau, surnom, level, hp, mp)
    this.drawItemName(item, x, y, w);
        Affiche l'icône et le nom de l'item x.
Images :
    this.drawIcon(iconIndex, x, y);
        Affiche une icône de l'image de l'IconSet.png a l'index.
    this.drawFace(faceName, faceIndex, x, y, w, h);
        Dessine une faceset.
    this.drawCharacter(characterName, characterIndex, x, y);
        Dessine un character.
    this.drawGauge(x, y, w, rate, color1, color2);
        Dessine une jauge.
    this.drawActorCharacter(actor, x, y);
        Dessine le character de l'acteur x.
    this.drawActorFace(actor, x, y, w, h);
        Dessine le faceset de l'acteur x.

Textes :
    this.changeTextColor(n);
        Change la couleur du prochain affichage de texte.
    this.drawTextEx(string, x, y);
        Affiche un texte utilisant les codes message.
    this.drawText(string, x, y, w, align);
        Affiche un texte sans utilisation des codes message.
    this.textWidth(string);
        Récupère la largeur du texte dans la variable.

Définitions :
    actor = L'acteur sélectionner.
        utilise ceci : $gameParty.members()[index]
        index = numéro de la liste d'équipe.
        Pour récupère l'acteur x dans l'équipe.
    n = Numéro de la couleur dans l'image Windowskin.png
    string = Variable à texte avec les guillemets.
    x = Position dans l'axe X.
    y = Position dans l'axe Y.
    w = Largeur.
        PS: pour le texte, il se modifiera pour rentrer tout dans le rectangle.
    h = Hauteur.
    align = "left"   ou "center" ou "right"  Alignement du texte dans le rectangle avec la variable width.
            "gauche"    "centre"    "droite"
    current = Nombre actuel.
    max = Nombre maximum.
    color1 = Couleur de la jauge Début.
    rate = Pourcentage? (pas sûr)
    color2 = Couleur de la jauge Fin.
    item = 
    iconIndex = L'id de l'icône du fichier IconSet.png. Pour savoir, regarder dans la BDD et dans la sélection d'icône.
    faceName = Nom du fichier dans le dossier 'faces'.
    faceIndex = Index de l'image du faceset.
    characterName = Nom du fichier dans le dossier 'characters'.
    characterIndex = Index de l'image du character.
*/

//// Window_Name peut être changer a un autre nom.
//// //!\\ Il ne doit pas être utiliser dans un autre plugin le nom.
////       Cela risque de réécrire dans le premier de la liste la classe par celui-ci.
class Window_Exemple extends Window_Base {
	constructor() {
		super();
	}
	
	initialize() {
		super.initialize(600, 90, 450, 600);
        this.opacity = 0;
		this.drawAll();
	}
	
	drawAll() {
        //// APPEL DES FONCTIONS.
		this.drawTextes();
        this.drawImages();
        this.drawActeurs();
        ////FIN D'APPEL DES FONCTIONS
	}

    //// CREATION DES FONCTIONS
    drawTextes() { }
	
    drawImages() { }

    drawActeurs() { }
    //// FIN DES FONCTIONS CREER

    empty(){
        if (this.contents){
            this.contents.clear();
        }
    }

    nonDebloquer(){
        this.refresh();
        this.drawText("Indisponible", 0, 0, 450, "center"); // TITRE
        this.drawTextEx("\n\nVous n\'avez pas débloquer ce chapitre.", 0, 0);
    }

    /** Emma */
    emma_prologue(){
        this.refresh();
        this.drawText("Prologue", 0, 0, 450, "center"); // TITRE
        this.drawTextEx("\n\\C[3]string", 0, 0);
    }
    /** Christophe */
    /** Moros */
    /** Mathias */
    /** Louis */
    /** Non Débloquer */
    

    /** Autres */
	update() {
		Window_Base.prototype.update.call(this);
        /// Met à jour à chaque frame.
	}
	
 	refresh() {
         /// Refresh sert a effacer et à redessiner.
		if (this.contents) {
			this.contents.clear();
			//this.drawAll();
		}
    }
}

//// Scene_Name peut être changer a un autre nom.
//// //!\\ Il ne doit pas être utiliser dans un autre plugin le nom.
////       Cela risque de réécrire dans le premier de la liste la classe par celui-ci.
/*
    Utiliser cette classe, si vous voulez l'appelez avec:
        SceneManager.goto(Scene_Name);
*/
class Scene_Exemple extends Scene_MenuBase {
	constructor() {
		super();
	}
	
	create() {
        //// Créer une variable avec la fenêtre créer au dessus.
        //// Le this.addWindow(var); permet d'ajouter les fenêtres dans la scene.
		this._windowCustom = new Window_Exemple(1);
		this.addWindow(this._windowCustom);
	}
}

Game_Interpreter.prototype.pluginCommand = function(commands, args) {
    /*
        Création des commandes plugin.
        Pour ce faire nous utilisont la variable commands, qui lui contient le premier mot.
        Le args et un tableau qui contient les mots suivant qui seront séparer grâce a l'espace.
        Appel Command exemple : Window Show Menu
        Le args pour determiner ce qui contient nous utilisons ceci:
            args[index_du_tableau]

        ///EXEMPLE COMMAND
        if (commands === "Window") {
            if (args[0] === "Show") {
                if (args[1] === "Menu") {
                    SceneManager.goto(Scene_Menu);
                }
            }
        }
        ///FIN EXEMPLE

        Pour ajouter une fenêtre sans appel avec SceneManager, nous pouvons créer une variable et ajouter dans la scene:

        ///EXEMPLE COMMAND
        if (commands === "Window") {
            if (args[0] === "Show") {
                if (args[1] === "Menu") {
                    const window_name = new Window_Name(); /// Variable contenant la fenêtre.
                    SceneManager._scene.addChild(window_name);
                }
            }
        }
        ///FIN EXEMPLE
    */
	
    if (commands === "Window") {
        const window_name = new Window_Exemple(); /// Variable contenant la fenêtre.
        SceneManager._scene.addChild(window_name);

        console.log(args);

        switch (args[0]){
            case "Empty":
                window_name.empty();
            break;

            case "Close":
                if(!window_name){
                    window_name.close();
                } 
            break;

            case "Synopsis":
                switch(args[1]){
                    case "emma":
                        switch(args[2]){
                            case "Perso":
                                window_name.emma_perso();
                            break;

                            case "Prologue":
                                window_name.emma_prologue();
                            break;
                            /******************* */
                            case "Chap1P1":
                                window_name.X_chap1_p1();
                            break;
                            
                            case "Chap1P2":
                                window_name.X_chap1_p2();
                            break;

                            case "Chap1P3":
                                window_name.X_chap1_p2();
                            break;
                            
                            /******************* */
                            case "Chap2P1":
                                window_name.X_chap2_p1();
                            break;
                            
                            case "Chap2P2":
                                window_name.X_chap2_p2();
                            break;

                            case "Chap2P3":
                                window_name.X_chap2_p2();
                            break;
                            /******************* */
                            case "Chap3P1":
                                window_name.X_chap3_p1();
                            break;
                            
                            case "Chap3P2":
                                window_name.X_chap3_p2();
                            break;

                            case "Chap3P3":
                                window_name.X_chap3_p2();
                            break;
                            /******************* */
                            /******************* */
                            case "Chap4P1":
                                window_name.X_chap4_p1();
                            break;
                            
                            case "Chap4P2":
                                window_name.X_chap4_p2();
                            break;

                            case "Chap4P3":
                                window_name.X_chap4_p2();
                            break;
                            /******************* */
                            case "Chap5P1":
                                window_name.X_chap5_p1();
                            break;
                            
                            case "Chap5P2":
                                window_name.X_chap5_p2();
                            break;

                            case "Chap5P3":
                                window_name.X_chap5_p2();
                            break;
                            /******************* */
                            case "Chap6P1":
                                window_name.X_chap6_p1();
                            break;
                            
                            case "Chap6P2":
                                window_name.X_chap6_p2();
                            break;

                            case "Chap6P3":
                                window_name.X_chap6_p2();
                            break;
                            /******************* */
                            case "Epilogue":
                            break;
                        }
                    break;

                    case "chris":
                        switch(args[2]){
                            case "Perso":
                                window_name.emma_perso();
                            break;

                            case "Prologue":
                                window_name.emma_prologue();
                            break;
                            /******************* */
                            case "Chap1P1":
                                window_name.X_chap1_p1();
                            break;
                            
                            case "Chap1P2":
                                window_name.X_chap1_p2();
                            break;

                            case "Chap1P3":
                                window_name.X_chap1_p2();
                            break;
                            
                            /******************* */
                            case "Chap2P1":
                                window_name.X_chap2_p1();
                            break;
                            
                            case "Chap2P2":
                                window_name.X_chap2_p2();
                            break;

                            case "Chap2P3":
                                window_name.X_chap2_p2();
                            break;
                            /******************* */
                            case "Chap3P1":
                                window_name.X_chap3_p1();
                            break;
                            
                            case "Chap3P2":
                                window_name.X_chap3_p2();
                            break;

                            case "Chap3P3":
                                window_name.X_chap3_p2();
                            break;
                            /******************* */
                            /******************* */
                            case "Chap4P1":
                                window_name.X_chap4_p1();
                            break;
                            
                            case "Chap4P2":
                                window_name.X_chap4_p2();
                            break;

                            case "Chap4P3":
                                window_name.X_chap4_p2();
                            break;
                            /******************* */
                            case "Chap5P1":
                                window_name.X_chap5_p1();
                            break;
                            
                            case "Chap5P2":
                                window_name.X_chap5_p2();
                            break;

                            case "Chap5P3":
                                window_name.X_chap5_p2();
                            break;
                            /******************* */
                            case "Chap6P1":
                                window_name.X_chap6_p1();
                            break;
                            
                            case "Chap6P2":
                                window_name.X_chap6_p2();
                            break;

                            case "Chap6P3":
                                window_name.X_chap6_p2();
                            break;
                            /******************* */
                            case "Epilogue":
                            break;
                        }
                    break;

                    case "moros":
                        switch(args[2]){
                            case "Perso":
                                window_name.emma_perso();
                            break;
                            
                            case "Prologue":
                                window_name.emma_prologue();
                            break;
                            /******************* */
                            case "Chap1P1":
                                window_name.X_chap1_p1();
                            break;
                            
                            case "Chap1P2":
                                window_name.X_chap1_p2();
                            break;

                            case "Chap1P3":
                                window_name.X_chap1_p2();
                            break;
                            
                            /******************* */
                            case "Chap2P1":
                                window_name.X_chap2_p1();
                            break;
                            
                            case "Chap2P2":
                                window_name.X_chap2_p2();
                            break;

                            case "Chap2P3":
                                window_name.X_chap2_p2();
                            break;
                            /******************* */
                            case "Chap3P1":
                                window_name.X_chap3_p1();
                            break;
                            
                            case "Chap3P2":
                                window_name.X_chap3_p2();
                            break;

                            case "Chap3P3":
                                window_name.X_chap3_p2();
                            break;
                            /******************* */
                            /******************* */
                            case "Chap4P1":
                                window_name.X_chap4_p1();
                            break;
                            
                            case "Chap4P2":
                                window_name.X_chap4_p2();
                            break;

                            case "Chap4P3":
                                window_name.X_chap4_p2();
                            break;
                            /******************* */
                            case "Chap5P1":
                                window_name.X_chap5_p1();
                            break;
                            
                            case "Chap5P2":
                                window_name.X_chap5_p2();
                            break;

                            case "Chap5P3":
                                window_name.X_chap5_p2();
                            break;
                            /******************* */
                            case "Chap6P1":
                                window_name.X_chap6_p1();
                            break;
                            
                            case "Chap6P2":
                                window_name.X_chap6_p2();
                            break;

                            case "Chap6P3":
                                window_name.X_chap6_p2();
                            break;
                            /******************* */
                            case "Epilogue":
                            break;
                        }
                    break;

                    case "mathias":
                        switch(args[2]){
                            case "Perso":
                                window_name.emma_perso();
                            break;
                            
                            case "Prologue":
                                window_name.emma_prologue();
                            break;
                            /******************* */
                            case "Chap1P1":
                                window_name.X_chap1_p1();
                            break;
                            
                            case "Chap1P2":
                                window_name.X_chap1_p2();
                            break;

                            case "Chap1P3":
                                window_name.X_chap1_p2();
                            break;
                            
                            /******************* */
                            case "Chap2P1":
                                window_name.X_chap2_p1();
                            break;
                            
                            case "Chap2P2":
                                window_name.X_chap2_p2();
                            break;

                            case "Chap2P3":
                                window_name.X_chap2_p2();
                            break;
                            /******************* */
                            case "Chap3P1":
                                window_name.X_chap3_p1();
                            break;
                            
                            case "Chap3P2":
                                window_name.X_chap3_p2();
                            break;

                            case "Chap3P3":
                                window_name.X_chap3_p2();
                            break;
                            /******************* */
                            /******************* */
                            case "Chap4P1":
                                window_name.X_chap4_p1();
                            break;
                            
                            case "Chap4P2":
                                window_name.X_chap4_p2();
                            break;

                            case "Chap4P3":
                                window_name.X_chap4_p2();
                            break;
                            /******************* */
                            case "Chap5P1":
                                window_name.X_chap5_p1();
                            break;
                            
                            case "Chap5P2":
                                window_name.X_chap5_p2();
                            break;

                            case "Chap5P3":
                                window_name.X_chap5_p2();
                            break;
                            /******************* */
                            case "Chap6P1":
                                window_name.X_chap6_p1();
                            break;
                            
                            case "Chap6P2":
                                window_name.X_chap6_p2();
                            break;

                            case "Chap6P3":
                                window_name.X_chap6_p2();
                            break;
                            /******************* */
                            case "Epilogue":
                            break;
                        }
                    break;

                    case "louis":
                        switch(args[2]){
                            case "Perso":
                                window_name.emma_perso();
                            break;
                            
                            case "Prologue":
                                window_name.emma_prologue();
                            break;
                            /******************* */
                            case "Chap1P1":
                                window_name.X_chap1_p1();
                            break;
                            
                            case "Chap1P2":
                                window_name.X_chap1_p2();
                            break;

                            case "Chap1P3":
                                window_name.X_chap1_p2();
                            break;
                            
                            /******************* */
                            case "Chap2P1":
                                window_name.X_chap2_p1();
                            break;
                            
                            case "Chap2P2":
                                window_name.X_chap2_p2();
                            break;

                            case "Chap2P3":
                                window_name.X_chap2_p2();
                            break;
                            /******************* */
                            case "Chap3P1":
                                window_name.X_chap3_p1();
                            break;
                            
                            case "Chap3P2":
                                window_name.X_chap3_p2();
                            break;

                            case "Chap3P3":
                                window_name.X_chap3_p2();
                            break;
                            /******************* */
                            /******************* */
                            case "Chap4P1":
                                window_name.X_chap4_p1();
                            break;
                            
                            case "Chap4P2":
                                window_name.X_chap4_p2();
                            break;

                            case "Chap4P3":
                                window_name.X_chap4_p2();
                            break;
                            /******************* */
                            case "Chap5P1":
                                window_name.X_chap5_p1();
                            break;
                            
                            case "Chap5P2":
                                window_name.X_chap5_p2();
                            break;

                            case "Chap5P3":
                                window_name.X_chap5_p2();
                            break;
                            /******************* */
                            case "Chap6P1":
                                window_name.X_chap6_p1();
                            break;
                            
                            case "Chap6P2":
                                window_name.X_chap6_p2();
                            break;

                            case "Chap6P3":
                                window_name.X_chap6_p2();
                            break;
                            /******************* */
                            case "Epilogue":
                            break;
                        }
                    break;
                        /** Non Débloquer */
                    case "NonDebloquer":
                        window_name.nonDebloquer();
                    break;
                }
            break;
        }
    }
}

Scene_Map.prototype.createDisplayObjects = function() {
    this.createSpriteset();
    this.createMapNameWindow();
    this.createWindowLayer();
    this.createAllWindows();
    this.createWindowExemple();
};

Scene_Map.prototype.createWindowExemple = function() {
    this._infoWindow = new Window_Exemple();
    this.addChild(this._infoWindow);
};