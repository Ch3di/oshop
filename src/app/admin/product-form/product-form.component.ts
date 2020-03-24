import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../category.service';
import { ProductService } from '../../../product.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<unknown>;
  product = {};
  id;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private router: Router) {
    this.categories$ = categoryService.getCategories();

    this.id = route.snapshot.paramMap.get('id');
    if (this.id) {
      productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
    }
  }


  save(product){
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm("Are you sure you want to delete this product ?")) return;
    else this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
