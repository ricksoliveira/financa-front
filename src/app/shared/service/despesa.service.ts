import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DespesaResponse } from '../model/despesa.model';
import { CreateBody } from '../model/createBody.model';

@Injectable({
  providedIn: 'root'
})
export class DespesaService {

  localUrl = "http://localhost:8080";

  allDespesaCurrentMonthUrl = this.localUrl + "/api/despesa/all/currentmonth";
  specificDespesaCurrentMonthUrl = this.localUrl +"/api/despesa/parcial/currentmonth?";
  specificDespesaSpecificMonthUrl = this.localUrl + "/api/despesa/parcial/";
  allDespesaSpecificMonthUrl = this.localUrl + "/api/despesa/all/month?data_ref=";
  

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getAllDespesasCurrentMonth(): Observable<DespesaResponse> {
    return this.httpClient.get<DespesaResponse>(this.allDespesaCurrentMonthUrl)
  }

  public getSpecificDespesasCurrentMonth(cat: number): Observable<DespesaResponse> {
    return this.httpClient.get<DespesaResponse>(this.specificDespesaCurrentMonthUrl + "&categoria_id=" + cat)
  }

  public getAllDespesasSpecificMonth(mes: string): Observable<DespesaResponse> {
    return this.httpClient.get<DespesaResponse>(this.allDespesaSpecificMonthUrl + mes)
  }


  public getSpecificDespesasSpecificMonth(mes: string, cat: number): Observable<DespesaResponse> {
    return this.httpClient.get<DespesaResponse>(this.specificDespesaSpecificMonthUrl
                                                + "month?data_ref=" + mes
                                                + "&categoria_id=" + cat)
  }


  public createDespesa(despesaBody: CreateBody): Observable<CreateBody> {
    return this.httpClient.post<CreateBody>(this.localUrl + "/api/despesa/create", despesaBody)
  }



  
}
