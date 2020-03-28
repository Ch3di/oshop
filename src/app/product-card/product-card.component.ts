import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  // tslint:disable-next-line: no-input-rename
  @Input('product') product;
  @Input('active-actions') activeActions;
  constructor() { }


}
