import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cakedetail',
  standalone: false,
  
  templateUrl: './cakedetail.component.html',
  styleUrl: './cakedetail.component.css'
})


export class CakedetailComponent implements OnInit{

  cake_id: any;
  cakeDetails: any;
  errorMessage: string | null = null;

  constructor(private service: CakeService, private route: ActivatedRoute, private router: Router) {
    this.cake_id = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    
    let cakeInfo = this.service.getCakeDetail(this.cake_id)
    if (cakeInfo) {
      cakeInfo.subscribe((response) => this.cakeDetails = response);
    }
  }

  addCakeToCart(id: any) {
    
    let addedStatus = this.service.addToCart(id);    
    if (addedStatus != null) {
      addedStatus.subscribe((response) => {
        alert('Item added to the cart.')
            },
    (error) => {
      if (error && error.status === 400 && error.error) {
        this.errorMessage = error.error.error;
        alert(this.errorMessage)
      }
    })
    }
  }
 
}
