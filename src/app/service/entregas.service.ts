import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entrega } from '../model/entrega';
import { Filtro } from '../model/filtro';
import { DadosEntregaTransportadora } from '../model/grafico/dados-entrega-transp';
import { Transportadora } from '../model/transportadora';

@Injectable({
  providedIn: 'root'
})
export class EntregasService {

  URI_ENTREGA = environment.API_ENTREGA;


  constructor(private http: HttpClient) { }


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  listaEntregas() : Observable<DadosEntregaTransportadora>{
    return this.http.get<any>(this.URI_ENTREGA+`entregas`, this.httpOptions)
  }

  listaTransportadoras() : Observable<Transportadora[]>{
    return this.http.get<any>(this.URI_ENTREGA+`transportadoras`, this.httpOptions)
  }

  listaEntregaComFiltro(filtro: Filtro) : Observable<DadosEntregaTransportadora>{
    const params = this.getParametros(filtro);
    return this.http.get<any>(this.URI_ENTREGA+`entregas/filtro?${params.toString()}`, this.httpOptions)
  }

  listaEntregaAtrasadas(filtro: Filtro) : Observable<DadosEntregaTransportadora>{
    const params = this.getParametros(filtro);
    return this.http.get<any>(this.URI_ENTREGA+`entregas/atrasos/filtro?${params.toString()}`,
      this.httpOptions)
  }



  private getParametros(filtro: Filtro){
    let params = new HttpParams();
    if (filtro.dataInicio !== '' &&  filtro.dataInicio !== null && filtro.dataInicio !== undefined) {
      params = params.append('dataInicio', filtro.dataInicio);
    }
    if (filtro.dataFim !== '' &&  filtro.dataFim !== null && filtro.dataFim !== undefined) {

      params = params.append('dataFim', filtro.dataFim);
    }
    if (filtro.idTransportadora !== null   && filtro.idTransportadora !== undefined) {
      params = params.append('idTransportadora', filtro.idTransportadora);
    }
    if (filtro.numeroPedido !== null && filtro.numeroPedido !== undefined){
      params = params.append('numeroPedido', filtro.numeroPedido);
    }
    if (filtro.situacao !== null && filtro.situacao !== undefined){
      params = params.append('situacao', filtro.situacao);
    }

    return params;
  }

}
