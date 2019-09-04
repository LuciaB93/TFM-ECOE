import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  forma: FormGroup;
  promise: any;
  usario: Object = {
    DNI: "76629676",
    password: "lucia1234",
    correo: "sfdsfs@gmail.com"
  };

  constructor( private http: HttpClient, private router: Router, private route: ActivatedRoute,
               private auth: AuthenticationService, private dialog: MatDialog) {
    this.forma = new FormGroup({
      'DNI': new FormControl('',
                                    [ Validators.required,
                                      Validators.minLength(6)
                                ]),
      'password': new FormControl('', Validators.required),
      'correo': new FormControl('', [
                                      Validators.required,
                                      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
                                    ])

    });

    this.forma.setValue(this.usario);

    /*this.http.get('/api/v1/login').subscribe((data:any) => {
     console.log(data);
    }, error => {
      console.log("There was an error generating the proper GUID on the server", error);
    });*/
    console.log('Constructor del home hecho');
  }

  ngOnInit() {
  }



  guardarCambios() {
    console.log(this.forma.value);
    console.log(this.forma);
    const json = {DNI: this.forma.value.DNI, password: this.forma.value.password};
    this.http.post<any>('http://localhost:3000/login', json)
      .subscribe(
        response => {
          this.promise = response;
          console.log(this.promise);
         });
    /*    console.log(promise);
    promise.then(function(response) {
        const id = response.data.result.id;
        const token = response.data.result.token;
        localStorage.setItem('token', token);
        localStorage.setItem('DNI', this.forma.value.DNI);
        console.log(localStorage);
        //this.roles = response.data.result.roles;
        //this.roles_aux = this.rolesToArray(this.roles);
        //localStorage.setItem('token', response.data.result.token);


        if (this.roles_aux.length === 1) {
          this.auth.redirige(this.roles_aux[0]);
        } else {
          this.showRoles(event, this.roles_aux);
        }

        // MyService.data.DNI = vm.dniModel;
        // $location.url("/alterUser");

      },
      function(response) {
        console.log("ERROR");
        console.log(response);
       // this.auth.showError('ERROR', 'Usuario Incorrecto', "error", "Volver");
        // exit();

      }
    );
     */
    this.forma.reset({
      DNI: "",
      password: "",
      correo: ""
    });
  }
/*
  rolesToArray(roles) {
    const roles_aux = [];
    if (roles.coordinador === 1)
      roles_aux.push('coordinador');
    if (roles.alum === 1)
      roles_aux.push('alumno');
    if (roles.profesor === 1)
      roles_aux.push('profesor');
    if (roles.actor === 1)
      roles_aux.push('actor');

    return roles_aux;
  }


  showRoles(ev, roles) {
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(DialogComponent, dialogConfig);
  }
*/
}
