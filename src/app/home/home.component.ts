import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  @ViewChild('publicacoes', { static: false}) public publicacoes: any;

  ngOnInit() {
  }

  public sair(): void {
    this.authService.sair();
  }

  public atualizarTimeLine() {
    this.publicacoes.atualizarTimeLine();
  }

}
