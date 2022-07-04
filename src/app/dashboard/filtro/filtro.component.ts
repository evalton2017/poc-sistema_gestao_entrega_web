import { DatePipe } from '@angular/common';
import { Component,EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Filtro } from 'src/app/model/filtro';
import { Transportadora } from 'src/app/model/transportadora';
import { EntregasService } from 'src/app/service/entregas.service';


@Component({
  selector: 'sge-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.scss']
})
export class FiltroComponent implements OnInit {
  public loading = false;
  @Output() filtros = new EventEmitter();
  formFiltro!: FormGroup;
  filtro: Filtro;
  transportadoras: Transportadora[] = [];
  @Output() showSpiner: boolean = false;
  datePipe!: DatePipe;

  constructor(private formBuilder: FormBuilder,
    private entregaService:EntregasService,
    private router: Router,
    private snackBar: MatSnackBar) {
    this.filtro = new Filtro();
  }

  ngOnInit(): void {
    this.criaFormFiltro();
  }

  criaFormFiltro(){
    this.formFiltro = this.formBuilder.group({
      idTransportadora: [''],
      situacao: [''],
      numeroPedido: [''],
      dataInicio: [''],
      dataFim: ['']
    });
    this.listarTransportadoras();
  }

  pesquisa() {
    this.filtro = this.formFiltro.value;
    console.log(this.formFiltro.value)
    this.filtros.emit(this.filtro);
  }

  limpaFiltro() {
    this.formFiltro.reset();
  }

  listarTransportadoras(){
    this.loading = true;
    this.showSpiner = true;
    this.entregaService.listaTransportadoras()
     .subscribe({
         next: response => {
             this.loading = false;
             this.transportadoras = response;
       },
       error: err =>{
         this.loading = false;
         this.snackBar.open(err.message, "Erro", {duration:5000});
       }
     });
  }

  validarData() {
    const dataInicial = this.formFiltro.value.dataInicio;
    const dataFinal = this.formFiltro.value.dataFim;

    if (dataInicial > dataFinal) {
      this.snackBar.open('Data Inicial deve ser maior que a data final.', "Erro", { duration: 5000 });
      this.formFiltro.patchValue({
        fim: ['']
      })
    }
  }

  converteDate(date: Date) {
    return this.datePipe.transform(date, "yyyy-MM-dd");
  }
}
