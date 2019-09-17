import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ver-examen',
  templateUrl: './ver-examen.component.html'
})
export class VerExamenComponent implements OnInit {

  titulaciones: any [] = [];
  estaciones: any [] = [];
  competencias: any [] = [];
  showMore: boolean = false;
  showMoreCompe: boolean = false;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listaConvocatorias' , '')
      .toPromise()
      .then((response) => this.titulaciones = response.result.data);
  }

  ngOnInit() {
  }
  showExamen( idTitu) {
    this.showMore = true;
    this.http.post<any>('http://localhost:3000/muestraExamen', {id_t: idTitu})
      .toPromise()
      .then((response) => {
      this.estaciones = response.result.data;
    });
  }

  showCompe(idEst) {
    this.showMoreCompe = true;
    this.http.post<any>('http://localhost:3000/muestraCompetencias', {estacion: idEst})
      .toPromise()
      .then((response) => {
        this.competencias = response.result.data;
      });
  }
}


