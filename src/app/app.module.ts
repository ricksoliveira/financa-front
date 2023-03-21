import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './view/home/home.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { CategoriaComponent } from './view/categoria/categoria.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { MesAtualComponent } from './view/mes-atual/mes-atual.component';
import { MesesAnterioresComponent } from './view/meses-anteriores/meses-anteriores.component';
import { EstatisticasComponent } from './view/estatisticas/estatisticas.component';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { DialogAdicionarComponent } from './view/dialog-adicionar/dialog-adicionar.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTooltipModule} from '@angular/material/tooltip';
import { LoginComponent } from './view/login/login.component';
import { AuthenticationComponent } from './view/authentication/authentication.component';
import { LoginFailedComponent } from './view/login-failed/login-failed.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoriaComponent,
    MesAtualComponent,
    MesesAnterioresComponent,
    EstatisticasComponent,
    DialogAdicionarComponent,
    LoginComponent,
    AuthenticationComponent,
    LoginFailedComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTabsModule,
    MatTableModule,
    MatInputModule,
    FormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
