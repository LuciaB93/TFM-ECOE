import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comenzar-examen-alumno',
  templateUrl: './comenzar-examen-alumno.component.html'
})
export class ComenzarExamenAlumnoComponent implements OnInit {

  estacionesAList: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService, private router: Router) {
    http.post<any>('http://localhost:3000/listaEstacionesAlum', {id: localStorage.id})
      .toPromise().then((response) => this.estacionesAList = response.result.data);
  }

  ngOnInit() {
  }

  comenzarEx(idEstacion) {
    console.log(idEstacion);
    localStorage['id_eAlumno'] = idEstacion;
    this.showVentana();

    console.log(localStorage.getItem('id_eAlumno'));
  }


  showVentana() {
    Swal.fire({
      title: 'Introducir contraseña Estación',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Acceder',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        return this.http.post<any>('http://localhost:3000/accesoExamen', {pass: login, estacion: localStorage.getItem('id_eAlumno')})
          .toPromise()
          .then(response => {
            if (response.description === 'OK') {
              localStorage['type'] = response.result.data.tipo_estacion;
              return this.router.navigateByUrl('/evaluacion-alumno');
            }
            throw new Error(response.statusText);
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Correcto!',
          'Contraseña correcta',
          'success'
        );

      }
    });
  }
}
