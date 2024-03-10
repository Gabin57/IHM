type TTp2Form = {
    edtSaisie : HTMLInputElement
    , listeTexte : HTMLSelectElement
    , chkTri : HTMLInputElement
    , btnVider : HTMLInputElement
    , btnSupprimer: HTMLInputElement
   }

class VueTp2 {
    private _form : TTp2Form

    init(form : TTp2Form) : void {
        this._form = form

        this.form.edtSaisie.onkeydown
            = function (event):void { vueTp2.ajouterSaisie(event); }
        this.form.chkTri.onchange
            = function ():void { vueTp2.trierListe(); }
        this.form.btnVider.onclick
            = function ():void { vueTp2.viderListe(); }
        this.form.btnSupprimer.onclick
            = function ():void { vueTp2.supprimerLigne(); }
    }

    get form() : TTp2Form { return this._form }

    viderListe() :void {
        this.form.listeTexte.length = 0;
    }

    supprimerLigne() :void {
        const liste = this.form.listeTexte;
        const noLigne : number = liste.selectedIndex;
        if (noLigne > -1) {
            liste.remove(noLigne);
        }   
    }

    triListe(liste :HTMLSelectElement):void {
        const options : HTMLOptionsCollection = liste.options;
        let optionsArray : HTMLOptionElement[] = [];
        for (let i = 0; i < options.length; i++) {
        optionsArray.push(options[i]);
        }
        optionsArray = optionsArray.sort(function
        (a:HTMLOptionElement, b:HTMLOptionElement):number {
        if (a.value > b.value) { return 1 } else { return -1 }
        });
        for (let i = 0; i <= options.length; i++) {
        options[i] = optionsArray[i];
        }
    }
        
    trierListe() :void {
        if (this.form.chkTri.checked) {
            this.triListe(this.form.listeTexte)
        } 
    }

    ajouterSaisie(ev:KeyboardEvent) :void {
        if (ev.key === 'Enter') {
            const elt = this.form.edtSaisie;
            const liste = this.form.listeTexte;
            const chaine : string = elt.value.trim();
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
export { vueTp2 }
    