import { APIsql, connexion } from "../modele/connexion";
class UnTypEquipt {
    constructor(id_equipt = "", lib_equipt = "", commentaire = "") {
        this._idEquipt = id_equipt;
        this._libEquipt = lib_equipt;
        this._commentaire = commentaire;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get idEquipt() {
        return this._idEquipt;
    }
    set idEquipt(id_equipt) {
        this._idEquipt = id_equipt;
    }
    get libEquipt() {
        return this._libEquipt;
    }
    set libEquipt(lib_equipt) {
        this._libEquipt = lib_equipt;
    }
    get commentaire() {
        return this._commentaire;
    }
    set commentaire(commentaire) {
        this._commentaire = commentaire;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = {
            "idEquipt": this._idEquipt,
            "libEquipt": this._libEquipt,
            "commentaire": this._commentaire,
        };
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypEquipts {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquipt
        let typEquipts = {};
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const typEquipt = new UnTypEquipt(item["id_equipt"], item["lib_equipt"], item["commentaire"]);
            typEquipts[typEquipt.idEquipt] = typEquipt; // clé d’un élément du tableau : id equipt
        }
        return typEquipts;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_equipt, lib_equipt, commentaire";
        sql += " FROM TYPE_EQUIPT";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        sql += " ORDER BY lib_equipt ASC ";
        return sql;
    }
    all() {
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare(""), []));
    }
    byIdEquipt(id_equipt) {
        let typEquipt = new UnTypEquipt();
        const typEquipts = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("id_equipt = ?"), [id_equipt]));
        const lesCles = Object.keys(typEquipts);
        // affecte les clés du tableau associatif « typEquipts » dans le tableau de chaines « lesCles »
        if (lesCles.length > 0) {
            typEquipt = typEquipts[lesCles[0]]; // récupérer le 1er élément du tableau associatif « typEquipts »
        }
        return typEquipt;
    }
    toArray(typEquipts) {
        // d’un tableau de tableaux associatifs pour un affichage dans un tableau HTML
        let T = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
        }
        return T;
    }
}
class UnTypEquiptBySalle {
    constructor(unTypEquipt = null, qte = 0) {
        // attributs de TYPE_EQUIPT auxquelles on ajouter l’attribut « qte » de la relation « contient »
        this._unTypEquipt = unTypEquipt;
        this._qte = qte;
    }
    // définition des « getters » et des « setters » pour les attributs privés de la classe
    get qte() {
        return this._qte;
    }
    set qte(qte) {
        this._qte = qte;
    }
    get unTypEquipt() {
        return this._unTypEquipt;
    }
    set unTypEquipt(unTypEquipt) {
        this._unTypEquipt = unTypEquipt;
    }
    toArray() {
        // renvoie l’objet sous la forme d’un tableau associatif
        // pour un affichage dans une ligne d’un tableau HTML
        let tableau = this.unTypEquipt.toArray(); // appel de la méthode « toArray » de « UnTypEquipt »
        tableau["qte"] = this.qte.toFixed(0);
        return tableau;
    }
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class LesTypEquiptsBySalle {
    constructor() {
        // rien
    }
    load(result) {
        // à partir d’un TdataSet, conversion en tableau d’objets UnTypEquiptBySalle
        const typEquiptsBySalle = {};
        const lesTypEquipts = new LesTypEquipts();
        for (let i = 0; i < result.length; i++) {
            const item = result[i];
            const unTypEquipt = lesTypEquipts.byIdEquipt(item["id_equipt"]);
            const typEquiptBySalle = new UnTypEquiptBySalle(unTypEquipt, parseInt(item["qte"]));
            typEquiptsBySalle[typEquiptBySalle.unTypEquipt.idEquipt] =
                typEquiptBySalle;
        }
        return typEquiptsBySalle;
    }
    prepare(where) {
        let sql;
        sql = "SELECT id_equipt, qte";
        sql += " FROM contient";
        if (where.trim() !== "") {
            sql += " WHERE " + where;
        }
        return sql;
    }
    byNumSalle(num_salle) {
        // renvoie le tableau d’objets contenant tous les équipements de la salle num salle
        return this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ?"), [num_salle]));
    }
    byNumSalleIdEquipt(num_salle, id_equipt) {
        // renvoie l’objet de l’équipement id_equipt contenu dans la salle num_salle
        let typEquiptBySalle = new UnTypEquiptBySalle();
        let typEquiptsBySalle = this.load(APIsql.sqlWeb.SQLloadData(this.prepare("num_salle = ? and id_equipt = ?"), [num_salle, id_equipt]));
        if (!typEquiptsBySalle[0] === undefined) {
            typEquiptBySalle = typEquiptsBySalle[0];
        }
        return typEquiptBySalle;
    }
    toArray(typEquipts) {
        let T = [];
        for (let id in typEquipts) {
            T.push(typEquipts[id].toArray());
            delete T[T.length - 1].commentaire; // pas besoin du commentaire pour l'affichage dans le tableau
        }
        return T;
    }
    getTotalNbEquipt(typEquipts) {
        // renvoie la quantité totale d’équipements d’une salle
        let total = 0;
        for (let id in typEquipts) {
            total += typEquipts[id].qte;
        }
        return total;
    }
    delete(num_salle) {
        let sql;
        sql = "DELETE FROM contient WHERE num_salle = ?";
        return APIsql.sqlWeb.SQLexec(sql, [num_salle]); // requête de manipulation : utiliser SQLexec
    }
    insert(num_salle, typEquipts) {
        // requête d’ajout des équipements avec une quantité dans « contient » installé dans « num_salle »
        let sql;
        let separateur = "";
        sql = "INSERT INTO contient(num_salle,id_equipt, qte) VALUES ";
        for (let cle in typEquipts) {
            sql += separateur + "('" + num_salle + "','" +
                typEquipts[cle].unTypEquipt.idEquipt + "','" +
                typEquipts[cle].qte + "')";
            separateur = ",";
        }
        return APIsql.sqlWeb.SQLexec(sql, []);
    }
}
export { connexion };
export { UnTypEquipt };
export { LesTypEquipts };
export { UnTypEquiptBySalle };
export { LesTypEquiptsBySalle };
//# sourceMappingURL=data_equipement.js.map