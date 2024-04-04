type TTpNoteForm = {
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
    nombrePersonnel: HTMLInputElement,
    divListe: HTMLSelectElement
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
        this.form.radioMadame.defaultChecked = false
        this.form.radioMonsieur.defaultChecked = false
        this.form.niveauEtude.addEventListener("input", () => {
            if (Number(this.form.niveauEtude.value) >= 5) {this.form.chkExpert.disabled = false;}
            else {
                this.form.chkExpert.disabled = true;
                this.form.chkExpert.checked = false;
            }
        })

        this.form.nombrePersonnel.defaultValue = "0"
        this.form.btnValider.addEventListener("mousedown", () => {
            this.form.nombrePersonnel.value = (1+this.form.listePersonnel.length).toString();
        });
        this.form.btnRetirer.addEventListener("mousedown", () => {
            this.form.nombrePersonnel.value = (1+this.form.listePersonnel.length).toString();
        });

        this.form.radioMadame.onclick = function ():void { vueTpNote.changeCivilite(); }
        this.form.radioMonsieur.onclick = function ():void { vueTpNote.changeCivilite(); }
        this.form.btnAjouter.onclick = function():void { vueTpNote.afficherFormulaire(); }
        this.form.btnRetirer.onclick = function():void { vueTpNote.supprimerLigne();}
        this.form.btnValider.onclick = function():void { vueTpNote.ajouterPersonnel(); }
        this.form.btnAnnuler.onclick = function():void { vueTpNote.annuler(); }
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
        this.viderChamps()
        this.form.divFormulaire.hidden = false;
        this.form.titre.hidden = false;
        this.form.chkExpert.disabled= true;
    }
    
    ajouterPersonnel(){ // s'arranger pour ne pas pouvoir supprimer ou sélectionner quelqu'un
        this.form.divListe.disabled = true;
        const prenom = this.form.edtPrenom;
        const nom = this.form.edtNom;
        const etude = Number(this.form.niveauEtude.value);
        const chainePrenom : string = prenom.value.trim();
        const chaineNom : string = nom.value.trim();
        const liste = this.form.listePersonnel;
        
        let entry = `${this._civilite} ${chaineNom} ${chainePrenom} - bac+${etude}`;

        if (this.form.chkExpert.checked && this._civilite === "Madame") {
            entry += ' - experte';
        } else if (this.form.chkExpert.checked && this._civilite === "Monsieur"){
            entry += ' - expert';
        }

        if (this.testDesErreurs()){
            const option = new Option(entry, entry);
            liste.options.add(option);

            this.viderChamps();
            this.form.divFormulaire.hidden = true;
            this.form.titre.hidden = true;
            this.form.chkExpert.disabled = true;
            entry = ``;
            this.form.divListe.disabled = false;
        }
    }

    chaineEstVide(chaine:string){
        if (chaine.length != 0){
            let nbEspaces =0
            for (let caractere of chaine){
                if (caractere === " "){
                    nbEspaces +=1
                }
            }
            if (nbEspaces != chaine.length){
                return false
            }
        }
        return true
    }

    testDesErreurs():boolean{
        let erreur = "\n\n";
        
        if (!this.form.radioMadame.checked && !this.form.radioMonsieur.checked) { erreur += "Civilité à renseigner\n"; }
        if (this.chaineEstVide(this.form.edtNom.value)) { erreur += "Nom à renseigner\n"; }
        if (this.chaineEstVide(this.form.edtPrenom.value)) { erreur += "Prénom à renseigner\n"; }
        if (this.form.niveauEtude === null || !Number.isNaN(Number(this.form.niveauEtude))) { erreur += "Niveau d'étude à renseigner avec des chiffres\n"; }
        
        if (erreur.length === 2) {
            return true
        }
        // affichage message d'erreur
        else {this.form.nombrePersonnel.value = String(Number(this.form.nombrePersonnel.value) - 1); alert('Erreur dans le formulaire '+erreur); return false;}
    }

    supprimerLigne():void { // ---Ajouter message confirmation---
        const noLigne:number = this.form.listePersonnel.selectedIndex;
        //const message:string = "Êtes vous sûr de vouloir retirer cette ligne ?";
        if (noLigne > -1){
            this.form.listePersonnel.remove(noLigne);
        }
    }

    viderChamps(): void {
        this.form.radioMadame.checked = false;
        this.form.radioMonsieur.checked = false;
        this.form.edtPrenom.value = "";
        this.form.edtNom.value = "";
        this.form.niveauEtude.value = "0";
        this.form.chkExpert.checked = false;
    }

    annuler():void{
        this.viderChamps();
        this.form.divFormulaire.hidden = true;
        this.form.titre.hidden = true;
        this.form.chkExpert.checked = false;
    }
}
let vueTpNote = new VueTpNote;
export { vueTpNote }