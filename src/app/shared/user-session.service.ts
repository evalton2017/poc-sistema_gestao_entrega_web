import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  constructor() { }


  headers(){
    let httpHeaders: HttpHeaders = new HttpHeaders();

    if(localStorage['']){
      httpHeaders = httpHeaders.set(
        'Authorization', 'Bearer' + localStorage['token']
      );
    }
    return {headers: httpHeaders};
  }


  obterDadosUsuario(){
    if(!localStorage['token']){
      return '';
    }
    return JSON.parse(localStorage['user']);
  }


  static getDadosUsuario(){
    if(!localStorage['token']){
      return '';
    }
    return JSON.parse(localStorage['user']);
  }

  isAuthenticated(url: string): boolean{
    const dados = this.obterDadosUsuario();

    if(dados.token){
      return true;
    }
    return false;
  }




}
