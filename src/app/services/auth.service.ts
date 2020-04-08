import { Injectable } from '@angular/core';
import Usuario from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public cadastrarUsuario(usuario: Usuario) {
    console.log('Chegamos até o serviço', usuario);
  }

}
