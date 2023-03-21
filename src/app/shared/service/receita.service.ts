import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReceitaResponse } from '../model/receita.model';
import { CreateBody } from '../model/createBody.model';

@Injectable({
  providedIn: 'root'
})
export class ReceitaService {


  localUrl = "http://localhost:8080";

  apiUrlAllCurrentMonth = this.localUrl + "/api/receita/all/currentmonth";
  apiUrlAllSpecificMonth = this.localUrl + "/api/receita/all/month?data_ref=";
  
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }


  public getReceitasCurrentMonth(): Observable<ReceitaResponse> {
    return this.httpClient.get<ReceitaResponse>(this.apiUrlAllCurrentMonth)
  }

  public getReceitasSpecificMonth(mes: string): Observable<ReceitaResponse> {
    return this.httpClient.get<ReceitaResponse>(this.apiUrlAllSpecificMonth + mes)
  }

  public createReceita(receitaBody: CreateBody): Observable<CreateBody> {
    return this.httpClient.post<CreateBody>(this.localUrl + "/api/receita/create", receitaBody)
  }

}
