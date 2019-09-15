import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-del-estacion',
  templateUrl: './del-estacion.component.html'
})
export class DelEstacionComponent implements OnInit {

  estacionesList: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/listaEstacionesMod', '').toPromise().then(response => this.estacionesList = response.result.data);
  }

  ngOnInit() {
  }

  eliminar(idEstacion) {
    Swal.fire({
      title: '¿Desea eliminar esta estación?',
      text: 'Este proceso es irreversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.http.post('http://localhost:3000/eliminarEstacion', {ID: idEstacion})
          .toPromise()
          .then( (response) => {
              console.log('OK');
              console.log(response);
              Swal.fire(
                'Eliminado!',
                'Estación eliminada correctamente',
                'success'
              );
              this.auth.reload();
            },
            (response) => {
              console.log('ERROR');
              console.log(response);
              this.auth.showError('ERROR', 'No se ha podido eliminar la estación', 'error', 'Volver');
            }
          );
      }
    });
  }

  reload() {
    location.reload();
  }

}
