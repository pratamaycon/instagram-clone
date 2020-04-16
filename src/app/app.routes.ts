import { Routes } from '@angular/router';
import { AcessoComponent } from './acesso/acesso.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

export const ROUTES: Routes = [
  {path: '', component: AcessoComponent},
  {path: 'home', component: HomeComponent,
      canActivate: [
        AuthGuard
      ]},
  {path: '**', component: PaginaNaoEncontradaComponent}
];

