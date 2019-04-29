import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { ProjetSwService } from 'src/app/services/service-workers/projet-sw.service';
import { ClientSwService } from 'src/app/services/service-workers/client-sw.service';
import { Devis } from 'src/app/classes/devis';
import { Client } from 'src/app/classes/client';
import { Projet } from 'src/app/classes/projet';
import { DevisSwService } from 'src/app/services/service-workers/devis-sw.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DataSource } from '@angular/cdk/table';
import { MatSort, MatTableDataSource } from '@angular/material';

export interface LigneFormat {
  designation: string;
  gamme: string;
  quantite: number;
  puht: number;
  puttc: number;
  total: number;
}

@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {

  @Output() onHamburger: EventEmitter<void> = new EventEmitter<void>();
  
  displayedColumns: string[] = ['designation', 'gamme', 'quantite', 'puht', 'puttc', 'total'];
  dataSource;
  totalHT: number;
  totalTTC: number;
  totalQte: number;

  footers: LigneFormat;

  @ViewChild(MatSort) sort: MatSort;

  devis: Devis;
  projet: Projet;
  client: Client;
  ready: boolean = false;

  estimatedTime: number;

  constructor(private projetSw: ProjetSwService,
              private devisSw: DevisSwService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projetSw.get(+params['id']).then(projet => {
        this.projet = projet;
        this.devis = projet.devis;
        this.client = projet.client; 
      }).then(() => {
        this.devisSw.get(this.devis.id).then(devis => {

          if (devis.lignes) {
            let lignes: LigneFormat[] = [];

            devis.lignes.forEach(ligne => {
              lignes.push({
                designation: "<DESIGNATION>",
                gamme: "<GAMME>",
                quantite: ligne.quantite,
                puht: 99.99,
                puttc: 99.99,
                total: ligne.quantite * 99.99
              });
            });

            this.totalQte = lignes.map(item => item.quantite).reduce((prev, next) => prev + next);
            this.totalHT = lignes.map(item => item.puht).reduce((prev, next) => prev + next);
            this.totalTTC = lignes.map(item => item.puttc).reduce((prev, next) => prev + next);

            this.footers = {
              designation: 'Total',
              gamme: '',
              quantite: this.totalQte,
              puht: this.totalHT,
              puttc: this.totalTTC,
              total: this.totalQte * this.totalHT
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
