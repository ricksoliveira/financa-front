import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { DespesaResponse } from 'src/app/shared/model/despesa.model';
import { ReceitaResponse } from 'src/app/shared/model/receita.model';
import { DespesaService } from 'src/app/shared/service/despesa.service';
import { ReceitaService } from 'src/app/shared/service/receita.service';


@Component({
  selector: 'app-mes-atual',
  templateUrl: './mes-atual.component.html',
  styleUrls: ['./mes-atual.component.css']
})
export class MesAtualComponent {

  displayedReceitaColumns: string[] = ['valor'];
  dataSourceReceita: any
  receitaList!: ReceitaResponse[];
  totalReceita!: number;

  displayedDespesaColumns: string[] = ['nota', 'valor'];
  dataSourceDespesa: any
  despesaList!: DespesaResponse[];
  totalDespesa!: number;

  constructor(public receitaService: ReceitaService,
    public despesaService: DespesaService){

  }

  ngOnInit(){
    this.getReceitas()
    this.getDespesas()
  }

  
  getReceitas(){
    this.receitaService.getReceitas().subscribe(
      data => {
        this.receitaList = data.receitas
        this.totalReceita = data.total
        this.dataSourceReceita = new MatTableDataSource(this.receitaList)
        console.log(this.receitaList)
      }
    )
  }

  getDespesas(){
    this.despesaService.getDespesas().subscribe(
      data => {
        this.despesaList = data.despesas
        this.totalDespesa = data.total
        this.dataSourceDespesa = new MatTableDataSource(this.despesaList)
        console.log(this.despesaList)
      }
    )
  }

}
