import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaResponse } from '../model/receita.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {

  apiUrl = "http://localhost:8080/api/receita/all/currentmonth";
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }


  public getReceitas(): Observable<ReceitaResponse> {
    return this.httpClient.get<ReceitaResponse>(this.apiUrl)
  }
}
