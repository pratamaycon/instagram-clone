import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { style, animate, keyframes, transition, state, trigger } from '@angular/animations';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
export class LoginComponent implements OnInit {

  public resposta: string;
  public erroPainel = 'criado';

  @Output() public exibirPainel: EventEmitter<string> = new EventEmitter<string>();

  public formulario: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required]),
    senha: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  public exibirPainelCadastro() {
    this.exibirPainel.emit('cadastro');
  }

  public autenticar() {
    this.authService.autenticar(
      this.formulario.value.email,
      this.formulario.value.senha,
    )
    .then(
      ( _ ) => {
        this.resposta = this.authService.error;
      }
    );
  }

  public getErrorMessage(form: FormControl) {
    return form.hasError('required') ? 'Campo obrigatório' :
        form.hasError('minlength') ? 'Tamanho mínimo de 6 caracteres' :
        form.hasError('maxlength') ? 'Tamanho máximo de 50 caracteres' :
            '';
  }

}
