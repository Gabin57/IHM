type TTp3Form = {
    divListes : HTMLElement, 
    listeRepos : HTMLSelectElement,
    listeAstreinte : HTMLSelectElement, 
    btnAjouter : HTMLInputElement, 
    btnSupprimer : HTMLInputElement, 
    btnVersAstreinte : HTMLInputElement,
    btnVersRepos : HTMLInputElement,
    divSaisie : HTMLElement,
    edtSaisie : HTMLInputElement
}

class VueTp3 {
    private _form : TTp3Form

    init(form : TTp3Form) : void {
        this._form = form
        this.form.divSaisie.hidden = true;
        this.form.btnAjouter.onclick = function (): void {vueTp3.afficherSaisie();}
        this.form.btnSupprimer.onclick = function (): void {vueTp3.supprimerLigne();}
        this.form.btnVersAstreinte.onclick = function (): void {vueTp3.versAstreinte();}
        this.form.btnVersRepos.onclick = function (): void {vueTp3.versRepos();}
        this.form.edtSaisie.onkeydown = function (event): void {vueTp3.ajouterSaisie(event);}
    }

    get form() : TTp3Form { return this._form }

    afficherSaisie () {
        this.form.divListes.style.pointerEvents = 'none';
        this.form.divSaisie.hidden = false;
        this.form.edtSaisie.focus();
    }

    supprimerLigne():void {
        const noLigne : number = this.form.listeRepos.selectedIndex;
        if (noLigne > -1) this.form.listeRepos.remove(noLigne);
    }

    triListe(liste : HTMLSelectElement):void {
        const options : HTMLOptionsCollection = liste.options;
        let optionsArray : HTMLOptionElement[] = [];
        for (let i = 0; i < options.length; i++) {
            optionsArray.push(options[i]);
        }
        optionsArray = optionsArray.sort(
            function (a:HTMLOptionElement, b:HTMLOptionElement):number {
                if (a.value > b.value) { 
                    return 1 
                } else { 
                    return -1 
                }
            }
        );
        for (let i = 0; i <= options.length; i++) {
            options[i] = optionsArray[i];
        }
    }

    ajouterSaisie(ev:KeyboardEvent): void {
        if (ev.key === 'Enter') {
            const elt = this.form.edtSaisie;
            const liste = this.form.listeRepos;
            const chaine : string = elt.value.trim();
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
        this.liste1VersListe2(this.form.listeRepos, this.form.listeAstreinte)
    }

    versRepos() { 
        this.liste1VersListe2(this.form.listeAstreinte, this.form.listeRepos)
    }

    liste1VersListe2(liste1 : HTMLSelectElement, liste2 : HTMLSelectElement) {
        const noLigne : number = liste1.selectedIndex;
        if (noLigne > -1) {
            liste2.options.add(liste1.options[noLigne]);
            this.triListe(liste2);
        }
    }
}

let vueTp3 = new VueTp3;
export { vueTp3 }