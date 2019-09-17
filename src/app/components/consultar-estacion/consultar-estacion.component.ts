import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultar-estacion',
  templateUrl: './consultar-estacion.component.html'
})
export class ConsultarEstacionComponent implements OnInit {

  showEvaluador: boolean;
  showSuplente: boolean;
  estacionesSList: any[] = [];
  estacionesEList: any[] = [];

  constructor(private http: HttpClient, private  auth: AuthenticationService, private router: Router) {
    http.post<any>('http://localhost:3000/listaEstacionesSuplentes', {id: localStorage.id})
      .toPromise().then((response) => this.estacionesSList = response.result.data);
    http.post<any>('http://localhost:3000/listaExamenes', {id: localStorage.id})
      .toPromise().then((response) => this.estacionesEList = response.result.data);
  }

  ngOnInit() {
  }
  showEsSuplente() {
    this.showSuplente = true;
    this.showEvaluador = false;
  }

  showEsEvaluar() {
    this.showEvaluador = true;
    this.showSuplente = false;
  }

  evaluar(idEstacion) {
    sessionStorage.setItem('idEstacion', idEstacion);
    console.log(sessionStorage.idEstacion);
    this.router.navigateByUrl('/evaluar-examen');

  }

}
