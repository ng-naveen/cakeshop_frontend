import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';

@Component({
  selector: 'app-cartlist',
  standalone: false,
  
  templateUrl: './cartlist.component.html',
  styleUrl: './cartlist.component.css'
})
export class CartlistComponent implements OnInit{

  cartItems: any;

  constructor(private service: CakeService) {}

  ngOnInit(): void {
    
    let status =  this.service.listCartItems();
    if (status) {
      status.subscribe((response) => this.cartItems = response);
    }
  }

  removeItem(id: any) {
    let cartRemovalObservable = this.service.removeCakeInCart(id)
    if (cartRemovalObservable) {
      cartRemovalObservable.subscribe((response) => this.ngOnInit())
    }
  }

}
