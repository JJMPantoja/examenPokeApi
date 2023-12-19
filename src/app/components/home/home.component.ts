import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { Mensajes } from 'src/assets/common/messages';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public messages: Mensajes = new Mensajes();

  constructor(public utilService: UtilsService) {}

  ngOnInit(): void {}

  logout() {
    this.utilService.logOut();
  }
}
