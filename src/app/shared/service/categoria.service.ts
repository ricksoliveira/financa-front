import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  allCategoriaUrl = "http://localhost:8080/api/categoria/all";
  categoriaDespesaUrl = "http://localhost:8080/api/categoria/despesas";

  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }

  public getCategorias(): Observable<any> {
    return this.httpClient.get<Categoria>(this.allCategoriaUrl)
  }

  public getCategoriaDespesas(): Observable<any> {
    return this.httpClient.get<Categoria>(this.categoriaDespesaUrl)
  }
}
