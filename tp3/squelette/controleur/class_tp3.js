class VueTp3 {
    init(form) {
        this._form = form;
        this.form.divSaisie.hidden = true;
        this.form.btnAjouter.onclick = function () { vueTp3.afficherSaisie(); };
        this.form.btnSupprimer.onclick = function () { vueTp3.supprimerLigne(); };
        this.form.btnVersAstreinte.onclick = function () { vueTp3.versAstreinte(); };
        this.form.btnVersRepos.onclick = function () { vueTp3.versRepos(); };
        this.form.edtSaisie.onkeydown = function (event) { vueTp3.ajouterSaisie(event); };
    }
    get form() { return this._form; }
    afficherSaisie() {
        this.form.divListes.style.pointerEvents = 'none';
        this.form.divSaisie.hidden = false;
        this.form.edtSaisie.focus();
    }
    supprimerLigne() {
        const noLigne = this.form.listeRepos.selectedIndex;
        if (noLigne > -1)
            this.form.listeRepos.remove(noLigne);
    }
    triListe(liste) {
        const options = liste.options;
        let optionsArray = [];
        for (let i = 0; i < options.length; i++) {
            optionsArray.push(options[i]);
        }
        optionsArray = optionsArray.sort(function (a, b) {
            if (a.value > b.value) {
                return 1;
            }
            else {
                return -1;
            }
        });
        for (let i = 0; i <= options.length; i++) {
            options[i] = optionsArray[i];
        }
    }
    ajouterSaisie(ev) {
        if (ev.key === 'Enter') {
            const elt = this.form.edtSaisie;
            const liste = this.form.listeRepos;
            const chaine = elt.value.trim();
            if (chaine !== "") {
                const opt = new Option(chaine, chaine);
                liste.options.add(opt);
                this.triListe(liste);
            }
            elt.value = "";
            this.form.divListes.style.pointerEvents = 'auto';
            this.form.divSaisie.hidden = true;
        }
    }
    versAstreinte() {
        this.liste1VersListe2(this.form.listeRepos, this.form.listeAstreinte);
    }
    versRepos() {
        this.liste1VersListe2(this.form.listeAstreinte, this.form.listeRepos);
    }
    liste1VersListe2(liste1, liste2) {
        const noLigne = liste1.selectedIndex;
        if (noLigne > -1) {
            liste2.options.add(liste1.options[noLigne]);
            this.triListe(liste2);
        }
    }
}
let vueTp3 = new VueTp3;
export { vueTp3 };
//# sourceMappingURL=class_tp3.js.map