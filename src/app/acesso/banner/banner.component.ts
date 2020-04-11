import { imagensMockadas } from './../../mocks/imagem.mock';
import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import Imagem from 'src/app/models/imagem.model';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('2s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado = 'escondido';
  public imagens: Imagem[] = imagensMockadas;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.logicaRotacao();
    }, 3000);
  }

  public logicaRotacao(): void {
    let auxImagem: number;

    // ocultar uma imagem
    for (let i = 0; i <= 4; i++) {
      if (this.imagens[i].estado === 'visivel') {
        this.imagens[i].estado = 'escondido';

        auxImagem = i === 4 ? 0 : i + 1;

        break;
      }
    }

    // exibir a proxima imagem
    this.imagens[auxImagem].estado = 'visivel';

    setTimeout(() => {
      this.logicaRotacao();
    }, 3000);
  }

}
