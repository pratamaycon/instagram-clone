import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ProgressoService } from './progresso.service';
import Publicacao from '../models/publicacao.model';

@Injectable({
  providedIn: 'root',
})
export class GrudService {
  constructor(private progressoService: ProgressoService) {}

  public publicar(publicacao: any): void {
    firebase
      .database()
      .ref(`publicacoes/${btoa(publicacao.email)}`)
      .push({ titulo: publicacao.titulo })
      .then((resposta: any) => {
        const nomeImmagem = resposta.key;

        firebase
          .storage()
          .ref()
          .child(`imagens/${nomeImmagem}`)
          .put(publicacao.imagem)
          .on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            // acompanhamento do progresso de upload
            (snapshot: any) => {
              this.progressoService.status = 'andamento';
              this.progressoService.estado = snapshot;
            },
            (error) => {
              this.progressoService.status = 'erro';
            },
            () => {
              // finalizando progresso
              this.progressoService.status = 'concluído';
            }
          );
      });
  }

  public consularPublicacoes(emailUsuario: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // consultar as publicações em (database)
      firebase
        .database()
        .ref(`publicacoes/${btoa(emailUsuario)}`)
        .orderByKey()
        .once('value')
        .then((snapshot: any) => {
          // console.log(snapshot.val());

          const publicacoes: Array<Publicacao> = [];

          snapshot.forEach((childSnapshot: any) => {
            const publicacao: Publicacao = childSnapshot.val();

            publicacao.key = childSnapshot.key;

            publicacoes.push(publicacao);
          });
          return publicacoes.reverse();
        })

        .then((publicacoes: Array<Publicacao>) => {
          publicacoes.forEach((publicacao: Publicacao) => {
            firebase
              .storage()
              .ref()
              .child(`imagens/${publicacao.key}`)
              .getDownloadURL()
              .then((url: string) => {
                publicacao.urlImagem = url;

                // consultar nome do usuário

                firebase
                  .database()
                  .ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                  .once('value')
                  .then((snapshot: any) => {
                    publicacao.nomeUsuario = snapshot.val().nomeUsuario;
                  });
              });
          });
          resolve(publicacoes);
        });
    });
  }
}

// consultar a url das imagens em (storage)
/*  firebase.storage().ref()
          .child(`imagens/${childSnapshot.key}`)
          .getDownloadURL()
          .then( (url: string) => {
            publicacao.urlImagem = url;

            // consultar nome do usuário

            firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
              .once('value')
              .then( (snapshot: any) => {
                 publicacao.nomeUsuario = snapshot.val().nomeUsuario;

                 publicacoes.push(publicacao);

              });
          }); */
