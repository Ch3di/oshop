import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Product } from './app/models/Product';
import { take, map } from 'rxjs/operators';
import { ShoppingCart } from './app/models/shopping-cart';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }
  
  async addToCart(product) {
    this.updateQuantity(product, 1);
  }

  async removeFromCart(product) {
    this.updateQuantity(product, -1);
  }

  create() {
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async clearCart() {
    let cartID = await this.getOrCreateCart();
    this.db.object('/shopping-carts/' + cartID).remove();
  }
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartID = await this.getOrCreateCart();
    return this.db.object('/shopping-carts/' + cartID).valueChanges().pipe(map(x => {
      return x ? new ShoppingCart(x['items']) : new ShoppingCart({});
    }));
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  private async getOrCreateCart(): Promise<string> {
    let cartID = localStorage.getItem('cartID');
    if (!cartID) {
      let result = await this.create();
      localStorage.setItem('cartID', result.key);
      return result.key;
    }
    return cartID;
  }

  private async updateQuantity(product, change: number) {
    let cartID = await this.getOrCreateCart();
    let item$ = this.getItem(cartID, product.title);
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      if (item) {
        let quantity = item['quantity'] + change;
        if (quantity === 0) item$.remove();
        else item$.update({ quantity: quantity});
      } else {
        item$.update({ product: product, quantity: 1});
      }
    });
  }
}
