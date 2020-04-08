import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null),
    nome_completo: new FormControl(null),
    nome_usuario: new FormControl(null),
    senha: new FormControl(null)
  });

  constructor() { }

  ngOnInit() {
  }

  public exibirPainelLogin() {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario() {
    console.log(this.formulario);
  }

}
