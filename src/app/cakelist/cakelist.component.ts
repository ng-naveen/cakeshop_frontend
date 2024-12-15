import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cakelist',
  standalone: false,

  templateUrl: './cakelist.component.html',
  styleUrl: './cakelist.component.css'
})
export class CakelistComponent implements OnInit {

  cakesResponse: any;
  occasionsResponse: any;

  constructor(private service: CakeService) {}

  ngOnInit(): void {

    let occasionObservable = this.service.getOccasions();
    if (occasionObservable) {
      occasionObservable.subscribe(response => this.occasionsResponse = response);
    }

    let cakesObservable = this.service.getAllCakes();
    if (cakesObservable) {
      cakesObservable.subscribe((response) => this.cakesResponse = response);
    }
  }

  getCakesByOccasion(occasion: any) {
    let filteredCakesObservable = this.service.filterCakeByOccasion(occasion);
    if (filteredCakesObservable) {
      filteredCakesObservable.subscribe(response => {
        this.cakesResponse = response;
        if (this.cakesResponse.length == 0) {
          Swal.fire("No cakes!");
        }
      });
    }
  }
}
