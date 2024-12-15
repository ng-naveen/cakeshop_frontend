import { Component, OnInit } from '@angular/core';
import { CakeService } from '../services/cake.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-navbar',
  standalone: false,
  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {

  constructor(private service: CakeService, private router: Router) {}

  signout() {
    if (this.service.isAuthenticated()) {
      localStorage.removeItem('token');
      this.service.updateAuthState(false);
      this.router.navigateByUrl('');
    }
  }
}
