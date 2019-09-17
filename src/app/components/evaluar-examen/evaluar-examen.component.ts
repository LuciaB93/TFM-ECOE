import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-evaluar-examen',
  templateUrl: './evaluar-examen.component.html'
})
export class EvaluarExamenComponent implements OnInit {

  alumList: any[] = [];
  idEstacion = sessionStorage.getItem('idEstacion');
  idProf = localStorage.getItem('id');
  compeList: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listaGruposProfesor', {id: this.idProf})
      .toPromise()
      .then((response) =>
        this.alumList = response.result.data);
    http.post<any>('http://localhost:3000/muestraCompetencias', {estacion: this.idEstacion})
      .toPromise()
      .then((response) => this.compeList = response.result.data);
  }

  ngOnInit() {
  }

}
