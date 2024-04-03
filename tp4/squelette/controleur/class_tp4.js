class VueTp4 {
    init(form) {
        this._form = form;
        // cacher la partie "récapitulatif"
        // cacher la zone de saisie à renseigner quand la case "autre" est cochée
        this.form.radioMadame.onclick = function () {
            vueTp4.changeCivilite();
        };
        this.form.radioMonsieur.onclick = function () {
            vueTp4.changeCivilite();
        };
        this.form.chkAutre.onchange = function () {
            vueTp4.systemeAutreChange();
        };
        this.form.btnValider.onclick = function () {
            vueTp4.valideSaisie();
        };
        this.form.btnCorriger.onclick = function () {
            vueTp4.corrigeSaisie();
        };
        this.form.divRecap.hidden = true;
        this.form.edtAutre.hidden = true;
    }
    get form() {
        return this._form;
    }
    changeCivilite() {
        // Madame ==> "Née le", Monsieur ==> "Né le"
        let chaine;
        if (this.form.radioMadame.checked) {
            chaine = "Née le";
        }
        else {
            chaine = "Né le";
        }
        // changement de la balise <label> liée à la zone de saisie "edt_nais"
        this.form.edtDtNais.labels[0].textContent = chaine;
    }
    systemeAutreChange() {
        // cacher la zone de saisie "edt_autre" si la case "autre" est décochée
        this.form.edtAutre.hidden = !this.form.chkAutre.checked;
        this.form.edtAutre.value = '';
        // placer le focus sur la zone de saisie
        this.form.edtAutre.focus();
    }
    valideSaisie() {
        // récupération des données du formulaire dans des variables
        let civilite = "";
        if (this.form.radioMadame.checked) {
            civilite = this.form.radioMadame.value;
        }
        else if (this.form.radioMonsieur.checked) {
            civilite = this.form.radioMonsieur.value;
        }
        const nom = this.form.edtNom.value.trim();
        const prenom = this.form.edtPrenom.value.trim();
        const dtnais = this.form.edtDtNais.valueAsDate;
        const experience = this.form.edtExperience.value;
        const diplome = this.form.listeDiplome.value;
        const autre = this.form.edtAutre.value.trim();
        let systeme = "";
        // récupérer toutes les cases à cocher de "système"
        if (this.form.chkWindows.checked) {
            systeme += this.form.chkWindows.value + ', ';
        }
        if (this.form.chkLinux.checked) {
            systeme += this.form.chkLinux.value + ', ';
        }
        systeme += autre;
        // traitement des erreurs
        let erreur = "";
        if (civilite.length === 0) {
            erreur += "Civilité à sélectionner<br>";
        }
        if (nom.length === 0) {
            erreur += "Nom à renseigner<br>";
        }
        if (prenom.length === 0) {
            erreur += "Prénom à renseigner<br>";
        }
        if (dtnais === null) {
            erreur += "Date de naissance à renseigner<br>";
        }
        if (diplome.length === 0) {
            erreur += "Diplôme à renseigner<br>";
        }
        const nb = Number(experience); // si la valeur n'est pas un nombre, nb 0
        if (nb < 1) {
            erreur += "Expérience doit être supérieure à 1 année<br>";
        }
        if (systeme.length === 0) {
            erreur += "Au moins un système à cocher<br>";
        }
        else if (!this.form.edtAutre.hidden) {
            // si système "autre" est coché alors "autre" ne doit pas être vide
            if (autre.length === 0) {
                erreur += 'Système "autre"<br>';
            }
        }
        // affichage des informations dans la partie récapitulatif
        // sinon affichage message d'erreur
        if (erreur.length === 0) {
            // rendre inactif la partie "formulaire"
            // rendre visible la partie "récapitulatif"
            // cacher les boutons du formulaire
            this.form.divFormulaire.style.pointerEvents = 'none';
            this.form.divRecap.hidden = false;
            this.form.divFormBoutons.hidden = true;
            const liste = this.form.listeRecap;
            // vider la liste avant de la remplir à nouveau
            liste.length = 0;
            liste.options.add(new Option(civilite + ' ' + prenom + ' ' + nom));
            liste.options.add(new Option(dtnais.toLocaleDateString('fr')));
            liste.options.add(new Option(systeme));
            let an = 'an';
            // gestion du pluriel du nombre d'années d'expérience
            if (experience > '1') {
                an = an + 's';
            }
            liste.options.add(new Option(experience + ' ' + an + " d'expérience"));
            liste.options.add(new Option('diplôme le plus élevé : ' + diplome));
        }
        else {
            alert('Erreur dans le formulaire ' + erreur);
        }
    }
    corrigeSaisie() {
        // demande de correction de la saisie
        // ==> rendre actif la partie "formulaire", cacher la partie "récapitulatif",
        // rendre visible les boutons du formulaire
        this.form.divFormulaire.style.pointerEvents = 'auto';
        this.form.divRecap.hidden = true;
        this.form.divFormBoutons.hidden = false;
    }
}
let vueTp4 = new VueTp4;
export { vueTp4 };
//# sourceMappingURL=class_tp4.js.map