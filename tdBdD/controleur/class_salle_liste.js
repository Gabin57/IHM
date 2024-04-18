// importation des classes de gestion des données d’une salle et de ses équipements
import { LesSalles } from "../modele/data_salle.js";
import { LesDepts } from "../modele/data_departement.js";
import { LesTypEquiptsBySalle } from "../modele/data_equipement.js";
class VueSalleListe {
    get form() { return this._form; }
    init(form) {
        this._form = form;
        const lesSalles = new LesSalles;
        const lesDepts = new LesDepts();
        const lesTypEquiptsBySalle = new LesTypEquiptsBySalle();
        const data = lesSalles.all();
        this.form.divTitre.textContent = 'Liste des salles'; // construction du titre
        for (let num in data) {
            const uneSalle = data[num];
            const tr = this.form.tableSalle.insertRow(); // création nlle ligne dans tableau
            let balisea; // déclaration balise <a>
            // création balise <a> pour appel page visualisation du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_visu'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueSalleListe.detailSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea); // création nlle cellule dans ligne
            tr.insertCell().textContent = uneSalle.numSalle;
            tr.insertCell().textContent = uneSalle.libSalle;
            tr.insertCell().textContent = uneSalle.etage;
            tr.insertCell().textContent = uneSalle.codeDept;
            tr.insertCell().textContent = lesDepts.byCodeDept(uneSalle.codeDept).nomDept;
            tr.insertCell().textContent =
                lesTypEquiptsBySalle.getTotalNbEquipt(lesTypEquiptsBySalle.byNumSalle(num)).toFixed(0);
            // création balise <a> pour appel page modification du détail de la salle
            balisea = document.createElement("a");
            balisea.classList.add('img_modification'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueSalleListe.modifierSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
            // création balise <a> pour appel page suppression d'une salle
            balisea = document.createElement("a");
            balisea.classList.add('img_corbeille'); // définition class contenant l’image (voir css)
            balisea.onclick = function () { vueSalleListe.supprimerSalleClick(uneSalle.numSalle); };
            tr.insertCell().appendChild(balisea);
        }
        // définition événement onclick sur bouton "ajouter"
        this.form.btnAjouter.onclick = function () { vueSalleListe.ajouterSalleClick(); };
    }
    detailSalleClick(num) {
        // redirection vers « salle_edit.html »avec indication du statut « affi » et du numéro de salle
        location.href = "salle_edit.html?affi&" + encodeURIComponent(num);
    }
    modifierSalleClick(num) {
        // redirection vers « salle_edit.html »avec indication du statut « modif » et du numéro de salle
        location.href = "salle_edit.html?modif&" + encodeURIComponent(num);
    }
    supprimerSalleClick(num) {
        // redirection vers « salle_edit.html »avec indication du statut »suppr » et du numéro de salle
        location.href = "salle_edit.html?suppr&" + encodeURIComponent(num);
    }
    ajouterSalleClick() {
        // redirection vers « salle_edit.html »avec indication du statut « ajout »
        location.href = "salle_edit.html?ajout";
    }
}
let vueSalleListe = new VueSalleListe;
export { vueSalleListe };
//# sourceMappingURL=class_salle_liste.js.map