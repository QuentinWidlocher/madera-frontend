import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
// On fait une classe qui étend Dexie et qui va nou permettre de gérer l'IDB
export class IndexedDbService extends Dexie {



  constructor() {
    super('test');

  }
}
