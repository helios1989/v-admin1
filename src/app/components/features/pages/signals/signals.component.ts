import { Component } from '@angular/core';
import { ApiService, IProduct } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-signals',
  templateUrl: './signals.component.html',
  styleUrls: ['./signals.component.scss']
})
export class SignalsComponent {
  public products: IProduct[] = [];
  constructor(public api: ApiService, private castService: CartService) { }

  ngOnInit() {
  }

  addToCart(product: IProduct){
    this.castService.addProductSignal(product);
  }
}
