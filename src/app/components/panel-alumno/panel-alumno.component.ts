import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-panel-alumno',
  templateUrl: './panel-alumno.component.html',
  styleUrls: ['./panel-alumno.component.css']
})
export class PanelAlumnoComponent implements OnInit {

  nonSelected: boolean = true;
  consulEstacion: boolean;
  startExamn: boolean;
  showCalificacion: boolean;

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
      this.startExamn = false;
      this.showCalificacion = false;
    }
    if (opcion.target.name === 'startExamn') {
      this.nonSelected = false;
      this.consulEstacion = false;
      this.startExamn = true;
      this.showCalificacion = false;
    }
    if (opcion.target.name === 'showCalificacion') {
      this.nonSelected = false;
      this.consulEstacion = false;
      this.startExamn = false;
      this.showCalificacion = true;
    }
  }

}
