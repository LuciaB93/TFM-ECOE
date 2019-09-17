import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-estacion',
  templateUrl: './add-estacion.component.html'
})
export class AddEstacionComponent implements OnInit {

  addEstacion: FormGroup;
  groupList: any[] = [];
  groupSelected: any[] = [];
  profList: any[] = [];
  actorList: any[] = [];
  materiaList: any[] = [];
  tipos: any[] = [
    {id: 1, nombre: 'Diagnostico'},
    {id: '2', nombre: 'Caso Clinico'},
    {id: '3', nombre: 'Informe'}
  ];
  itemList: any[] = [];
  itemSelected: any[] = [];
  showCompe: boolean = false;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.addEstacion = new FormGroup ({
      'numEstacion': new FormControl('', Validators.required),
      'nombreE': new FormControl('', Validators.required),
      'descripcionE': new FormControl('', Validators.required),
      'partida': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required),
      'peso': new FormControl('', Validators.required),
      'profSelected': new FormControl('', Validators.required),
      'actorSelected': new FormControl('', Validators.required),
      'pruebaSelected': new FormControl('', Validators.required),
      'materiaSelected': new FormControl('', Validators.required),
    });

    http.post<any>('http://localhost:3000/listarGrupos', '').toPromise().then((response) => this.groupList = response.result.data);
    http.post<any>('http://localhost:3000/listaProfesores', '').toPromise().then((response) => this.profList = response.result.data);
    http.post<any>('http://localhost:3000/listaActores', '').toPromise().then((response) => this.actorList = response.result.data);
    http.post<any>('http://localhost:3000/subject', '').toPromise().then((response) => this.materiaList = response.result.data);

  }
  addGroup(grupo) {
    this.groupSelected.push(grupo);
  }
  addProf(profesor) {
    this.addEstacion.value.profSelected = profesor;
  }
  addActor(actor) {
    this.addEstacion.value.actorSelected = actor;
  }
  tipoPrueba(tipo) {
    this.addEstacion.value.pruebaSelected = tipo;
  }
  addMateria(materia) {
    this.addEstacion.value.materia = materia;

  }
  addItem(item) {
    this.itemSelected.push(item);
    console.log(this.itemSelected);
  }

  ngOnInit() {
  }

  showCompetencias() {
    this.showCompe = true;
    const json = {
      materia: this.addEstacion.value.materiaSelected,
      tipo: this.addEstacion.value.pruebaSelected
    };

    this.http.post<any>('http://localhost:3000/listaCompetenciasTipo', json)
        .toPromise()
        .then((response) => this.itemList = response.result.data);
  }

  addNewEstacion() {
    const json1 = {
      numero: this.addEstacion.value.numEstacion,
      nombre: this.addEstacion.value.nombreE,
      descripcion: this.addEstacion.value.descripcionE,
      partida: this.addEstacion.value.partida,
      pass: this.addEstacion.value.password,
      peso: this.addEstacion.value.peso,
      tipo: this.addEstacion.value.pruebaSelected,
      actor: this.addEstacion.value.actorSelected,
      profesoresC: this.addEstacion.value.profSelected
    };
    const json2 = {
      nombre: this.addEstacion.value.nombreE,
      items: this.itemSelected
    };
    const json3 = {
      grupos: this.groupSelected,
      estacion: this.addEstacion.value.nombreE,
    };

    this.http.post<any>('http://localhost:3000/crearEstacion', json1)
      .subscribe((response) => console.log('Response:' + response));
    this.http.post<any>('http://localhost:3000/creaPreguntaEcoe', json2)
      .subscribe((response) => console.log('Response received: ', response));
    this.http.post<any>('http://localhost:3000/gruposEstacion', json3)
      .toPromise()
      .then((response) => {
          console.log(response);
          this.auth.showError('CORRECTO', 'Estación creada correctamente', "success", "volver");
          this.auth.reload();
        },
        (response) => {
          console.log('ERROR');
          console.log(response);
          this.auth.showError('ERROR', 'No se ha podido crear la estación.', "error", "Volver");
        }
      );
  }
}
