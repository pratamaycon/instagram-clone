import { Injectable } from '@angular/core';
import Usuario from '../models/usuario.model';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public error: string;
  public tokenId: string;

  constructor(private router: Router) { }

  public cadastrarUsuario(usuario: Usuario): Promise<any> {
    this.error = undefined;

    return firebase.auth().createUserWithEmailAndPassword(
      usuario.email, usuario.senha)
      .then( _ => {

        // remover a senha do atributo senha do obj usuário
        delete usuario.senha;

        // registrando dados complementares do usuário no path email da base64
        firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
          .set(usuario);
      })
      .catch((error: Error) => this.error = error.message ? error.message : undefined);
  }

  public autenticar(email: string, senha: string): Promise<any> {
    this.error = undefined;

    return firebase.auth().signInWithEmailAndPassword(email, senha)
    .then(( _ ) => {
      firebase.auth().currentUser.getIdToken()
        .then( (idToken: string) => {
          this.tokenId = idToken;
          localStorage.setItem('idToken', idToken);
          this.router.navigate(['/home']);
        });
    })
    .catch((error: Error) => this.error = error.message ? error.message : undefined);
  }

  public autenticado(): boolean {

    if (this.tokenId === undefined && localStorage.getItem('idToken')) {
      this.tokenId = localStorage.getItem('idToken');
    }

    if (this.tokenId === undefined) {
      this.router.navigate(['/']);
    }

    return this.tokenId !== undefined ? true : false;
  }

  public sair(): void {
    firebase.auth().signOut()
        .then( () => {
          localStorage.removeItem('idToken');
          this.tokenId = undefined;
          this.router.navigate(['/']);
        });
  }
}
