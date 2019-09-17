import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-actor',
  templateUrl: './panel-actor.component.html',
  styleUrls: ['./panel-actor.component.css']
})
export class PanelActorComponent implements OnInit {

  nonSelected: boolean = true;
  consulEstacion: boolean;

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  seleccionaOpcion(opcion) {
    if (opcion.target.name === 'consulEstacion') {
      this.nonSelected = false;
      this.consulEstacion = true;
    }
  }

}
