import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-calification',
  templateUrl: './show-calification.component.html'
})
export class ShowCalificationComponent implements OnInit {

  clasificaciones: any[] = [];
  showFinal = false;
  calF: any;

  constructor( private http: HttpClient, private auth: AuthenticationService) {
    http.post<any>('http://localhost:3000/muestraEstacionesAlumno', {alumno: localStorage.getItem('id')} )
      .toPromise()
      .then((response) => {
      this.clasificaciones = response.result.data;
      console.log(this.clasificaciones);
      this.showFinal = true;
      for (let i=0; i<this.clasificaciones.length; i++) {
          let cal = this.clasificaciones[i].calificacion;
          if(cal == null)
            this.showFinal=false;
        }
      if(this.showFinal === true) {
          this.http.post<any>('http://localhost:3000/caliFinal', {alumno: localStorage.getItem('id')})
            .toPromise()
            .then((response) => {
              this.calF = response.result.data;
              //console.log(vm.calF)
            }
          )
        }

    });
  }

  ngOnInit() {
  }

}
