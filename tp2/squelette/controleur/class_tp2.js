class VueTp2 {
    init(form) {
        this._form = form;
        // définition des événements
        this.form.edtSaisie.onkeydown = function (event) { vueTp2.ajouterSaisie(event); };
        this.form.chkTri.onchange = function () { vueTp2.trierListe(); };
        this.form.btnVider.onclick = function () { vueTp2.viderListe(); };
        this.form.btnSupprimer.onclick = function () { vueTp2.supprimerLigne(); };
    }
    get form() { return this._form; }
    viderListe() {
        this.form.listeTexte.length = 0;
    }
    supprimerLigne() {
        const liste = this.form.listeTexte;
        const noLigne = liste.selectedIndex;
        if (noLigne > -1) {
            liste.remove(noLigne);
        }
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
    trierListe() {
        if (this.form.chkTri.checked) {
            this.triListe(this.form.listeTexte);
        }
    }
    ajouterSaisie(ev) {
        if (ev.key === 'Enter') {
            const elt = this.form.edtSaisie;
            const liste = this.form.listeTexte;
            const chaine = elt.value.trim();
            if (chaine !== "") {
                const opt = new Option(chaine, chaine);
                liste.options.add(opt);
                this.trierListe();
            }
            elt.value = "";
            elt.focus();
        }
    }
}
let vueTp2 = new VueTp2;
export { vueTp2 };
//# sourceMappingURL=class_tp2.js.map