import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cambiar-pass',
  templateUrl: './cambiar-pass.component.html'
})
export class CambiarPassComponent implements OnInit {

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  ngOnInit() {
  }

  actualizarPass() {

  }

}
