class VueTpNote {
    constructor() {
        this._civilite = "Madame"; // Madame est selectionné par défaut
    }
    init(form) {
        this._form = form;
        //.hidden = true;
        //.onclick }
        //.onchange
        //= function ():void { vueTpNote.fonction(); }
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
        this.form.radioMadame.onclick = function () { vueTpNote.changeCivilite(); };
        this.form.radioMonsieur.onclick = function () { vueTpNote.changeCivilite(); };
        this.form.btnAjouter.onclick = function () { vueTpNote.afficherFormulaire(); };
        this.form.btnRetirer.onclick = function () { vueTpNote.supprimerLigne(); };
        this.form.btnValider.onclick = function () { vueTpNote.ajouterPersonnel(); };
        this.form.btnAnnuler.onclick = function () { vueTpNote.annuler(); };
        this.form.chkExpert.onchange = function () { vueTpNote.expert(); };
    }
    get form() { return this._form; }
    changeCivilite() {
        // Madame ==> "Experte", Monsieur ==> "Expert"
        let chaine;
        if (this.form.radioMadame.checked) {
            this._civilite = "Madame";
            chaine = "Experte en informatique";
        }
        else {
            this._civilite = "Monsieur";
            chaine = "Expert en informatique";
        }
        // changement de la balise <label> liée à la zone de saisie "chkExpert"
        this.form.chkExpert.labels[0].textContent = chaine;
    }
    afficherFormulaire() {
        this.form.divFormulaire.hidden = false;
        this.form.titre.hidden = false;
        this.form.chkExpert.disabled = true;
    }
    expert() {
        if (Number(this.form.niveauEtude.value) >= 5) {
            this.form.chkExpert.disabled = false;
        }
    }
    ajouterPersonnel() {
        const prenom = this.form.edtPrenom;
        const nom = this.form.edtNom;
        const etude = Number(this.form.niveauEtude.value);
        const chainePrenom = prenom.value.trim();
        const chaineNom = nom.value.trim();
        const liste = this.form.listePersonnel;
        this.expert();
        let entry = `${this._civilite} ${chaineNom} ${chainePrenom} - bac+${etude}`;
        if (this.form.chkExpert.checked && this._civilite === "Madame") {
            entry += ' - experte';
        }
        else if (this.form.chkExpert.checked && this._civilite === "Monsieur") {
            entry += ' - expert';
        }
        const option = new Option(entry, entry);
        liste.options.add(option);
        this.viderChamps();
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
        this.form.chkExpert.disabled = true;
        entry = ``;
    }
    nombrePersonnel() {
        const nombrePersonnel = document.getElementById("nb_personnes");
        const incrementerButton = document.getElementById("btn_valider");
        let compteur = 0;
        incrementerButton.addEventListener("click", () => {
            compteur++;
            nombrePersonnel.value = compteur.toString();
        });
    }
    supprimerLigne() {
        const noLigne = this.form.listePersonnel.selectedIndex;
        //const message:string = "Êtes vous sûr de vouloir retirer cette ligne ?";
        if (noLigne > -1) {
            this.form.listePersonnel.remove(noLigne);
        }
    }
    viderChamps() {
        this.form.edtPrenom.value = "";
        this.form.edtNom.value = "";
        this.form.niveauEtude.value = "";
    }
    annuler() {
        this.viderChamps();
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
    }
}
let vueTpNote = new VueTpNote;
export { vueTpNote };
//# sourceMappingURL=class_tpNote.js.map