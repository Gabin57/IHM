import * as APIsql from "../modele/sqlWeb"

APIsql.sqlWeb.init("https://devweb.iutmetz.univ-lorraine.fr/~humber377u/IHM/tdBdD/vue/","https://devweb.iutmetz.univ-lorraine.fr/~humber377u/IHM/tdBdD/IHM_API/")

class Connexion {
	constructor() {
		this.init();
	}
	init():void {
		// à adapter avec voter nom de base et vos identifiants de connexion
		APIsql.sqlWeb.bdOpen('devbdd.iutmetz.univ-lorraine.fr','3306','humber377u_inventaireIHM', 'humber377u_appli','32305164', 'utf8');
	}
}
let connexion = new Connexion;

export {connexion, APIsql}

