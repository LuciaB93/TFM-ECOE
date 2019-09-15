import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-group-user',
  templateUrl: './list-group-user.component.html'
})
export class ListGroupUserComponent implements OnInit {

  groups: any[] = [];
  alumnos: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listarGrupos', '')
      .toPromise()
      .then((response) => this.groups = response.result.data);
    http.post<any>('http://localhost:3000/listaAlumnosGrupo', '')
      .toPromise()
      .then((response) => this.alumnos = response.result.data);
  }

  ngOnInit() {
  }

  eliminar(grupo) {
    const idGrupoEliminar = { ID: grupo};
    Swal.fire({
      title: '¿Desea eliminar a este grupo?',
      text: 'Este proceso es irreversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.http.post('http://localhost:3000/deleteGroup', idGrupoEliminar)
          .toPromise()
          .then( (response) => {
              console.log('OK');
              console.log(response);
              Swal.fire(
                'Eliminado!',
                'Grupo correctamente',
                'success'
              );
              this.auth.reload();
            },
            (response) => {
              console.log('ERROR');
              console.log(response);
              this.auth.showError('ERROR', 'No se ha podido eliminar el grupo', 'error', 'Volver');
            }
          );
      }
    });
  }


}
