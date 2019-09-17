import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private router: Router, private http: HttpClient ) { }
  edita(id) {
    this.http.post<any>('http://localhost:3000/modificar', id.ID)
      .subscribe( next => console.log(next));
    console.log(id.ID);

  }

  redirige(rol) {
    if (rol === 'alumno')
      this.router.navigateByUrl('/panel-alumno');
    if (rol === 'coordinador') {
      console.log('Estoy en coordi');
      this.router.navigateByUrl('/panel-coordi');
    }
    if (rol === 'profesor') {
      this.router.navigateByUrl('/panel-profe');
      console.log('Estoy en profe');
    }
    if (rol === 'actor')
      this.router.navigateByUrl('/panel-actor');
  }

  recovery() {
    //console.log($state.current);
    this.router.navigateByUrl('^.recordarPass');
  }

  reload() {
    location.reload();
  }

  clickReturn() {
    //$window.history.back();
    window.history.go(-1);
  }


  //funcion de error
  showError(title, text, type, confirmButtonText) {
    Swal.fire({
      title: title,
      text: text,
      type: type,
      confirmButtonText: confirmButtonText
    });

  }
  isLoggedIn() {
    if (localStorage.getItem('currentUser')) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

/*
  delete = (title, text, type, confirmButtonText) => {

    Swal({
        title: "¿Deseas unirte al lado oscuro?",
        text: "Este paso marcará el resto de tu vida...",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#DD6B55",
        confirmButtonText: "¡Claro!",
        cancelButtonText: "No, jamás",
        closeOnConfirm: false,
        closeOnCancel: false
      },

      (isConfirm) => {
        if (isConfirm) {
          Swal("¡Hecho!",
            "Ahora eres uno de los nuestros",
            "success");
        } else {
          Swal("¡Gallina!",
            "Tu te lo pierdes...",
            "error");
        }
      });
  };*/

}
