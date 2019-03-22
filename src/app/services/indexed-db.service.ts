import { Injectable } from '@angular/core';
import Dexie from 'dexie';
import { Test } from '../classes/test';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService extends Dexie {

  tests: Dexie.Table<Test, number>;

  constructor() {
    super('test');

    this.init();
  }

  init() {
    this.version(1).stores({ tests: '++id, test' });

    this.tests = this.table('tests');
  }
}
