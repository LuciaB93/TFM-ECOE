import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-profe',
  templateUrl: './panel-profe.component.html',
  styleUrls: ['./panel-profe.component.css']
})
export class PanelProfeComponent implements OnInit {

  nonSelected: boolean = true;
  asignEstacion: boolean;
  cambiarPass: boolean;
  consulEstacion: boolean;
  addUser: boolean;
  delUser: boolean;

  constructor(private router: Router,
              private auth: AuthenticationService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigateByUrl('login');
    localStorage.clear();

  }


  seleccionaOpcion(opcion) {
    if (opcion.target.name === 'addUser') {
      this.nonSelected = false;
      this.addUser = true;
      this.delUser = false;
      this.asignEstacion = false;
      this.cambiarPass = false;
      this.consulEstacion = false;
    }
    if (opcion.target.name === 'delUser') {
      this.nonSelected = false;
      this.addUser = false;
      this.delUser = true;
      this.asignEstacion = false;
      this.cambiarPass = false;
      this.consulEstacion = false;
    }
    if (opcion.target.name === 'asignEstacion') {
      this.nonSelected = false;
      this.addUser = false;
      this.delUser = false;
      this.asignEstacion = true;
      this.cambiarPass = false;
      this.consulEstacion = false;
    }
    if (opcion.target.name === 'cambiarPass') {
      this.nonSelected = false;
      this.addUser = false;
      this.delUser = false;
      this.asignEstacion = false;
      this.cambiarPass = true;
      this.consulEstacion = false;
    }
    if (opcion.target.name === 'consulEstacion') {
      this.nonSelected = false;
      this.addUser = false;
      this.delUser = false;
      this.asignEstacion = false;
      this.cambiarPass = false;
      this.consulEstacion = true;
    }
  }
}
