import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Categoria } from 'src/app/shared/model/categoria.model';
import { CreateBody } from 'src/app/shared/model/createBody.model';
import { CategoriaService } from 'src/app/shared/service/categoria.service';
import { DespesaService } from 'src/app/shared/service/despesa.service';
import { ReceitaService } from 'src/app/shared/service/receita.service';


const MES_STATUS = 'Aberto'

@Component({
  selector: 'app-dialog-adicionar',
  templateUrl: './dialog-adicionar.component.html',
  styleUrls: ['./dialog-adicionar.component.css']
})
export class DialogAdicionarComponent {

  dataSourceCategoria: any
  categoriaList!: Categoria[];


  value = '';
  motivoTxt = 'Motivo';

  
  formCategoriaNome!: string;
  formCategoriaId!: number;
  formValor!: number;
  formNota!: string;
  dataRef!: string;


  isButtonDisabled!: boolean;
  isNotaDisabled!: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogAdicionarComponent>,
    public categoriaService: CategoriaService,
    public despesaService: DespesaService,
    public receitaService: ReceitaService,
  ){}

  ngOnInit(){
    this.getCategorias()
    this.isButtonDisabled = true
    this.isNotaDisabled = false
  }

  closeDialog(){
    this.dialogRef.close();
  }

  onSelectedFormCategoria(value: any){
    this.formCategoriaId = value.categoria_id
    this.formCategoriaNome = value.categoria_nome
    this.isButtonDisabled = false
    if(value.categoria_id == 3 || value.categoria_id == 4){
      this.formNota = ''
      this.isNotaDisabled = true
    }
    else{
      this.isNotaDisabled = false
    }
  }

  adicionar(){
    let currentMonthString = ''
    let currentDayString = ''
    let currentMonth = new Date().getMonth() + 1
    let currentDay = new Date().getDate()

    if(currentMonth < 10){
      currentMonthString = '0' + currentMonth.toString()
    }
    else{
      currentMonthString = currentMonth.toString()
    }

    if(currentDay < 10){
      currentDayString = '0' + currentDay.toString()
    }
    else{
      currentDayString = currentDay.toString()
    }
    this.dataRef = new Date().getFullYear().toString() + '-' + currentMonthString + '-' + currentDayString

    let createBody = new CreateBody()
    createBody.categoria_id = this.formCategoriaId
    createBody.nota = this.formNota
    createBody.valor = this.formValor
    createBody.data_ref = this.dataRef
    createBody.status = MES_STATUS

    if(this.formCategoriaId == 4){
      if(confirm("\nTem certeza que deseja criar nova receita:\n"
                  + "\nCategoria:  " + createBody.categoria_id + " - " + this.formCategoriaNome
                  + "\nValor:  R$ " + createBody.valor
                  + "\nNota:  " + createBody.nota
                )){
        this.receitaService.createReceita(createBody).subscribe()
        window.location.reload()
      }
    }
    else{
      if(confirm("\nTem certeza que deseja criar o gasto:\n"
                  + "\nCategoria:  " + createBody.categoria_id + " - " + this.formCategoriaNome
                  + "\nValor:  R$ " + createBody.valor
                  + "\nNota:  " + createBody.nota
                )){
        this.despesaService.createDespesa(createBody).subscribe()
        window.location.reload()
      }
    }
  }


  getCategorias(){
    this.categoriaService.getCategorias().subscribe(
      data => {
        this.categoriaList = data
        this.dataSourceCategoria = new MatTableDataSource(this.categoriaList)
      }
    )
  }

}
