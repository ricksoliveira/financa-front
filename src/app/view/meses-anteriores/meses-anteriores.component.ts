import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { DespesaResponse } from 'src/app/shared/model/despesa.model';
import { DespesaFilter } from 'src/app/shared/model/despesaFilter.model';
import { MesResponse } from 'src/app/shared/model/mes.model';
import { MesObjectResponse } from 'src/app/shared/model/mesObject.model';
import { ReceitaResponse } from 'src/app/shared/model/receita.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { DespesaService } from 'src/app/shared/service/despesa.service';
import { MesService } from 'src/app/shared/service/mes.service';
import { ReceitaService } from 'src/app/shared/service/receita.service';

const EMPTY_DESPESA_RESPONSE: DespesaResponse[] = [
  {total: 0.0, size:0, despesas: [{despesa_id: 0, categoria_id: 0, valor: '', data_ref: '', nota: ''}]}
];

const EMPTY_RECEITA_RESPONSE: ReceitaResponse[] = [
  {total: 0.0, size:0, receitas: [{receita_id: 0, categoria_id: 0, valor: '', data_ref: '', nota: ''}]}
];

@Component({
  selector: 'app-meses-anteriores',
  templateUrl: './meses-anteriores.component.html',
  styleUrls: ['./meses-anteriores.component.css']
})
export class MesesAnterioresComponent {

  filter!: string;
  queryParam!: string;
  categoriaNome!: string;
  categoriaId!: number;
  totalParcial!: number;
  mesString!: string;
  mesDisplayString!: string;

  dataSource: any
  categoriaList!: Categoria[];

  dataSourceMes: any
  mesesList!: MesResponse[];
  objectList!: MesObjectResponse[];
  mesesSize!: number;

  displayedDespesaColumns: string[] = ['nota', 'valor'];
  dataSourceDespesa: any
  despesaList!: DespesaResponse[];
  totalDespesa!: number;


  displayedResultadoColumns: string[] = ['nota', 'valor'];
  dataSourceResultado: any
  resultadoList!: DespesaResponse[];
  totalResultado!: number;


  displayedReceitaColumns: string[] = ['nota', 'valor'];
  dataSourceReceita: any
  receitaList!: ReceitaResponse[];
  totalReceita!: number;

  categoriaVisivel!: boolean;
  resultadoVisivel!: boolean;

  ngOnInit(){
    this.getMeses();
    this.getCategoriaDespesas();
    this.categoriaVisivel = false;
    this.resultadoVisivel = false;
  }

  constructor(
    public receitaService: ReceitaService,
    public despesaService: DespesaService,
    public mesService: MesService,
    public categoriaService: CategoriaService
  ){}

  getMeses(){
    this.mesService.getMeses().subscribe(
      data => {
        this.objectList = data.meses
        this.mesesSize = data.size
      }
    )
  }

  getCategoriaDespesas(){
    this.categoriaService.getCategoriaDespesas().subscribe(
      data => {
        this.categoriaList = data
        this.dataSource = new MatTableDataSource(this.categoriaList)
      }
    )
  }

  onSelected(value: any){
    if(value.mes < 10){

      switch(value.mes){
        case 1:
          this.mesString = 'Janeiro'
          break
        case 2:
          this.mesString = 'Fevereiro'
          break
        case 3:
          this.mesString = 'Março'
          break
        case 4:
          this.mesString = 'Abril'
          break
        case 5:
          this.mesString = 'Maio'
          break
        case 6:
          this.mesString = 'Junho'
          break
        case 7:
          this.mesString = 'Julho'
          break
        case 8:
          this.mesString = 'Agosto'
          break
        case 9:
          this.mesString = 'Setembro'
          break
        case 10:
          this.mesString = 'Outubro'
          break
        case 11:
          this.mesString = 'Novembro'
          break
        case 12:
          this.mesString = 'Dezembro'
          break
      }

      this.mesDisplayString = this.mesString + " / " + value.ano
      this.queryParam = value.ano + "-0" + value.mes
      this.getReceitas(this.queryParam)
      this.getDespesas(this.queryParam)

      if(this.categoriaVisivel == false){
        this.categoriaVisivel = true;
      }
      else{
        this.onSelectedCategoria2(this.categoriaId);
      }

    }
    else{
      this.mesString = value.mes + " / " + value.ano
      this.queryParam = value.ano + "-" + value.mes
      this.getReceitas(this.queryParam)
      this.getDespesas(this.queryParam)

      if(this.categoriaVisivel == false){
        this.categoriaVisivel = true;
      }
      else{
        this.onSelectedCategoria2(this.categoriaId);
      }

    }
  }

  onSelectedCategoria(value: any){
    this.categoriaNome = value.categoria_nome
    this.categoriaId = value.categoria_id
    this.getResultados(this.queryParam, this.categoriaId)
    this.resultadoVisivel = true;
  }

  onSelectedCategoria2(value: number){
    if(value != null){
      this.categoriaId = value
      this.getResultados(this.queryParam, this.categoriaId)
    }
  }

  getReceitas(mes: string){
    this.receitaService.getReceitasSpecificMonth(mes).subscribe(
      data => {
        if(data != null){
          this.receitaList = data.receitas
          this.totalReceita = data.total
          this.dataSourceReceita = new MatTableDataSource(this.receitaList)
        }
        else{
          this.receitaList = EMPTY_RECEITA_RESPONSE
          this.totalReceita = 0;
          this.dataSourceReceita = new MatTableDataSource(this.receitaList)
        }
      }
    )
  }

  getDespesas(mes: string){
    this.despesaService.getAllDespesasSpecificMonth(mes).subscribe(
      data => {
        if(data != null){
          this.despesaList = data.despesas
          this.totalDespesa = data.total
          this.totalParcial = data.total
          this.dataSourceDespesa = new MatTableDataSource(this.despesaList)
        }
        else{
          this.despesaList = EMPTY_DESPESA_RESPONSE
          this.totalDespesa = 0;
          this.totalParcial = 0;
          this.dataSourceDespesa = new MatTableDataSource(this.despesaList)
        }
      }
    )
  }

  getResultados(mes: string, cat: number){
    this.despesaService.getSpecificDespesasSpecificMonth(mes, cat).subscribe(
      data => {
        if(data != null){
          this.resultadoList = data.despesas
          this.totalResultado = data.total
          this.dataSourceResultado = new MatTableDataSource(this.resultadoList)
        }
        else{
          this.resultadoList = EMPTY_DESPESA_RESPONSE
          this.totalResultado = 0;
          this.dataSourceResultado = new MatTableDataSource(this.resultadoList)
        }
      }
    )
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceDespesa.filter = filterValue.trim().toLowerCase();

    const result = this.dataSourceDespesa.filteredData

    this.totalParcial = 0.0;
    for (let i = 0; i < result.length; i++) {
      let despesa: DespesaFilter = result[i];
      this.totalParcial += despesa.valor;
    }

  }
  

}
