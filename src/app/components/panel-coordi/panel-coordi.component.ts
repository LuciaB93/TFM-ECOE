import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-coordi',
  templateUrl: './panel-coordi.component.html',
  styleUrls: ['./panel-coordi.component.css']
})
export class PanelCoordiComponent implements OnInit {

  nonSelected: boolean = true;
  creaPregunta: boolean;
  modPregunta: boolean;
  addUser: boolean;
  delUser: boolean;
  addGroupUser: boolean;
  listGroupUser: boolean;
  addEstacion: boolean;
  asignEstacion: boolean;
  delEstacion: boolean;
  cambiarPass: boolean;
  addExamen: boolean;
  verExamen: boolean;

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
      this.nonSelected = false;
      this.creaPregunta = true;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'modPregunta') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = true;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'addUser') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = true;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'delUser') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = true;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'addGroupUser') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = true;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'listGroupUser') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = true;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'addEstacion') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = true;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'asignEstacion') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = true;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'delEstacion') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = true;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'cambiarPass') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = true;
      this.addExamen = false;
      this.verExamen = false;
    }
    if (opcion.target.name === 'addExamen') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = true;
      this.verExamen = false;
    }
    if (opcion.target.name === 'verExamen') {
      this.nonSelected = false;
      this.creaPregunta = false;
      this.modPregunta = false;
      this.addUser = false;
      this.delUser = false;
      this.addGroupUser = false;
      this.listGroupUser = false;
      this.addEstacion = false;
      this.asignEstacion = false;
      this.delEstacion = false;
      this.cambiarPass = false;
      this.addExamen = false;
      this.verExamen = true;
    }
  }

}

