import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UsuarioAuth } from 'src/app/shared/model/usuarioAuth.model';
import { AccountLoginService } from 'src/app/shared/service/account-login.service';
import { LoginFailedComponent } from '../login-failed/login-failed.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private accountLoginService: AccountLoginService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  login = {
    username: '',
    senha: ''
  }

  usernameTxt!: string;
  senhaTxt!: string;

  async signIn(){
    try{
      const result = await this.signInAuth();
    }
    catch (error) {
      console.log(error)
    }
  }

  signInAuth(){
    try{
      this.accountLoginService.login(this.login)
        .subscribe((response: UsuarioAuth) => {
          if(response.status == "NOT_FOUND"){
            this.loginFailDialog()
          }
          else if(response.status == "UNAUTHORIZED"){
            this.loginFailDialog()
          }
          else if (response.status == "OK"){
            window.sessionStorage.setItem('nome', response.nome);
            window.sessionStorage.setItem('sobrenome', response.sobrenome);
            window.sessionStorage.setItem('token', response.response);
            this.router.navigate(['']);
          }
        });

    }
    catch (error) {
      console.log(error);
    }
  }

  loginFailDialog(): void {
    this.dialog.open(LoginFailedComponent, { });
  }
    
}
