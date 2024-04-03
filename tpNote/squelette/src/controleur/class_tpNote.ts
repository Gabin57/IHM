type TTpNoteForm = {
    /* element1 : HTMLElement*/
    edtNom : HTMLInputElement,
    edtPrenom : HTMLInputElement,
    radioMadame:HTMLInputElement,
    radioMonsieur:HTMLInputElement,
    btnAjouter:HTMLInputElement,
    btnAnnuler: HTMLInputElement,
    btnRetirer: HTMLInputElement, 
    btnValider: HTMLInputElement,
    chkExpert: HTMLInputElement,
    divFormulaire: HTMLElement,
    titre: HTMLElement,
    listePersonnel: HTMLSelectElement,
    niveauEtude: HTMLInputElement,
    nombrePersonnel: HTMLInputElement
}

class VueTpNote {
    private _form : TTpNoteForm
    private _civilite : string = "Madame"; // Madame est selectionné par défaut

    init(form : TTpNoteForm) : void {
        this._form = form;
        //.hidden = true;
        //.onclick }
        //.onchange
        //= function ():void { vueTpNote.fonction(); }
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
        this.form.radioMadame.onclick = function ():void { vueTpNote.changeCivilite(); }
        this.form.radioMonsieur.onclick = function ():void { vueTpNote.changeCivilite(); }
        this.form.btnAjouter.onclick = function():void { vueTpNote.afficherFormulaire(); }
        this.form.btnRetirer.onclick = function():void { vueTpNote.supprimerLigne();}
        this.form.btnValider.onclick = function():void { vueTpNote.ajouterPersonnel(); }
        this.form.btnAnnuler.onclick = function():void { vueTpNote.annuler(); }
        this.form.chkExpert.onchange = function():void { vueTpNote.expert(); }
    }
    get form() : TTpNoteForm { return this._form }

    changeCivilite() :void {
        // Madame ==> "Experte", Monsieur ==> "Expert"
        let chaine : string;
        if (this.form.radioMadame.checked) {
            this._civilite = "Madame";
            chaine = "Experte en informatique"
        }
        else {
            this._civilite = "Monsieur";
            chaine = "Expert en informatique";
        }
        // changement de la balise <label> liée à la zone de saisie "chkExpert"
        this.form.chkExpert.labels[0].textContent = chaine;
    }

    afficherFormulaire(){
        this.form.divFormulaire.hidden = false;
        this.form.titre.hidden = false;
        this.form.chkExpert.disabled= true;
    }
    expert(){
        if (Number(this.form.niveauEtude.value) >= 5) {
            this.form.chkExpert.disabled = false;
        }
    }
    ajouterPersonnel(){
        const prenom = this.form.edtPrenom;
        const nom = this.form.edtNom;
        const etude = Number(this.form.niveauEtude.value);
        const chainePrenom : string = prenom.value.trim();
        const chaineNom : string = nom.value.trim();
        const liste = this.form.listePersonnel;
        
        this.expert();
        let entry = `${this._civilite} ${chaineNom} ${chainePrenom} - bac+${etude}`;

        if (this.form.chkExpert.checked && this._civilite === "Madame") {
            entry += ' - experte';
        } else if (this.form.chkExpert.checked && this._civilite === "Monsieur"){
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

    nombrePersonnel(){
        const nombrePersonnel = document.getElementById("nb_personnes") as HTMLInputElement;
        const incrementerButton = document.getElementById("btn_valider") as HTMLButtonElement;

        let compteur = 0;

        incrementerButton.addEventListener("click", () => {
            compteur++;
            nombrePersonnel.value = compteur.toString();
        });
    }
    supprimerLigne():void { // ---Ajouter message confirmation---
        const noLigne:number = this.form.listePersonnel.selectedIndex;
        //const message:string = "Êtes vous sûr de vouloir retirer cette ligne ?";
        if (noLigne > -1){
            this.form.listePersonnel.remove(noLigne);
        }
    }

    viderChamps(): void {
        this.form.edtPrenom.value = "";
        this.form.edtNom.value = "";
        this.form.niveauEtude.value = "";
    }

    annuler():void{
        this.viderChamps();
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
    }

    
}
let vueTpNote = new VueTpNote;
export { vueTpNote }
