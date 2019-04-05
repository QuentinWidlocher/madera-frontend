import { Injectable } from '@angular/core';
import { Caracteristique } from 'src/app/classes/caracteristique';
import { ConnectivityService } from './connectivity.service';

@Injectable({
  providedIn: 'root'
})
export class CaracteristiqueSwService {

  constructor(private connectivity: ConnectivityService) { }

  get(): Promise<Caracteristique[]> {

    // On retourne au final une simple Promise qui contient notre liste de contact
    return new Promise(rslv2 => {
      // On instancie une variable qui contient le résultat
      let result: Promise<Caracteristique[]>;

      // On check pour savoir si l'on appelle l'API ou l'IDB
      this.connectivity.isConnected.then(isConnected => {
        if (isConnected) {

          // Si on peux toucher l'API, on la call et on stock la Promise dans result
          result = new Promise(rslv => {
            this.contactApi.getContacts().subscribe((contactsJson: Contact[]) => {

              // On converti l'array format JSON en array d'objets Contact
              const contacts = plainToClass(Contact, contactsJson);
              const db = this.idb.contactDatabase;

              db.clear();

              // On ajoute à l'IDB les contacts obtenu (ou on met à jour les données existantes)
              contacts.forEach(contact => {
                db.add(contact);
              });

              rslv(contacts);
            });
          });
        } else {

          // Si on ne peux pas toucher l'API, on call l'IDB et on stock la Promise dans result
          result = new Promise(rslv => {
            this.idb.contactDatabase.getAll().onsuccess = function (event: any) {

              // On converti l'array format JSON en array d'objets Contact
              rslv(plainToClass(Contact, this.result));
            };
          });
        }
      }).finally(() => { // On résout la Promise des données obtenu par l'API ou l'IDB
        rslv2(result);
        this.checkIfOnline();
      });
    });
  }


}
