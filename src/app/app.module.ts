import { GrudService } from 'src/app/services/grud.service';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from '../app/app.routes';

import { AppComponent } from './app.component';
import { AcessoComponent } from './acesso/acesso.component';
import { BannerComponent } from './acesso/banner/banner.component';
import { CadastroComponent } from './acesso/cadastro/cadastro.component';
import { LoginComponent } from './acesso/login/login.component';
import { AuthService } from './services/auth.service';
import { HomeComponent } from './home/home.component';
import { PublicacoesComponent } from './home/publicacoes/publicacoes.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { AuthGuard } from './guard/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { IncluirPublicacaoComponent } from './home/incluir-publicacao/incluir-publicacao.component';
import { ProgressoService } from './services/progresso.service';

@NgModule({
  declarations: [
    AppComponent,
    AcessoComponent,
    BannerComponent,
    CadastroComponent,
    LoginComponent,
    HomeComponent,
    PublicacoesComponent,
    PaginaNaoEncontradaComponent,
    IncluirPublicacaoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES),
    MatFormFieldModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    GrudService,
    ProgressoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
