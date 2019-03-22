import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Test } from '../classes/test';

@Injectable({
  providedIn: 'root'
})
// On fait une classe qui étend Dexie et qui va nou permettre de gérer l'IDB
export class IndexedDbService extends Dexie {

  // Les tables sont publiques
  tests: Dexie.Table<Test, number>;

  constructor() {
    super('test');

    // On déclare la structure des tables
    this.version(1).stores({ tests: '++id, test' });

    // On lie les structures aux objets
    this.tests = this.table('tests');
  }
}
