class VueTp1 {
    Invite(form) {
        this._form = form;
    }
    get form() { return this._form; }
    viderHT() {
        this.form.edtHt.value = '';
    }
    viderTTC() {
        this.form.edtTtc.value = '';
    }
    calculer() {
        const taux1 = this.form.radioTaux1;
        const taux2 = this.form.radioTaux2;
        const taux3 = this.form.radioTaux3;
        const edtHt = this.form.edtHt;
        const edtTtc = this.form.edtTtc;
        let taux = '';
        if (taux1.checked) {
            taux = taux1.value;
        }
        else if (taux2.checked) {
            taux = taux2.value;
        }
        else if (taux3.checked) {
            taux = taux3.value;
        }
        if (taux !== '') {
            const tauxTva = Number(taux) / 100;
            const ht = edtHt.value.trim();
            if (ht !== '') {
                const nb = Number(ht);
                if (isNaN(nb)) {
                    alert("Erreur - calcul impossible : le montant HT" + ht + "est invalide.");
                }
                else {
                    edtTtc.value = this.calculHtVersTtc(nb, tauxTva).toFixed(2);
                }
            }
            else {
                const ttc = edtTtc.value.trim();
                if (ttc !== '') {
                    const nb = Number(ttc);
                    if (isNaN(nb)) {
                        alert("Erreur - calcul impossible : le montant TTC" + ttc + "est invalide.");
                    }
                    else {
                        edtTtc.value = this.calculTtcVersHt(nb, tauxTva).toFixed(2);
                    }
                }
            }
        }
        else {
            alert("Erreur - calcul impossible : le Taux de TVA n'est pas renseigné.");
        }
    }
    calculHtVersTtc(ht, taux) {
        return ht * (1 + taux);
    }
    calculTtcVersHt(ttc, taux) {
        return ttc / (1 + taux);
    }
    init(form) {
        this.form.edtHt.onkeydown = function () { vueTp1.viderTTC(); };
        this.form.edtTtc.onkeydown = function () { vueTp1.viderHT(); };
        this.form.btnCalculer.onkeydown = function () { vueTp1.calculer(); };
    }
}
let vueTp1 = new VueTp1;
export { vueTp1 };
//# sourceMappingURL=class_tp1.js.map