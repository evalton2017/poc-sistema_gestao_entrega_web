import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrega } from '../model/entrega';
import { DadosEntregaTransportadora } from '../model/grafico/dados-entrega-transp';
import { EntregasService } from '../service/entregas.service';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dataSource = new MatTableDataSource();
  colunas: string[] = ['Transportadora', 'Pedido', 'Status'];
  public loading = false;
  private dadosEntrega : DadosEntregaTransportadora;
  @Output() showSpiner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private entregaService:EntregasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
      this.dadosEntrega = new DadosEntregaTransportadora();
    }

  ngOnInit(): void {
    this.listarEntregas();
  }

  initLocais(): void {
    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {
        'packages': ['map'],
        'mapsApiKey': 'AIzaSyAEHIgfKjN_TmTLTsl2XMOYn-vohrvK5g0'
      });

      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirMapa())
      }, 1000);
    }
  }

  init(): void{
    if(typeof(google) !== 'undefined'){
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(this.exibirGraficoConcluida())
        google.charts.setOnLoadCallback(this.exibirGraficoDevolvido())
        google.charts.setOnLoadCallback(this.exibirGraficoAndamento())
        google.charts.setOnLoadCallback(this.exibirGraficoLocais())
      }, 1000);
    }
  }

  listarEntregas(){
    this.loading = true;
    this.showSpiner = true;
    this.entregaService.listaEntregas()
     .subscribe({
         next: response => {
             this.loading = false;
             this.dadosEntrega = response;
             this.initLocais();
             this.init();
       },
       error: err =>{
         this.loading = false;
         this.snackBar.open(err.message, "Erro", {duration:5000});
       }
     });
  }

  exibirGraficoLocais(){
    const el = document.getElementById('grafico_locais');
    const chart = new google.visualization.ScatterChart(el);
    chart.draw(this.obterDataTableLocal(this.dadosEntrega.locais), this.obterOpcoes("Entregas Por Estado"));
  }

  exibirMapa(){
    const el = document.getElementById('mapa');
    const chart = new google.visualization.Map(el);
    chart.draw(this.obterDataTableLocal(this.dadosEntrega.locais), this.obterOpcoes("Entregas Por Estado"));
  }

  exibirGraficoConcluida(){
    const el = document.getElementById('grafico_entregas');
    const chart = new google.visualization.PieChart(el);
    chart.draw(this.obterDataTable(this.dadosEntrega.concluidas), this.obterOpcoes("Entregas concluídas por Transportadora"));
  }

  exibirGraficoDevolvido(){
    const el = document.getElementById('grafico_devolucao');
    const chart = new google.visualization.PieChart(el);
    chart.draw(this.obterDataTable(this.dadosEntrega.emAndamento), this.obterOpcoes("Entregas em andamento por Transportadora"));
  }

  exibirGraficoAndamento(){
    const el = document.getElementById('grafico_atrasos');
    const chart = new google.visualization.PieChart(el);
    chart.draw(this.obterDataTable(this.dadosEntrega.devolvidas), this.obterOpcoes("Entregas em atraso por Transportadora"));
  }



  obterDataTableLocal(dados: any[]): any{
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'nome');
    data.addColumn('number', 'quantidade');
    let graficosArray: any = []
    dados.forEach((entrega, index) => {
      graficosArray [index] = [entrega.nomeTransportadora, entrega.quantidade];
    })
    data.addRows(graficosArray);
    return data;
  }

  obterDataTable(dados: any[]): any{
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'nome');
    data.addColumn('number', 'quantidade');
    let graficosArray: any = []
    dados.forEach((entrega, index) => {
      graficosArray [index] = [entrega.nomeTransportadora, entrega.quantidade];
    })
    data.addRows(graficosArray);
    return data;
  }

  obterOpcoesLocais(titulo: string): any{
    return {
      region: '076',
      displayMode: 'markers',
      colorAxis: {colors: ['green', 'blue']}
    }
  }

  obterOpcoes(titulo: string): any{
    return {
      'title': titulo
    }
  }


}
