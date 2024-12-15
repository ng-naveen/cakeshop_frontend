import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order',
  standalone: false,
  
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  cake_id: any;
  orderForm = new FormGroup({
    address: new FormControl('', Validators.required),
    matter: new FormControl('', Validators.required)
  });

  constructor(private service: CakeService, private route: ActivatedRoute, private router: Router) {

    this.cake_id = this.route.snapshot.params['id'];
  }

  checkoutOrder() {
    let orderStatus = this.service.placeOrder(this.cake_id, this.orderForm.value);
    console.log(orderStatus)
    if (orderStatus) {
      orderStatus.subscribe((response) => {
        Swal.fire({
          title: "Hurraiii!",
          text: "Your order placed successgully!",
          icon: "success"
        }),
        this.router.navigateByUrl('cake-list')
      });
    }
  }
}
