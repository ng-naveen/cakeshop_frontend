import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-orderlist',
  standalone: false,
  
  templateUrl: './orderlist.component.html',
  styleUrl: './orderlist.component.css'
})
export class OrderlistComponent implements OnInit{

  orderedItems: any;
  reviewForm = new FormGroup({
    reviewText: new FormControl('', Validators.required)
  });

  constructor(private service: CakeService, private router: Router) {}

  ngOnInit(): void {
    let orderStatus = this.service.listOrders()
    if (orderStatus) {
      orderStatus.subscribe(response => this.orderedItems = response);
    }
  }

  addingReview(id: any) {
    let reviewAddingStatus = this.service.addReview(id, {review_text: this.reviewForm.value.reviewText});
    if (reviewAddingStatus) {
      reviewAddingStatus.subscribe(response => this.router.navigateByUrl('order-list'));
    }
  }

}
