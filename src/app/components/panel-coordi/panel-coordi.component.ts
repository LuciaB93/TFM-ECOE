import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-coordi',
  templateUrl: './panel-coordi.component.html',
  styleUrls: ['./panel-coordi.component.css']
})
export class PanelCoordiComponent implements OnInit {

  creaPregunta: boolean;
  modPregunta: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private auth: AuthenticationService
  ) { }

  ngOnInit() {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
  }

  seleccionaOpcion(opcion) {
    if (opcion.target.name === 'creaPregunta') {
      this.creaPregunta = true;
      this.modPregunta = false;
    }
    if (opcion.target.name === 'modPregunta') {
      this.creaPregunta = false;
      this.modPregunta = true;
    }
  }

}

