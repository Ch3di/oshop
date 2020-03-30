import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').valueChanges();
  }

  getObjectsKeys() {
    return this.db.list('/products').snapshotChanges();
  }

  get(productID) {
    return this.db.object('/products/' + productID).valueChanges();
  }

  update(productID, product) {
    return this.db.object('/products/' + productID).update(product);
  }

  delete(productID) {
    return this.db.object('/products/' + productID).remove();
  }
}
