# Ouroboros
## Blog dev
[présentation Itch.io](https://kingdo.itch.io/ouroboros)

MAJ :
- [Janvier](https://kingdo.itch.io/ouroboros/devlog/336301/dev-blog-start)
- [Fevrier](https://kingdo.itch.io/ouroboros/devlog/344377/fevrier)
- [Mars](https://kingdo.itch.io/ouroboros/devlog/352442/mars)
------------
## En cours
- Voir pourquoi le plugin "region restriction" me met des carrés noirs 

## Deploiement
### Avant de publier le jeu :
- Penser a supprimer la variable 13 qui sert a afficher le chapitre en cour dans la sauvegarde
- Ajouter dans les images les fenetres Windows ET !door11
- Changer le skip title screen de Yami pour Hime (bug d'inventaire)
- Aller dans le fichier "Package" et mettre le jeu en full screen
```js
{
    "name": "",
    "main": "www/index.html",
    "js-flags": "--expose-gc",
    "window": {
        "title": "",
        "toolbar": false,
        "width": 1080,
        "height": 720,
        "icon": "www/icon/icon.png",
	"fullscreen": true,
	"resizable": false
    }
}
```

