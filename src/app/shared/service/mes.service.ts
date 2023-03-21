import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MesResponse } from '../model/mes.model';

@Injectable({
  providedIn: 'root'
})
export class MesService {

  apiUrl = "http://localhost:8080/api/mes/groupmonths";
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getMeses(): Observable<MesResponse> {
    return this.httpClient.get<MesResponse>(this.apiUrl)
  }
}
