import {vueTp3} from "../controleur/class_tp3"

vueTp3.init ({ 
	divListes : document.querySelector('[id=div_listes]'),
    listeRepos : document.querySelector('[id=select_repos]'),
    listeAstreinte : document.querySelector('[id=select_astreinte]'), 
    btnAjouter : document.querySelector('[id=btn_ajouter]'), 
    btnSupprimer : document.querySelector('[id=btn_supprimer]'),
    btnVersAstreinte : document.querySelector('[id=btn_vers_astreinte]'), 
    btnVersRepos : document.querySelector('[id=btn_vers_repos]'), 
    divSaisie : document.querySelector('[id=div_saisie]'), 
    edtSaisie : document.querySelector('[id=edt_saisie]')
});