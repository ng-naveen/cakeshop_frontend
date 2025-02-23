import { Component, OnInit } from '@angular/core';
import { CakeService } from './services/cake.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'cakeboxfrontend';
  isLogged = false;

  constructor(private service: CakeService) { }

  ngOnInit(): void {
    this.service.authState.subscribe(
      (state) => {
        this.isLogged = state;
      });
  }
}
