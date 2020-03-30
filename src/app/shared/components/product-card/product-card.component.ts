import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/Product';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('product') product;
  @Input('active-actions') activeActions;
  @Input('shopping-cart') shoppingCart; 
  constructor(private cartService: ShoppingCartService) { }

  addToCart(){
    this.cartService.addToCart(this.product);
  }
}
