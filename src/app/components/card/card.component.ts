import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  @Input()
    styleCard: string;

  @Input()
    product: Product;

  ngOnInit() {
  }


}

