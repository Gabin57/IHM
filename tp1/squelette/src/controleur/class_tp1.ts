type TTp1Form = {
    edtHt: HTMLInputElement
    ,edtTtc: HTMLInputElement
    ,radioTaux1: HTMLInputElement
    ,radioTaux2: HTMLInputElement
    ,radioTaux3: HTMLInputElement
    ,btnCalculer: HTMLInputElement
}

class VueTp1 {
    private _form : TTp1Form
    Invite(form: TTp1Form): void {
        this._form=form
    }
    get form():TTp1Form{return this._form}
    viderHT(): void {
        this.form.edtHt.value='';
    }
    viderTTC(): void {
        this.form.edtTtc.value='';  
    }
    calculer(): void {
        const taux1=this.form.radioTaux1;
    }
}

let vueTp1 = new VueTp1;
export {vueTp1}