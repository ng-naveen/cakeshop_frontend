import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CakeService } from '../services/cake.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });


  constructor(private service: CakeService, private router: Router) {}

  authenticate() {
    
    return this.service.authorize(this.loginForm.value).subscribe((response: any) => {
      let token = response.token;
      localStorage.setItem('token', `Token ${token}`);
      this.service.updateAuthState(true);
      this.router.navigateByUrl('cake-list');
    });
  }

}
