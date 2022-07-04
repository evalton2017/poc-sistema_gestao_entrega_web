import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { EntregaAtrasoComponent } from './entrega-atraso/entrega-atraso.component';
import { EntregaConcluidaComponent } from './entrega-concluida/entrega-concluida.component';
import { AuthService } from '../auth/auth.service';


const routes: Routes = [
  {canActivate : [AuthService],
    path:'relatorios',
    children:[
     {path:'dashboard', component: DashboardComponent},
     {path:'entregas-atraso', component: EntregaAtrasoComponent},
     {path:'concluidas', component: EntregaConcluidaComponent}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashBoadRoutinModule { }
