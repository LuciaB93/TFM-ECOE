import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-asign-estacion',
  templateUrl: './asign-estacion.component.html'
})
export class AsignEstacionComponent implements OnInit {

  showGroups: boolean = false;
  estacion: number;
  groupList: any[] = [];
  estacionList: any [] = [];
  alumList: any[] = [];
  alumGroupSelected: any[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listarGrupos', '').toPromise().then((response) => this.groupList = response.result.data);
    http.post<any>('http://localhost:3000/listarEstaciones', '').toPromise().then((response) => this.estacionList = response.result.data);
    http.post<any>('http://localhost:3000/listaAlumnosGrupo', '').toPromise().then((response) => this.alumList = response.result.data);
  }

  ngOnInit() {
  }

  asigEstacion( estacion ) {
    this.showGroups = true;
    this.estacion = estacion;
  }
  addGroupToEstacion( idGrupo ) {
    this.alumGroupSelected.push(idGrupo);
  }

  guardarEstacion() {
    const json = {estacion: this.estacion, grupos: this.alumGroupSelected};
    this.http.post<any>('http://localhost:3000/asignarAlumno' , json)
      .toPromise()
      .then((response) => {
      console.log("OK");
      console.log(response);
      this.auth.showError('CORRECTO','Estación asignada correctamente', "success","volver");
      this.auth.reload();
    },
    (response) => {
      console.log("ERROR");
      console.log(response);
      this.auth.showError('ERROR','No se ha podido asignar la estación.',"error","Volver")
    });
  }
}
