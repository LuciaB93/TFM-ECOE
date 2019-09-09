import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent{
  roles: any[] = [];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {

    console.log('Esto que es:' + data);
    this.roles = data;
    console.log('Los roles: ' + this.roles);
  }

  answer(answer) {
    if (answer != null) {
      //mddDialog.hide(answer);
      console.log(answer);
     // $miFunction.redirige(answer);
    }
  };



}
