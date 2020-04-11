import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Usuario from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { style, animate, keyframes, transition, state, trigger } from '@angular/animations';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  animations: [
    trigger('animation-error', [
      state('criado', style({
        opacity: 1
      })),
      transition('void => criado', [
        style({
          opacity: 0,
          transform: 'translate(100px, 0)'
        }),
        animate('2000ms 0.1s ease-in-out', keyframes([
          style({ offset: 0.15, opacity: 1, transform: 'translateX(0)'}),
          style({ offset: 0.86, opacity: 1, transform: 'translateX(0)'}),

          style({ offset: 0.88, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.90, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.92, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.94, opacity: 1, transform: 'translateY(10px)'}),
          style({ offset: 0.96, opacity: 1, transform: 'translateY(-10px)'}),
          style({ offset: 0.98, opacity: 1, transform: 'translateY(10px)'}),

          style({ offset: 1, opacity: 1, transform: 'translateX(0)'})
        ])) // duração delay e aceleração
      ])
    ])
  ]
})
export class CadastroComponent implements DoCheck {

  public resposta: string;
  public erroPainel = 'criado';

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    nome_completo: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    nome_usuario: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngDoCheck() {
    if (this.formulario.invalid) {
      this.resposta = undefined;
    }
  }

  public exibirPainelLogin() {
    this.exibirPainel.emit('login');
  }

  public cadastrarUsuario() {

    const usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nome_completo,
      this.formulario.value.nome_usuario,
      this.formulario.value.senha,
    );
    this.authService.cadastrarUsuario(usuario)
      .then( () => {
        this.resposta = this.authService.error;
        if (!this.resposta) {
          this.exibirPainelLogin();
        }
      });
  }

  public getErrorMessage(form: FormControl) {
    return form.hasError('required') ? 'Campo obrigatório' :
        form.hasError('minlength') ? 'Tamanho mínimo de 6 caracteres' :
        form.hasError('maxlength') ? 'Tamanho máximo de 50 caracteres' :
            '';
  }

}
