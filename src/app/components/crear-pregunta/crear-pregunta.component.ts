import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-crear-pregunta',
  templateUrl: './crear-pregunta.component.html',
  styleUrls: ['./crear-pregunta.component.css']
})
export class CrearPreguntaComponent implements OnInit {

  tipoSelected: number;
  diagnostico: FormGroup;
  materias: any[];
  fileToUpload: File;
  respuestasList: string[];

  tipos: any[] = [
    {id: 1, nombre: 'Diagnostico'},
    {id: '2', nombre: 'Caso Clinico'},
    {id: '3', nombre: 'Informe'}
  ];


  tipoPregunta(tipo) {
    console.log(tipo);
    this.tipoSelected = tipo;
  }
  constructor( http: HttpClient ) {
    this.diagnostico = new FormGroup({
      'materia': new FormControl(),
      'descripcion': new FormControl(),
      'pregunta': new FormControl(),
      'imagen': new FormControl(),
      'respuestas': new FormControl(),
      'listaRespuestas': new FormControl(),
      'respuestaOk': new FormControl()
    });


    // Aux Funtions
   // http.get('http://localhost:3000/subject').toPromise().then((response) => this.materias = response);
    http.post('http://localhost:3000/subject', '')
      .toPromise()
      .then((response) => this.materias = response.result.data );

  }

  handleFileInput(files: FileList) {
    console.log(files);
    this.fileToUpload = files.item(0);
    console.log(this.fileToUpload);
  }

  addResponse(respuestas) {
    console.log(respuestas);
    //this.respuestasList.push(respuestas);
  }
  ngOnInit() {
  }

  guardarPreguntaDiagnostico() {
    console.log(this.diagnostico.value);
  }





}
