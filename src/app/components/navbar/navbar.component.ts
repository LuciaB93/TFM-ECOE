import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor( private auth: AuthenticationService,
               private router: Router) {}

  ngOnInit() {
  }

  login() {
    this.router.navigateByUrl('login');
  }
  logout() {
    this.auth.logout();
  }

}
