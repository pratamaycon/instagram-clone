import { Injectable } from '@angular/core';
import Usuario from '../models/usuario.model';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error = '';
  public tokenId: string;

  constructor() { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {

    return firebase.auth().createUserWithEmailAndPassword(
      usuario.email, usuario.senha)
      .then( _ => {

        // remover a senha do atributo senha do obj usuário
        delete usuario.senha;

        // registrando dados complementares do usuário no path email da base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((error: Error) => this.error = error.message);
  }

  public autenticar(email: string, senha: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, senha)
    .then((resposta: any) => {
      firebase.auth().currentUser.getIdToken()
        .then( (idToken: string) => {
          this.tokenId = idToken;
          console.log(this.tokenId);
        });
    })
    .catch((error: Error) => this.error = error.message);
  }
}
