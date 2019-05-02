import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';
import { Devis } from 'src/app/classes/devis';
import { Client } from 'src/app/classes/client';
import { Projet } from 'src/app/classes/projet';
import { DevisSwService } from 'src/app/services/service-workers/devis-sw.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface LigneFormat {
  designation: string;
  puht: number;
  puttc: number;
}

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();
  
  displayedColumns: string[] = ['designation', 'puht', 'puttc'];
  dataSource;
  totalHT: number;
  totalTTC: number;

  footers: LigneFormat;

  @ViewChild(MatSort) sort: MatSort;

  devis: Devis;
  projet: Projet;
  client: Client;
  ready: boolean = false;

  constructor(private projetSw: ProjetSwService,
              private devisSw: DevisSwService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // Met à jour le temps estimé quand on quitte la page
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.devisSw.edit(this.devis);
      }
    });

    this.route.params.subscribe(params => {
      this.projetSw.get(+params['id']).then(projet => {
        this.projet = projet;
        this.devis = projet.devis;
        this.client = projet.client; 
      }).then(() => {
        this.devisSw.get(this.devis.id).then(devis => {

          if (devis.lignes && devis.lignes.length > 0) {
            let lignes: LigneFormat[] = [];

            devis.lignes.forEach(ligne => {
              lignes.push({
                designation: ligne.designation,
                puht: ligne.unitPriceNoTax,
                puttc: ligne.unitPriceTax,
              });
            });

            this.totalHT = lignes.map(item => item.puht).reduce((prev, next) => prev + next);
            this.totalTTC = lignes.map(item => item.puttc).reduce((prev, next) => prev + next);

            this.footers = {
              designation: 'Total',
              puht: this.totalHT,
              puttc: this.totalTTC,
            };

            this.dataSource = new MatTableDataSource(lignes);
            this.dataSource.sort = this.sort;

          }

          this.ready = true;

        });
      });
    });

  }

}
