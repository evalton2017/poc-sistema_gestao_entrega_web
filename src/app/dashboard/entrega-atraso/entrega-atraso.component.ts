import { Component, Input, OnInit, AfterViewInit, Output, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Filtro } from 'src/app/model/filtro';
import { DadosEntregaTransportadora } from 'src/app/model/grafico/dados-entrega-transp';
import { relatorioTransportadora } from 'src/app/model/grafico/relatorio-transp-entrega';
import { RelatorioEntrega } from 'src/app/model/relatorio-entrega';
import { EntregasService } from 'src/app/service/entregas.service';

declare var google: any;

@Component({
  selector: 'app-entrega-atraso',
  templateUrl: './entrega-atraso.component.html',
  styleUrls: ['./entrega-atraso.component.scss']
})
export class EntregaAtrasoComponent implements OnInit,AfterViewInit  {

  displayedColumns: string[] = ['transportadora', 'pedido', 'dataEstimada', 'dataEntrega','atraso','estado'];
  dataSource!: MatTableDataSource<relatorioTransportadora>;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort = new MatSort;


  public loading = false;
  private dadosEntrega : DadosEntregaTransportadora;
  @Output() showSpiner: boolean = false;
  @Input() filtro: Filtro = new Filtro();
  relatorioEntrega: RelatorioEntrega[] = [];

  constructor( private fb: FormBuilder,
    private entregaService:EntregasService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
      this.dadosEntrega = new DadosEntregaTransportadora();
    }

    ngOnInit(): void {
      this.listarEntregasConcluidas();
    }

    ngAfterViewInit() {

    }

    init(): void{
      if(typeof(google) !== 'undefined'){
        google.charts.load('current', {'packages':['corechart']});
        setTimeout(() => {
          google.charts.setOnLoadCallback(this.exibirGraficoConcluida())
        }, 1000);
      }
    }



  listarEntregasConcluidas(){
    this.loading = true;
    this.showSpiner = true;
    this.entregaService.listaEntregaAtrasadas(this.filtro)
     .subscribe({
         next: response => {
             this.loading = false;
             this.dadosEntrega = response;
             this.relatorioEntrega = response.relatorio;
             this.dataSource = new MatTableDataSource(response.relatorio);
             this.dataSource.paginator = this.paginator;
             this.dataSource.sort = this.sort;
             this.dataSource.paginator = this.paginator;
             this.init();
       },
       error: err =>{
         this.loading = false;
         this.snackBar.open(err.message, "Erro", {duration:5000});
       }
     });
  }



  recebeFiltros(filtros: any) {
    this.filtro = filtros;
    this.filtro.situacao = 4;
    this.listarEntregasConcluidas();
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

  exibirGraficoConcluida(){
    const el = document.getElementById('grafico_entregas');
    const chart = new google.visualization.PieChart(el);
    chart.draw(this.obterDataTable(this.dadosEntrega.atrasadas), this.obterOpcoes("Entregas Atrasadas"));
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

}
