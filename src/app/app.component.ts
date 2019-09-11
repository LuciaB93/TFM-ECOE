import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECOE-TFM';


  /*

  messages = this.http.get<any[]>('http://localhost:3000');

  constructor(private http: HttpClient) {}

  post() {
    this.http.post<any>('http://localhost:3000/us', {username: 'lucia', password: '1234'})
      .subscribe(next => console.log(next));
  }
  */

}
