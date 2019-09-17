import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
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
  competencias: any[];
  categorias: any[];
  fileToUpload: File;
  respuestasList: string[] = [];

  /***********************  *********************/
  cClinico: FormGroup;
  itemList: any[] = [];
  competenciaList: any[] = [];
  categoriaList: any[] = [];
  pesoList: any[] = [];
  showTable: boolean = false;
  materia: number;
  descripcion: any;

  /***********************  *********************/
  informe: FormGroup;
  respuestasInformeList: any[] = [];

  tipos: any[] = [
    {id: 1, nombre: 'Diagnostico'},
    {id: '2', nombre: 'Caso Clinico'},
    {id: '3', nombre: 'Informe'}
  ];

  constructor( private http: HttpClient, private auth: AuthenticationService ) {

    this.diagnostico = new FormGroup({
      'materia': new FormControl('', Validators.required),
      'descripcion': new FormControl(),
      'pregunta': new FormControl('', Validators.required),
      'imagen': new FormControl(''),
      'questions': new FormControl([]),
      'respuestaOk': new FormControl('', Validators.required)
    });

    this.cClinico = new FormGroup({
      'materiaC': new FormControl('', Validators.required),
      'descripcionC': new FormControl('', Validators.required),
      'item': new FormControl([], Validators.required),
      'competencia': new FormControl([], Validators.required),
      'categoria': new FormControl([], Validators.required),
      'peso': new FormControl([], Validators.required)
    });

    this.informe = new FormGroup({
      'materiaI': new FormControl('', Validators.required),
      'puntoPartida': new FormControl('', Validators.required),
      'preguntaI': new FormControl('', Validators.required),
      'questionsI': new FormControl('', Validators.required),
      'pesoI': new FormControl('', Validators.required),
      'competenciaI': new FormControl('', Validators.required),
    });

    // Aux Funtions
   // http.get('http://localhost:3000/subject').toPromise().then((response) => this.materias = response);
    http.post<any>('http://localhost:3000/subject', '')
      .toPromise()
      .then((response) => this.materias = response.result.data );
    http.post<any>('http://localhost:3000/competencias', '')
      .toPromise()
      .then((response) => this.competencias = response.result.data );
    http.post<any>('http://localhost:3000/categorias', '')
      .toPromise()
      .then((response) => this.categorias = response.result.data );
  }
  tipoEstacion(tipo) {
    this.tipoSelected = tipo;
  }

  tipoPregunta(event) {
    this.diagnostico.value.materia = event;
    this.materia = this.diagnostico.value.materia;
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files[0];
    //this.diagnostico.get('imagen').setValue(this.fileToUpload);
  }

  addResponse(respuesta) {
    this.respuestasList.push(respuesta.value);
    respuesta.value = '';
  }
  addResponseI(respuesta) {
    this.respuestasInformeList.push(respuesta.value);
    respuesta.value = '';
  }

  eliminar(opcion) {
    this.respuestasList.indexOf(opcion);
    this.respuestasList.splice(opcion, 1);
  }

  respuestaSeleccionada(respuesta) {
    this.diagnostico.value.respuestaOk = respuesta;
  }

  tipoCompetencia(event) {
    this.competenciaList.push(event);
  }

  tipoCategoria(event) {
    this.categoriaList.push(event);
  }

  setDescripcion(event) {
    this.descripcion = this.cClinico.value.descripcionC;
    console.log(this.descripcion);
  }

  ngOnInit() {
  }

  guardarPreguntaDiagnostico() {
    this.diagnostico.value.questions = this.respuestasList;
    const formData = new FormData();

    const jsonPregunta1 = {
      materia: this.diagnostico.value.materia,
      descripcion: this.diagnostico.value.descripcion,
      pregunta: this.diagnostico.value.pregunta,
      tipo: this.diagnostico.value.tipoSelected,
      respuestaList: this.diagnostico.value.questions,
    };
    const jsonCorrectas = {
      respuestaList: this.diagnostico.value.questions,
      respuestaOk: this.diagnostico.value.respuestaOk
    };
    const file = this.fileToUpload;

    formData.append( 'file', file);
    formData.append( 'nombre', this.diagnostico.value.pregunta);

    this.http.post<any>('http://localhost:3000/newPregunta', jsonPregunta1)
      .toPromise()
      .then((next) => console.log('Response:' + next));
    this.http.post<any>('http://localhost:3000/upload', formData)
      .toPromise()
      .then((next) => {
        console.log('Response received: ', next);
      });
    this.http.post<any>('http://localhost:3000/correctas', jsonCorrectas)
      .toPromise()
      .then((response) => {
          console.log(response);
          this.auth.showError('CORRECTO', 'Pregunta creada correctamente', 'success', 'volver');
        }, // console.log('ERROR');
        (response) => {
          console.log('ERROR');
          console.log(response);
          this.auth.showError('ERROR', 'No se ha podido crear la pregunta', 'error', 'Volver');
        }
      );


    this.diagnostico.reset({
      materia: '',
      descripcion: '',
      pregunta: '',
      tipo: '',
      questions: '',
    });
  }

  addNewLineItem() {
    this.showTable = true;
    this.pesoList.push(this.cClinico.value.peso);
    this.itemList.push(this.cClinico.value.item);
    this.cClinico.reset({
      item: '',
      peso: '',
      competencia: '',
      categoria: ''
    });
  }

  guardarPreguntaCClinico() {
    this.cClinico.value.item = this.itemList;
    this.cClinico.value.competencia = this.competenciaList;
    this.cClinico.value.categoria = this.categoriaList;
    this.cClinico.value.peso = this.pesoList;

    const jsonPregunta2 = {
      materia: this.materia,
      descripcion: this.descripcion,
      item: this.cClinico.value.item,
      tipo: this.tipoSelected,
    };
    const json2 = {
      item: this.cClinico.value.item,
      competencia: this.cClinico.value.competencia,
      categoria: this.cClinico.value.categoria,
      peso: this.cClinico.value.peso,
    };
    console.log(jsonPregunta2);
    console.log(json2);
    this.http.post<any>('http://localhost:3000/addCasoClinico', jsonPregunta2)
      .toPromise()
      .then((response) => {
        console.log("OK");
        this.http.post('http://localhost:3000/addCompetencia', json2);
        this.auth.showError('CORRECTO', 'Pregunta creada correctamente', "success", "volver");
       // $miFunction.clickReturn();


      },
        (response) => {
        console.log('ERROR');
        console.log(response);
        this.auth.showError('ERROR', 'No se ha podido crear la pregunta.', "error", "Volver");
      }
    );




  }

  guardarPreguntaInforme() {
    this.informe.value.questionsI = this.respuestasInformeList;

    const jsonPregunta1 = {
      materia: this.informe.value.materiaI,
      puntoPartida: this.informe.value.puntoPartida,
      peso: this.informe.value.pesoI,
      respuestas: this.informe.value.questionsI,
      tipo: this.tipoSelected
    };

    const json2 = {
      pregunta: this.informe.value.preguntaI,
      respuestas: this.informe.value.questionsI,
      competencias: this.informe.value.competenciaI,


    };

    console.log(jsonPregunta1);


    this.http.post('http://localhost:3000/informe', jsonPregunta1)
      .toPromise()
      .then((response) => {
        console.log("OK");
        this.http.post('http://localhost:3000/insertCategoria', json2);
        this.auth.showError('CORRECTO', 'Pregunta creada correctamente', "success", "volver")
        this.auth.reload();


      },
      (response) => {
        console.log("ERROR");
        console.log(response);
        this.auth.showError('ERROR', 'No se ha podido crear la pregunta.', "error", "Volver")
      });
  }


}
