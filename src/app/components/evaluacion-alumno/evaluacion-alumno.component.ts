import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { interval } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-evaluacion-alumno',
  templateUrl: './evaluacion-alumno.component.html'
})
export class EvaluacionAlumnoComponent implements OnInit {

  idAlumno = localStorage.getItem('id_eAlumno');
  type = localStorage.getItem('type');
  competenciasList: any[] = [];
  opciones1List: any[] = [];
  listRespUser: any[] = [];
  resultado: any[] = [];
  competencias2List: any[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/muestraCompetenciasAl', {estacion: this.idAlumno, type: this.type}).toPromise()
      .then((response) => this.competenciasList = response.result.data );
    http.post<any>('http://localhost:3000/muestraOpciones', {estacion: this.idAlumno}).toPromise()
      .then((response) => this.opciones1List = response.result.data );
    http.post<any>('http://localhost:3000/muestraDescripcion', {estacion: this.idAlumno,  type: this.type}).toPromise()
      .then((response) => this.competencias2List = response.result.data );
  }

  ngOnInit() {
  }

  addRespuestaAl(opcion) {
    this.listRespUser.push(opcion);
  }

  enviarExamenTipo1() {
    Swal.fire({
      title: '¿Desea enviar el examen?',
      text: 'Este proceso es irreversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, enviar'
    }).then((result) => {
      if (result.value) {
        this.http.post('http://localhost:3000/evaluarAl', {alumno: this.idAlumno, opcionesAl: this.listRespUser })
          .toPromise()
          .then( (response) => {
              console.log('OK');
              console.log(response);
              this.http.post<any>('http://localhost:3000/comprobarRespuestas',  {alumno: this.idAlumno, opcionesAl: this.listRespUser })
                .toPromise()
                .then((response) => this.resultado = response.result.data);
              const json1 = { respuestas: this.resultado.length,
                              totales: this.competenciasList.length,
                              estacion: this.idAlumno,
                              alumno: localStorage.getItem('id')};


              this.http.post('http://localhost:3000/calificacion', json1);
              Swal.fire(
                'Resultado',
                '¡Has acertado: ' + this.resultado.length + ' de ' + this.competenciasList.length + ' preguntas!', "success"
              );

            },
            (response) => {
              console.log('ERROR');
              console.log(response);
              this.auth.showError('ERROR', 'No se ha podido enviar el examen', 'error', 'Volver');
            }
          );
      }
    });
    history.back();
  }

}
