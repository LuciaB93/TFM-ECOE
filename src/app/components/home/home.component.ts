import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


 // paises: any[] = [];
  loginForm: FormGroup;

  constructor( private http: HttpClient,  private router: Router) {
    console.log('Constructor del home hecho');
    /*this.http.get('/home')
      .subscribe((data: any) => {
        console.log(data);

      });*/
  }

  ngOnInit() {
    console.log('hola2');
    //this.loginForm = new FormGroup({});
  }

  login() {
    console.log('HOLA');
    //this.router.navigate(['login']);
    //setTimeout(2500);
    //const user2 = this.loginForm.value;
    //console.log(user2);
  }

}

