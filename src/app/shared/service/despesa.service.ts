import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DespesaResponse } from '../model/despesa.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  apiUrl = "http://localhost:8080/api/despesa/all/currentmonth";
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }


  public getDespesas(): Observable<DespesaResponse> {
    return this.httpClient.get<DespesaResponse>(this.apiUrl)
  }
}
