import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  roles: any[] = [];
  userRol: any;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private auth: AuthenticationService) {
    this.roles = data;
  }

  rolSelected(rol) {
    console.log(rol);
    this.userRol = rol;
  }
  answer() {
    console.log(this.userRol);
    if (this.userRol != null) {
      Swal.close();
     // console.log(rol);
      this.auth.redirige(this.userRol);
    }
  };



}
