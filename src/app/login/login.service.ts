import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URI_AUTH = environment.API_AUTH;


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  logar(user:User){
    return this.http.post<any>(this.URI_AUTH+`auth`, user, this.httpOptions)
  }


}
