import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-failed',
  templateUrl: './login-failed.component.html',
  styleUrls: ['./login-failed.component.css']
})
export class LoginFailedComponent {

  constructor(
    public dialogRef: MatDialogRef<LoginFailedComponent>
  ){}


  closeDialog(){
    this.dialogRef.close();
  }

}
