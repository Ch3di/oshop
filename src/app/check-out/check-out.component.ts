import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  cart$: Observable<ShoppingCart>;

  constructor(
    private cartService: ShoppingCartService
    ) { }

  async ngOnInit() {
    this.cart$ = await this.cartService.getCart();
  }

}
