import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  forma: FormGroup;
  roles: any;
  roles_aux: any;
/*
  usario: Object = {
    DNI: "76629676",
    password: "lucia1234",
    correo: "sfdsfs@gmail.com"
  };*/

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute,
              private auth: AuthenticationService, private dialog: MatDialog) {
    /*this.forma = new FormGroup({
      'DNI': new FormControl('',
        [Validators.required,
          Validators.minLength(6)
        ]),
      'password': new FormControl('', Validators.required),
      'correo': new FormControl('', [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')
      ])

    });*/

  }

  ngOnInit() {
  }

}
