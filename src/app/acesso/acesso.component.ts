import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.sass'],
  animations: [
    trigger('animacao-banner', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(-100px, 0px)'
        }),
        animate('2000ms 1s ease-in-out') // duração delay e aceleração
      ])
    ])
  ]
})
export class AcessoComponent implements OnInit {

  public estado = 'criado';

  constructor() { }

  ngOnInit() {
  }

}
