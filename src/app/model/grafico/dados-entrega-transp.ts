import { RelatorioEntrega } from "../relatorio-entrega";
import { relatorioTransportadora } from "./relatorio-transp-entrega";

export class DadosEntregaTransportadora {
  concluidas: relatorioTransportadora[] = [];
  emAndamento: relatorioTransportadora[]= [];
  devolvidas: relatorioTransportadora[]= [];
  locais: relatorioTransportadora[]= [];
  relatorio: RelatorioEntrega[] = [];
  atrasadas: relatorioTransportadora[] = [];
}
