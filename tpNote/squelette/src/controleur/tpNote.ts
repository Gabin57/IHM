import {vueTpNote} from "../controleur/class_tpNote.js"

vueTpNote.init (
    { edtNom :document.querySelector('[id=edt_nom]')
    ,edtPrenom :document.querySelector('[id=edt_prenom]')
    ,niveauEtude:document.querySelector('[id=edt_etude]')
    ,radioMadame :document.querySelector('[id=radio_madame]')
    ,radioMonsieur :document.querySelector('[id=radio_monsieur]')
    ,btnAjouter:document.querySelector('[id=btn_ajouter]')
    ,btnAnnuler:document.querySelector('[id=btn_annuler]')
    ,btnRetirer:document.querySelector('[id=btn_retirer]')
    ,btnValider:document.querySelector('[id=btn_valider]')
    ,chkExpert:document.querySelector('[id=chk_expert]')
    ,divFormulaire :document.querySelector('[id=div_formulaire]')
    ,listePersonnel : document.querySelector("[id=select_personnel]")
    ,titre:document.querySelector('[id=titre]')
    ,nombrePersonnel:document.querySelector('[id=nb_personnes]')
    ,txtErreur : document.querySelector("[id=txt_erreur]")
} );
