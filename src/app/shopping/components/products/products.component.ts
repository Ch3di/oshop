import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$;

  category: string;
  filteredProducts = [];
  products = [];
  cart$: Observable<any>;
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private productService: ProductService, private cartService: ShoppingCartService) {

  }

  async ngOnInit() {

    this.cart$ = await this.cartService.getCart();
    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
    .pipe(
      switchMap(products => {
        this.products = products;
        return this.route.queryParamMap;
      })
    )
    .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
  }
  private applyFilter() {
    this.filteredProducts = this.category ? this.products.filter(p => p['category'] === this.category) : this.products;
  }

}
