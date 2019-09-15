import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-del-user',
  templateUrl: './del-user.component.html',
  styleUrls: ['./del-user.component.css']
})
export class DelUserComponent implements OnInit {

  tipoSelected: string;
  isSelected: boolean = false;
  userList: any[] = [];

  roles: any[] = [
    {id: '1', nombre: 'Alumno'},
    {id: '2', nombre: 'Coordinador'},
    {id: '3', nombre: 'Profesor'},
    {id: '4', nombre: 'Actor'}
  ];

  constructor( private http: HttpClient, private auth: AuthenticationService) {

  }

  ngOnInit() {
  }

  tipoRol(rol) {
    this.isSelected = true;
    this.tipoSelected = rol;

    this.http.post<any>('http://localhost:3000/listausuario', { rol: this.tipoSelected})
      .toPromise()
      .then((response) => this.userList = response.result.data);
  }

  eliminar(user) {
    const idUsuarioEliminar = { ID: user, rol: this.tipoSelected };
    Swal.fire({
      title: '¿Desea eliminar a este usuario?',
      text: 'Este proceso es irreversible',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.value) {
        this.http.post('http://localhost:3000/deleteUser', idUsuarioEliminar)
          .toPromise()
          .then( (response) => {
              console.log('OK');
              console.log(response);
              Swal.fire(
                'Eliminado!',
                'Usuario correctamente',
                'success'
              );
              this.auth.reload();
              //window.location.reload();
            },
            (response) => {
              console.log('ERROR');
              console.log(response);
              this.auth.showError('ERROR', 'No se ha podido eliminar el usuario', 'error', 'Volver');
            }
          );
      }
    });
  }
}
