import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { take, min, map } from 'rxjs/operators';
import { Product } from '../../../shared/models/Product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  filteredProducts;
  request$: Subscription;
  keys$: Observable<unknown[]>;
  products$: Observable<unknown[]>;

  constructor(private productService: ProductService) {
    this.ngOnInit();
  }

  filter(query: string) {
    this.filteredProducts = query ?
      this.productList.filter(product => product.value.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())) :
      this.productList;
  }

  ngOnInit() {
    this.products$ = this.productService.getAll();
    this.keys$ = this.productService.getObjectsKeys();
    this.request$ = combineLatest([this.products$, this.keys$])
    .subscribe((result) => {
      let products = result[0];
      let keys = result[1];
      this.productList = this.generateProductList(keys, products);
      this.filteredProducts = this.productList;
    });
  }
  ngOnDestroy() {
    this.request$.unsubscribe();
  }

  private generateProductList(keys: any[], products: any[]) {
    let productList = [];
    if (products && keys) {
      for (let i = 0; i < Math.min(keys.length, products.length); i++) {
        productList.push(
          {
            key: keys[i].key,
            value: products[i]
          }
        );
      }
    }
    return productList;
  }

}
