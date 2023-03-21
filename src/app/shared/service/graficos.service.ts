import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SomaMesesResponse } from '../model/somaMeses.model';

@Injectable({
  providedIn: 'root'
})
export class GraficosService {

  localUrl = "http://localhost:8080";

  allSomaMesesUrl = this.localUrl + "/api/graficos/all";


  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }
  

  constructor(
    private httpClient: HttpClient
  ) { }


  public getAllSomaMeses(): Observable<SomaMesesResponse[]> {
    return this.httpClient.get<SomaMesesResponse[]>(this.allSomaMesesUrl)
  }
}
