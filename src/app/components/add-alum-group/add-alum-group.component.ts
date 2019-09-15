import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-alum-group',
  templateUrl: './add-alum-group.component.html'
})
export class AddAlumGroupComponent implements OnInit {

  addGroupUser: FormGroup;
  profesores: any[] = [];
  userList: any[] = [];
  userSelected: any[] = [];

  constructor( private http: HttpClient, private auth: AuthenticationService) {

    this.addGroupUser = new FormGroup({
      'nombreG': new FormControl('', Validators.required),
      'anioG': new FormControl('' , Validators.required),
      'profSelected': new FormControl(' ', Validators.required)
    });
    http.post<any>('http://localhost:3000/listaProfesores', '')
      .toPromise()
      .then((response) => this.profesores = response.result.data);

    http.post<any>('http://localhost:3000/listaAlumnos', '')
      .toPromise()
      .then((response) => this.userList = response.result.data);
  }



  ngOnInit() {
  }

  add(user) {
    this.userSelected.push(user);
  }
  selectProf(prof) {
    this.addGroupUser.value.profSelected = prof;
  }
  addNewGroupUser() {
    console.log(this.userSelected);
    const jsonGroupUser = {
      nombre: this.addGroupUser.value.nombreG,
      anio: this.addGroupUser.value.anioG,
      profesor: this.addGroupUser.value.profSelected,
      alumnos: this.userSelected
    };
    console.log(jsonGroupUser);

    this.http.post<any>('http://localhost:3000/crearGrupo', jsonGroupUser)
      .toPromise()
      .then((response) => {
      console.log("OK");
      this.auth.showError('CORRECTO', 'El grupo se ha creado correctamente', "success", "volver");
      this.auth.reload();
    }, (response) => {
      console.log("ERROR");
      console.log(response);
      this.auth.showError('ERROR', 'No se ha podido crear el grupo.', "error", "Volver")
    });
  }
}
