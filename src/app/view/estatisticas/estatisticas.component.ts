import { Component, ElementRef, ViewChild  } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { MesObjectResponse } from 'src/app/shared/model/mesObject.model';
import { SomaMesesResponse } from 'src/app/shared/model/somaMeses.model';
import { GraficosService } from 'src/app/shared/service/graficos.service';
import { MesService } from 'src/app/shared/service/mes.service';

Chart.register(...registerables);

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent {

  pieDataObject!: SomaMesesResponse;
  objectList!: MesObjectResponse[];
  searchParam!: string;

  somaMesesList!: SomaMesesResponse[];
  dataSource: any
  mesesList: string[] = [];
  receitaList: number[] = [];
  despesaList: number[] = [];
  lucroList: number[] = [];
  contaList: number[] = [];
  mantimentoList: number[] = [];
  uberList: number[] = [];
  outrosList : number[] = [];
  


  constructor(
    public graficosService: GraficosService,
    public mesService: MesService,
  ){}

  @ViewChild("receitaDespesaBarChart", {static: true}) receitaDespesaBarChartElement!: ElementRef
  @ViewChild("receitaDespesaLineChart", {static: true}) receitaDespesaLineChartElement!: ElementRef
  @ViewChild("lucroLineChart", {static: true}) lucroLineChartElement!: ElementRef
  @ViewChild("allLineChart", {static: true}) allLineChartElement!: ElementRef
  @ViewChild("pieChart", {static: true}) pieChartElement!: ElementRef

  ngOnInit(){
    this.getMeses();
    this.getSomaMesesAndRenderCharts();
  }

  renderLucroLineChart(){
    new Chart(this.lucroLineChartElement.nativeElement, {
      type: 'line',
      data: {
        labels: this.mesesList,
        datasets: [
          {
            label: 'Lucro',
            data: this.lucroList,
          }
      ]
      }
    });
  }

  renderReceitaDespesaLineChart(){
    new Chart(this.receitaDespesaLineChartElement.nativeElement, {
      type: 'line',
      data: {
        labels: this.mesesList,
        datasets: [
          {
            label: 'Receita',
            data: this.receitaList,
          },
          {
            label: 'Despesa',
            data: this.despesaList,
          }
      ]
      }
    });
  }

  renderReceitaDespesaBarChart(){
    new Chart(this.receitaDespesaBarChartElement.nativeElement, {
      type: 'bar',
      data: {
        labels: this.mesesList,
        datasets: [
          {
            label: 'Receita',
            data: this.receitaList,
          },
          {
            label: 'Despesa',
            data: this.despesaList,
          }
      ]
      }
    });
  }

  renderAllLineChart(){
    new Chart(this.allLineChartElement.nativeElement, {
      type: 'line',
      data: {
        labels: this.mesesList,
        datasets: [
          {
            label: 'Conta',
            data: this.contaList,
            backgroundColor: 'orange',
            borderColor: 'orange',
          },
          {
            label: 'Mantimento',
            data: this.mantimentoList,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
          },
          {
            label: 'Uber',
            data: this.uberList,
            backgroundColor: 'gray',
            borderColor: 'gray',
          },
          {
            label: 'Outros',
            data: this.outrosList,
            backgroundColor: 'limegreen',
            borderColor: 'limegreen',
          }
      ]
      }
    });
  }


  pie: any;
  firstPie: boolean = true
  renderPieChart(mant: number, conta: number, uber: number, outros: number){
    if(this.firstPie == true){
      this.firstPie = false;
      this.pie = new Chart(this.pieChartElement.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Mantimento', 'Conta','Uber','Outros'],
          datasets: [
            {
              data: [mant, conta, uber, outros],
              backgroundColor: ['lightblue', 'orange', 'gray', 'limegreen']
            }
          ]
        }
      });
    }
    else{
      this.pie.clear();
      this.pie.destroy();

      this.pie = new Chart(this.pieChartElement.nativeElement, {
        type: 'pie',
        data: {
          labels: ['Mantimento', 'Conta','Uber','Outros'],
          datasets: [
            {
              data: [mant, conta, uber, outros],
              backgroundColor: ['lightblue', 'orange', 'gray', 'limegreen']
            }
          ]
        }
      });
    }
  }

  

  getSomaMesesAndRenderCharts(){

    this.graficosService.getAllSomaMeses().subscribe(
      data => {
        
        this.somaMesesList = data

        for (let i = 0; i < this.somaMesesList.length; i++) {
          this.mesesList.push(this.somaMesesList[i].mes)
          this.receitaList.push(this.somaMesesList[i].receita)
          this.despesaList.push(this.somaMesesList[i].despesa)
          this.lucroList.push(this.somaMesesList[i].lucro)
          this.contaList.push(this.somaMesesList[i].conta)
          this.mantimentoList.push(this.somaMesesList[i].mantimento)
          this.uberList.push(this.somaMesesList[i].uber)
          this.outrosList.push(this.somaMesesList[i].outros)
        }
        this.renderReceitaDespesaBarChart();
        this.renderReceitaDespesaLineChart();
        this.renderLucroLineChart();
        this.renderAllLineChart();
      }
    )
  }

  onSelected(value: any){

    this.searchParam = value.mes + "/" + value.ano

    for (let i = 0; i < this.somaMesesList.length; i++) {
      if(this.somaMesesList[i].mes == this.searchParam){
        this.pieDataObject = this.somaMesesList[i]
        this.renderPieChart(this.somaMesesList[i].mantimento, this.somaMesesList[i].conta, this.somaMesesList[i].uber, this.somaMesesList[i].outros);
      }
    }

  }

  getMeses(){
    this.mesService.getMeses().subscribe(
      data => {
        this.objectList = data.meses
      }
    )
  }

}
