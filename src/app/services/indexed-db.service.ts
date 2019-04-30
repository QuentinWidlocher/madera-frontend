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
import { Unite } from '../classes/unite';
import { Utilisateur } from '../classes/utilisateur';
import { DeferredQuery } from '../classes/deferred-query';

@Injectable({
  providedIn: 'root'
})
// On fait une classe qui étend Dexie et qui va nous permettre de gérer l'IDB
export class IndexedDbService extends Dexie {

  // Les tables sont publiques
  public caracteristiques: Dexie.Table<Caracteristique, number>;
  public cctps: Dexie.Table<CCTP, number>;
  public clients: Dexie.Table<Client, number>;
  public composants: Dexie.Table<Composant, number>;
  public coupesDePrincipe: Dexie.Table<CoupeDePrincipe, number>;
  public devis: Dexie.Table<Devis, number>;
  public dossiersTechniques: Dexie.Table<DossierTechnique, number>;
  public famillesComposant: Dexie.Table<FamilleComposant, number>;
  public famillesGamme: Dexie.Table<FamilleGamme, number>;
  public gammesComposant: Dexie.Table<GammeComposant, number>;
  public gammes: Dexie.Table<Gamme, number>;
  public lignes: Dexie.Table<Ligne, number>;
  public modeles: Dexie.Table<Modele, number>;
  public modules: Dexie.Table<Module, number>;
  public plans: Dexie.Table<Plan, number>;
  public produits: Dexie.Table<Produit, number>;
  public projets: Dexie.Table<Projet, number>;
  public unites: Dexie.Table<Unite, number>;
  public utilisateurs: Dexie.Table<Utilisateur, number>;

  public deferredQueries: Dexie.Table<DeferredQuery, number>;

  constructor() {
    super('Madera');

    // Si on peux rendre les données plus persistente, on le fait !
    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist().then(granted => {
        if (granted) {
          console.log('IndexedDB : Storage will not be cleared except by explicit user action');
        }
        else {
          console.warn('IndexedDB : Storage may be cleared under storage pressure.');
        }
      });
    }

    // On déclare la structure des tables
    this.version(1).stores({
      caracteristiques: '++id, value, unite',
      cctps: '++id, &code',
      clients: '++id, &code, creationDate',
      composants: '++id',
      coupesDePrincipe: '++id, &code',
      devis: '++id, &numero, creationDate, editionDate',
      dossiersTechniques: '++id, &numero, creationDate, editionDate',
      famillesComposant: '++id',
      famillesGamme: '++id',
      gammesComposant: '++id, &code',
      gammes: '++id, &code',
      lignes: '++id, devis',
      modeles: '++id, creationDate, editionDate',
      modules: '++id, creationDate, editionDate',
      plans: '++id, &number, creationDate, editionDate',
      produits: '++id, creationDate, editionDate',
      projets: '++id, creationDate, editionDate',
      unites: '++id, &code',
      utilisateurs: '++id',
      deferredQueries: '++id, type, method, date'
    });

    // On lie les structures aux propriétés
    this.caracteristiques = this.table('caracteristiques');
    this.cctps = this.table('cctps');
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
    this.unites = this.table('unites');
    this.utilisateurs = this.table('utilisateurs');

    this.deferredQueries = this.table('deferredQueries');

    // On lie les tables aux classes
    this.caracteristiques.mapToClass(Caracteristique);
    this.cctps.mapToClass(CCTP);
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
    this.unites.mapToClass(Unite);
    this.utilisateurs.mapToClass(Utilisateur);

    this.deferredQueries.mapToClass(DeferredQuery);

  }
}
