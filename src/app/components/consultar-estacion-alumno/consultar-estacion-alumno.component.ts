import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-consultar-estacion-alumno',
  templateUrl: './consultar-estacion-alumno.component.html'
})
export class ConsultarEstacionAlumnoComponent implements OnInit {

  estacionesAList: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listaEstacionesAlum', {id: localStorage.id})
      .toPromise().then((response) => this.estacionesAList = response.result.data);
  }

  ngOnInit() {
  }

}
