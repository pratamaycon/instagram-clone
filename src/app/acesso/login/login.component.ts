import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public resposta: string;

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
