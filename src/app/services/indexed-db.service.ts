import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Client } from '../classes/client';
import { Caracteristique } from '../classes/caracteristique';
import { CCTP } from '../classes/cctp';
import { Composant } from '../classes/composant';
import { CoupeDePrincipe } from '../classes/coupe-de-principe';
import { Devis } from '../classes/devis';
import { DossierTechnique } from '../classes/dossier-technique';
import { FamilleComposant } from '../classes/famille-composant';
import { FamilleGamme } from '../classes/famille-gamme';
import { GammeComposant } from '../classes/gamme-composant';
import { Gamme } from '../classes/gamme';
import { Ligne } from '../classes/ligne';
import { Modele } from '../classes/modele';
import { Module } from '../classes/module';
import { Plan } from '../classes/plan';
import { Produit } from '../classes/produit';
import { Projet } from '../classes/projet';
import { Role } from '../classes/role';
import { Unite } from '../classes/unite';
import { Utilisateur } from '../classes/utilisateur';
import { DeferredQuery } from '../classes/deferred-query';

@Injectable({
  providedIn: 'root'
})
// On fait une classe qui étend Dexie et qui va nous permettre de gérer l'IDB
export class IndexedDbService extends Dexie {

  // Les tables sont publiques
  caracteristiques: Dexie.Table<Caracteristique, number>;
  cctp: Dexie.Table<CCTP, number>;
  clients: Dexie.Table<Client, number>;
  composants: Dexie.Table<Composant, number>;
  coupesDePrincipe: Dexie.Table<CoupeDePrincipe, number>;
  devis: Dexie.Table<Devis, number>;
  dossiersTechniques: Dexie.Table<DossierTechnique, number>;
  famillesComposant: Dexie.Table<FamilleComposant, number>;
  famillesGamme: Dexie.Table<FamilleGamme, number>;
  gammesComposant: Dexie.Table<GammeComposant, number>;
  gammes: Dexie.Table<Gamme, number>;
  lignes: Dexie.Table<Ligne, number>;
  modeles: Dexie.Table<Modele, number>;
  modules: Dexie.Table<Module, number>;
  plans: Dexie.Table<Plan, number>;
  produits: Dexie.Table<Produit, number>;
  projets: Dexie.Table<Projet, number>;
  roles: Dexie.Table<Role, number>;
  unites: Dexie.Table<Unite, number>;
  utilisateurs: Dexie.Table<Utilisateur, number>;

  deferredQueries: Dexie.Table<DeferredQuery, number>;

  constructor() {
    super('Madera');

    // On déclare la structure des tables
    this.version(1).stores({
      caracteristiques: '++id, &_id, value, unite',
      cctp: '++id, &_id, &_code',
      clients: '++id, &_id, &_code, creationDate',
      composants: '++id, &_id',
      coupesDePrincipe: '++id, &_id, &_code',
      devis: '++id, &_id, &numero, creationDate, editionDate',
      dossiersTechniques: '++id, &_id, &numero, creationDate, editionDate',
      famillesComposant: '++id, &_id',
      famillesGamme: '++id, &_id',
      gammesComposant: '++id, &_id, &_code',
      gammes: '++id, &_id, &_code',
      lignes: '++id, &_id, devis',
      modeles: '++id, &_id, creationDate, editionDate',
      modules: '++id, &_id, creationDate, editionDate',
      plans: '++id, &_id, &number, creationDate, editionDate',
      produits: '++id, &_id, creationDate, editionDate',
      projets: '++id, &_id, creationDate, editionDate',
      roles: '++id, &_id, &_code',
      unites: '++id, &_id, &_code',
      utilisateurs: '++id, &_id',
      deferredQueries: '++id'
    });

    // On lie les structures aux propriétés
    this.caracteristiques = this.table('caracteristiques');
    this.cctp = this.table('cctp');
    this.clients = this.table('clients');
    this.composants = this.table('composants');
    this.coupesDePrincipe = this.table('coupesDePrincipe');
    this.devis = this.table('devis');
    this.dossiersTechniques = this.table('dossiersTechniques');
    this.famillesComposant = this.table('famillesComposant');
    this.famillesGamme = this.table('famillesGamme');
    this.gammesComposant = this.table('gammesComposant');
    this.gammes = this.table('gammes');
    this.lignes = this.table('lignes');
    this.modeles = this.table('modeles');
    this.modules = this.table('modules');
    this.plans = this.table('plans');
    this.produits = this.table('produits');
    this.projets = this.table('projets');
    this.roles = this.table('roles');
    this.unites = this.table('unites');
    this.utilisateurs = this.table('utilisateurs');

    this.deferredQueries = this.table('deferredQueries');

    // On lie les tables aux classes
    this.caracteristiques.mapToClass(Caracteristique);
    this.cctp.mapToClass(CCTP);
    this.clients.mapToClass(Client);
    this.composants.mapToClass(Composant);
    this.coupesDePrincipe.mapToClass(CoupeDePrincipe);
    this.devis.mapToClass(Devis);
    this.dossiersTechniques.mapToClass(DossierTechnique);
    this.famillesComposant.mapToClass(FamilleComposant);
    this.famillesGamme.mapToClass(FamilleGamme);
    this.gammesComposant.mapToClass(GammeComposant);
    this.gammes.mapToClass(Gamme);
    this.lignes.mapToClass(Ligne);
    this.modeles.mapToClass(Modele);
    this.modules.mapToClass(Module);
    this.plans.mapToClass(Plan);
    this.produits.mapToClass(Produit);
    this.projets.mapToClass(Projet);
    this.roles.mapToClass(Role);
    this.unites.mapToClass(Unite);
    this.utilisateurs.mapToClass(Utilisateur);

    this.deferredQueries.mapToClass(DeferredQuery);

    this.populate();
  }

  populate() {

    // this.clients.add(new Client(undefined, 'JOAVIN', 'Joanne', 'Vincent', undefined, undefined, undefined, undefined, undefined))
    //   .then(id => { this.clients.update(id, { _id: id }); });

    // this.clients.add(new Client(undefined, 'QUEWID', 'Quentin', 'Widlocher', undefined, undefined, undefined, undefined, undefined))
    //   .then(id => { this.clients.update(id, { _id: id }); });

    // this.clients.add(new Client(undefined, 'THOHOU', 'Thomas', 'Houtin', undefined, undefined, undefined, undefined, undefined))
    //   .then(id => { this.clients.update(id, { _id: id }); });


    // this.caracteristiques.add(new Caracteristique(undefined, 'Poids', 50, undefined, undefined))
    //   .then(id => { this.caracteristiques.update(id, {_id: id}); });

    // this.caracteristiques.add(new Caracteristique(undefined, 'Taille', 29, undefined, undefined))
    //   .then(id => { this.caracteristiques.update(id, { _id: id }); });

    // this.caracteristiques.add(new Caracteristique(undefined, 'Surface', 127.8, undefined, undefined))
    //   .then(id => { this.caracteristiques.update(id, { _id: id }); });
  }
}
