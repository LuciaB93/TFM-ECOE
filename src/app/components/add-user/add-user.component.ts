import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent implements OnInit {

  addUser: FormGroup;
  tipoSelected: number;
  roles: any[] = [
    {id: '1', nombre: 'Alumno'},
    {id: '2', nombre: 'Coordinador'},
    {id: '3', nombre: 'Profesor'},
    {id: '4', nombre: 'Actor'}
  ];

  constructor( private http: HttpClient, private  auth: AuthenticationService) {
    this.addUser = new FormGroup({
      'DNI': new FormControl('', [
                                    Validators.required,
                                    Validators.minLength(6)
                                  ]),
      'nombre': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'rolSelected': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }
  tipoRol(rol) {
    this.tipoSelected = rol;
  }

  addNewUser() {
    const jsonUser = {
      DNI: this.addUser.value.DNI,
      nombre: this.addUser.value.nombre,
      apellidos: this.addUser.value.apellidos,
      email: this.addUser.value.email,
      password: this.addUser.value.password,
      rolSelected: this.tipoSelected
    };
    console.log(jsonUser);
    this.http.post('http://localhost:3000/registrar', jsonUser)
      .toPromise()
      .then((response) => {
        console.log("OK");
        console.log(response);
        this.auth.showError('CORRECTO','El usuario se ha registrado correctamente', "success","volver");
        this.auth.reload();
       // $miFunction.clickReturn();
        this.addUser.reset({
          DNI: '',
          nombre: '',
          apellidos: '',
          email: '',
          password: '',
          rolSelected: ''
        });
    },
    (response) => {
      console.log("ERROR");
      console.log(response);
      this.auth.showError('ERROR','No se ha podido registrar el usuario. Compruebe que ha rellenado todos los campos',"error","Volver")
    })
  }



}
