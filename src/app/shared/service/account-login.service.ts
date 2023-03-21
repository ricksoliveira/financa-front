import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioAuth } from '../model/usuarioAuth.model';

@Injectable({
  providedIn: 'root'
})
export class AccountLoginService {

  constructor(
    private httpClient: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  localUrl = "http://localhost:8080";

  apiUsuarioAuthUrl = this.localUrl + "/api/usuario/authUser";


  // public login(user: any){
  //   return new Promise((resolve) => {
  //     window.localStorage.setItem('token', 'myToken');
  //     resolve(true);
  //   });
  // }

  login(user: any): Observable<any>{
    return this.httpClient.post<any>(this.apiUsuarioAuthUrl, user)
  }

}
