import { ProgressoService } from './../../services/progresso.service';
import { Component, OnInit, Output } from '@angular/core';
import { GrudService } from 'src/app/services/grud.service';
import { FormGroup, FormControl } from '@angular/forms';
import * as firebase from 'firebase';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.scss'],
})
export class IncluirPublicacaoComponent implements OnInit {


  public email: string;
  private imagem: any;
  public progressoUpload = 'pendente';
  public porcentagemUpload: number;

  // tslint:disable-next-line:no-output-native
  @Output() atualizarTimeLine: EventEmitter<any> = new EventEmitter();

  constructor(
    private grudService: GrudService,
    private progressoService: ProgressoService
  ) {}

  public formulario: FormGroup = new FormGroup({
    titulo: new FormControl(null),
  });

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }

  public publicar(): void {
    this.grudService.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0],
    });

    const acompanhaUpload = interval(1500);

    const continua = new Subject();
    continua.next(true);

    acompanhaUpload.pipe(takeUntil(continua)).subscribe(() => {
      console.log(this.progressoService.status);
      console.log(this.progressoService.estado);

      this.progressoUpload = 'andamento';
      this.porcentagemUpload = Math.round(( this.progressoService.estado.bytesTransferred /
        this.progressoService.estado.totalBytes ) * 100);

      if (this.progressoService.status === 'concluído') {
        this.progressoUpload = 'concluído';
        //  emitir um evento do component parent (home)
        this.atualizarTimeLine.emit();
        continua.next(false);
      }
    });
  }

  public preparaImagemUpload(event: Event): void {
    this.imagem = (event.target as HTMLInputElement).files;
  }
}
