# Madera Mobile

Application de gestion de devis et de plan pour des maisons modulaire en bois.
Réalisé en web à l'aide d'Angular 7, prévue pour être portée sur Android à l'aide de Cordova.

## Librairies utilisées

### Front-end
- **[Angular](https://angular.io/docs)** (7.2.10)
- **[Angular Material](https://material.angular.io/)** (7.3.5)
- **[HammerJS](https://hammerjs.github.io/)** (2.0.8)
- **[Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)** (4.3)
- **[Material Design Icons](https://google.github.io/material-design-icons/#icon-font-for-the-web)** (3.0.1)

### Back-end
- **[Cordova](https://cordova.apache.org/)** (8.1.2)
- **[Dexie](https://dexie.org/)** (2.0.4)
- **[Node](https://nodejs.org/en/)** (8.11.1)
- **[NPM](https://www.npmjs.com/)** (5.6.0)
- **[Typescript](https://www.typescriptlang.org/)** (3.2.4)

## Scripts NPM custom

- npm run-script **build**
	*Build juste le site avec Webpack et le met dans cordova/www*
	
- npm run-script **build-android**
	*1 - Build le site avec Webpack et le met dans cordova/www*
	*2 - Build l'apk avec Cordova*

- npm run-script **run-android**
	*1 - Build le site avec Webpack et le met dans cordova/www*
	*2 - Build l'apk avec Cordova*
	*3 - Lance l'appli sur le portable branché ou sur un émulateur*

	
- npm run-script **cordova-build-android**
	*Build juste l'apk avec Cordova*

- npm run-script **cordova-run-android**
	*1 - Build l'apk avec Cordova*
	*2 - Lance l'appli sur le portable branché ou sur un émulateur*


## Architecture de l'application

Exemple d'architecture des fichiers pour une appli de trois pages.
Chaque page est un composant tout à fait standard construit avec d'autres composants.
Les services sont organisés selon leurs types

```
    src
    └───app
        ├───classes
        ├───components
        │   ├───nav-bar 				// Composant global à l'appli
        │   └───pages 					// Différentes pages navigables
        │       ├───contacts			// Page 1
        │       │   ├───contact-detail
        │       │   └───contact-list
        │       ├───home				// Page 2
        │       └───settings			// Page 3
        │           └───log
        └───services
            ├───api
            └───service workers
```
