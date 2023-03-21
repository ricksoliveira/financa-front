import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { DespesaResponse } from 'src/app/shared/model/despesa.model';
import { DespesaFilter } from 'src/app/shared/model/despesaFilter.model';
import { ReceitaResponse } from 'src/app/shared/model/receita.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { DespesaService } from 'src/app/shared/service/despesa.service';
import { ReceitaService } from 'src/app/shared/service/receita.service';
import { DialogAdicionarComponent } from '../dialog-adicionar/dialog-adicionar.component';


const EMPTY_DESPESA_RESPONSE: DespesaResponse[] = [
  {total: 0.0, size:0, despesas: [{despesa_id: 0, categoria_id: 0, valor: '', data_ref: '', nota: ''}]}
];

const EMPTY_RECEITA_RESPONSE: ReceitaResponse[] = [
  {total: 0.0, size:0, receitas: [{receita_id: 0, categoria_id: 0, valor: '', data_ref: '', nota: ''}]}
];


@Component({
  selector: 'app-mes-atual',
  templateUrl: './mes-atual.component.html',
  styleUrls: ['./mes-atual.component.css']
})
export class MesAtualComponent {

  displayedReceitaColumns: string[] = ['nota', 'valor'];
  dataSourceReceita: any
  receitaList!: ReceitaResponse[];
  totalReceita!: number;

  displayedDespesaColumns: string[] = ['nota', 'valor'];
  dataSourceDespesa: any
  despesaList!: DespesaResponse[];
  totalDespesa!: number;

  filter!: string;
  queryParam!: string;
  categoriaNome!: string;
  categoriaId!: number;
  totalParcial!: number;

  displayedResultadoColumns: string[] = ['nota', 'valor'];
  dataSourceResultado: any
  resultadoList!: DespesaResponse[];
  totalResultado!: number;

  dataSourceCategoriaDespesas: any
  categoriaDespesaList!: Categoria[];

  constructor(
    public receitaService: ReceitaService,
    public despesaService: DespesaService,
    public categoriaService: CategoriaService,
    public dialog: MatDialog
  ){}

  resultadoVisivel!: boolean;

  ngOnInit(){
    this.getReceitas()
    this.getDespesas()
    this.getCategoriaDespesas()
  }

  openAdicionarDialog(): void {
    const dialogRef = this.dialog.open(DialogAdicionarComponent, { });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Cancelando criação de Gasto / Receita');
    });
  }

  onSelectedCategoria(value: any){
    this.categoriaNome = value.categoria_nome
    this.categoriaId = value.categoria_id
    this.getResultados(this.categoriaId)
    this.resultadoVisivel = true;
  }

  onSelectedCategoria2(value: number){
    this.categoriaId = value
    this.getResultados(this.categoriaId)
  }

  getCategoriaDespesas(){
    this.categoriaService.getCategoriaDespesas().subscribe(
      data => {
        this.categoriaDespesaList = data
        this.dataSourceCategoriaDespesas = new MatTableDataSource(this.categoriaDespesaList)
      }
    )
  }
  
  getReceitas(){
    this.receitaService.getReceitasCurrentMonth().subscribe(
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

  getDespesas(){
    this.despesaService.getAllDespesasCurrentMonth().subscribe(
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


  getResultados(cat: number){
    this.despesaService.getSpecificDespesasCurrentMonth(cat).subscribe(
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
