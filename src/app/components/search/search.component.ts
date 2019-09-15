import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  elementoBusca: any;
  usersBusca: any[] = [];

  constructor( private http: HttpClient, private activatedRotute: ActivatedRoute) {
    http.post<any>('http://localhost:3000/listaAllUser', '').toPromise()
      .then((response) =>
        this.usersBusca = response.result.data);
  }
  ngOnInit() {
    console.log(this.usersBusca);
    this.activatedRotute.params.subscribe( params => {
      this.elementoBusca = params['elemento'];
      this.usersBusca = this.buscarUsers( params['elemento']);
    });
  }

  buscarUsers( elemento: string) {
    const listUser: any[] = [];
    elemento = elemento;

    for (let u of this.usersBusca) {
      let nombre: string = u.nombre;
      if (nombre.indexOf( elemento )  >= 0) {
        listUser.push(u);
      }
    }
    return listUser;
  }

}
