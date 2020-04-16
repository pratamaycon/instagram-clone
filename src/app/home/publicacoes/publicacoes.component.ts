import { Component, OnInit } from '@angular/core';
import { GrudService } from 'src/app/services/grud.service';
import * as firebase from 'firebase';
import Publicacao from 'src/app/models/publicacao.model';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.scss']
})
export class PublicacoesComponent implements OnInit {

  public email: string;
  public publicacoes: Publicacao;

  constructor(private grudService: GrudService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged( (user) => {
        this.email = user.email;

        this.atualizarTimeLine();

    });
  }

  public atualizarTimeLine(): void {
    this.grudService.consularPublicacoes(this.email)
      .then( (publicacoes: Publicacao) =>{
        this.publicacoes = publicacoes;
      });
  }
}
