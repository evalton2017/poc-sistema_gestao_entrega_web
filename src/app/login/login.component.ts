import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginError: boolean = false;
  private user: User;
  @Output() showSpiner: boolean = false;
  loading = false;

  form!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private loginService:LoginService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.gerarForm();
    this.showSpiner = true;
  }


  gerarForm(){
    this.form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['', [Validators.required, Validators.min(6)]]
    });

  }

  onSubmit(){
   this.loading = true;
   this.showSpiner = true;
   this.user = this.form.value;
   this.loginService.logar(this.user)
    .subscribe({
        next: response => {
            this.loading = false;
            localStorage['token'] = response.token;
            localStorage['user'] = JSON.stringify(response);
            this.router.navigate(['/relatorios/dashboard']);
      },
      error: err =>{
        this.loading = false;
        let msg: string = "Usuario ou senha inválidos.";
        if(err['status']==401){
          msg = "Email/senha invalidos";
        }
        this.snackBar.open(msg, "Erro", {duration:5000});
      }
    });
  }

  esqueciSenha(){

  }



}
