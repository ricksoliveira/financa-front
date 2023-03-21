import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent {

  displayedColumns: string[] = ['categoria_id', 'categoria_nome', 'categoria_codigo'];
  dataSource: any
  categoriaList!: Categoria[];

  constructor(
    public categoriaService: CategoriaService
  ){}

  ngOnInit(){
    this.getCategorias()
  }
  
  
  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categoriaList = data
        this.dataSource = new MatTableDataSource(this.categoriaList)
      }
    )
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
