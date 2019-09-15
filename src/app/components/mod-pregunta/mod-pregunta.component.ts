import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mod-pregunta',
  templateUrl: './mod-pregunta.component.html',
  styleUrls: ['./mod-pregunta.component.css']
})
export class ModPreguntaComponent implements OnInit {

  materias: any[] = [];
  tipoSelected: number;
  isSelected: boolean = false;
  items: any[] = [];

  constructor(private http: HttpClient, private auth: AuthenticationService) {

    http.post<any>('http://localhost:3000/subject', '')
      .toPromise()
      .then((response) => this.materias = response.result.data );
  }

  ngOnInit() {
  }

  tipoPregunta(tipo) {
    this.isSelected = true;
    this.tipoSelected = tipo;
    console.log(this.tipoSelected);

    this.http.post<any>('http://localhost:3000/listaCompetencias', {materia: this.tipoSelected})
        .toPromise()
        .then((response) => this.items = response.result.data);
  }


  eliminar(elemento) {
    const idCompetenciaEliminar = { ID: elemento };
    Swal.fire({
          title: '¿Desea eliminar esta pregunta?',
          text: 'Este proceso es irreversible',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.value) {
          this.http.post('http://localhost:3000/deleteQuestion', idCompetenciaEliminar)
            .toPromise()
            .then( (response) => {
              console.log('OK');
              console.log(response);
              Swal.fire(
                'Eliminado!',
                'La pregunta fue eliminada correctamente',
                'success'
              );
              this.auth.reload();
            },
              (response) => {
                console.log('ERROR');
                console.log(response);
                this.auth.showError('ERROR', 'No se ha podido crear la pregunta', 'error', 'Volver');
              }
            );
        }
      });

    /*this.auth.showError('CORRECTO','La pregunta se ha eliminador correctamente', "success","volver")
        //exit();
      },
      (response) => {
        console.log("ERROR");
        console.log(response);
        this.auth.showError('ERROR','No se ha podido eliminar la pregunta.',"error","Volver")
      }
      );*/

  }

}
