import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html'
})
export class AddExamenComponent implements OnInit {

  estacionesList: any[] = [];
  estacionesSelected: any[] = [];
  addExamen: FormGroup;

  constructor(private http: HttpClient, private auth: AuthenticationService) {

    this.addExamen = new FormGroup({
      'nombreEx': new FormControl('', Validators.required),
      'anioConv': new FormControl('', Validators.required),
      'mesConv': new FormControl('', Validators.required),
    });

    http.post<any>('http://localhost:3000/listarEstaciones', '').toPromise().then((response) => this.estacionesList = response.result.data);

  }

  ngOnInit() {
  }
  addEstacionToExamen(idEstacion) {
    this.estacionesSelected.push(idEstacion);
  }
  guardarExamen() {
    const json = {
      estaciones: this.estacionesSelected,
      convocatoria: this.addExamen.value.mesConv,
      anio: this.addExamen.value.anioConv,
      nombre: this.addExamen.value.nombreEx
    };

    this.http.post<any>('http://localhost:3000/generarExamen', json)
      .toPromise()
      .then((response) => {
        console.log("OK");
        this.auth.showError('CORRECTO', 'Convocatoria Creada', "success", "volver");
        this.auth.reload();


      }, (response) => {
        console.log("ERROR");
        console.log(response);
        this.auth.showError('ERROR', 'No se ha podido crear la convocatoria.', "error", "Volver");
      });
  }
}
