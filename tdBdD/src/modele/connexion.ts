import * as APIsql from "../modele/sqlWeb.js"

APIsql.sqlWeb.init("http://devweb.iutmetz.univ-lorraine.fr/~humber377u/IHM/tdBdD/vue/","http://devweb.iutmetz.univ-lorraine.fr/~nitschke5/ihm/IHM_API/")

class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec voter nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','80','humber377u_inventaireIHM', 'humber377u_appli','gabinH2401@', 'utf8');
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

