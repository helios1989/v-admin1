import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/services/api.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cartItems: IProduct[] = [];
  constructor(public cartService: CartService) { }

  ngOnInit() {

  }

  remove(i: number){
    this.cartService.removeProductSignal(i);
  }

}