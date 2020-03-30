import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../../../../category.service';

@Component({
  selector: 'filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent {
  categories$;
  @Input('category') category;
  constructor(categoryService: CategoryService) {
    this.categories$ = categoryService.getAll();
  }


}
