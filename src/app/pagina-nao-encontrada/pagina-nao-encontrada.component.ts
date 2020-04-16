import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-pagina-nao-encontrada',
  templateUrl: './pagina-nao-encontrada.component.html',
  styleUrls: ['./pagina-nao-encontrada.component.scss']
})
export class PaginaNaoEncontradaComponent implements OnInit {

  @Input() usuario = 'Entrar';

  constructor() { }

  ngOnInit() {

  }

}
