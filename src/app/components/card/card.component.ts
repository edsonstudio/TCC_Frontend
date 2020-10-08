import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../../models/Product';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  images = environment.images;
  constructor() { }

  @Input()
    styleCard: string;

  @Input()
    product: Product;

  @Input()
    className = 'scale';

  ngOnInit() {
  }


}

