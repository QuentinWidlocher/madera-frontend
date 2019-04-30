import { Component, OnInit } from '@angular/core';
import { DossierTechniqueApiService } from '../../../services/api/dossier-technique-api.service';
import { DossierTechnique } from '../../../classes/dossier-technique';
import { ModeleApiService } from '../../../services/api/modele-api.service';
import { Modele } from '../../../classes/modele';

@Component({
  selector: 'app-dossier-technique',
  templateUrl: './dossier-technique.component.html',
  styleUrls: ['./dossier-technique.component.scss']
})
export class DossierTechniqueComponent implements OnInit {

  dossierTechnique: DossierTechnique;

  constructor(private dossierApi: DossierTechniqueApiService, private modeleApi: ModeleApiService) { }

  ngOnInit() {
    this.dossierTechnique = DossierTechnique.newEmpty();
    // on rempli le dossier
    this.dossierApi.get(1).subscribe((dossierTechnique: DossierTechnique) => {
      this.dossierTechnique = dossierTechnique;

      // on rempli le model
      this.modeleApi.get(this.dossierTechnique.modele.id).subscribe((modele: Modele) => {
        this.dossierTechnique.modele = modele;

        // on rempli les produits
        this.dossierTechnique.modele.modeleProduit
        this.modeleApi.get(this.dossierTechnique.modele.id).subscribe((modele: Modele) => {
          this.dossierTechnique.modele = modele;

          console.log(this.dossierTechnique);
        }

          , err => { console.log(err) });

        console.log(this.dossierTechnique);
      }

        , err => { console.log(err) });
    }

      , err => { console.log(err) });
  }

}
