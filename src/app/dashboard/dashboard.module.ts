import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatRadioModule} from  '@angular/material/radio';
import {MatGridListModule} from  '@angular/material/grid-list';
import {MatListModule} from  '@angular/material/list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxLoadingModule } from 'ngx-loading';
import { DashboardComponent } from './dashboard.component';
import { DashBoadRoutinModule } from './dashboard.routing';
import { EntregaConcluidaComponent } from './entrega-concluida/entrega-concluida.component';
import { EntregaAtrasoComponent } from './entrega-atraso/entrega-atraso.component';
import { FiltroComponent } from './filtro/filtro.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import { NavbarComponent } from '../navbar/navbar.component';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
      DashboardComponent,
      EntregaConcluidaComponent,
      EntregaAtrasoComponent,
      FiltroComponent,
      NavbarComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(maskConfig),
    //ANGULAR MATERIAL
    MatStepperModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatButtonModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatToolbarModule,
    MatIconModule,
    MatIconModule,
    MatSnackBarModule,
    NgxLoadingModule.forRoot({}),
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    DashBoadRoutinModule

  ],
  exports:[

  ]
})
export class DashBoardModule { }
