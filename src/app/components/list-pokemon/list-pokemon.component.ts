import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  GetPokemonsGlobal,
  ItemsArr,
  Pokedex,
} from 'src/app/interfaces/general-interfaces';
import { UtilsService } from 'src/app/services/utils.service';
import { Mensajes } from 'src/assets/common/messages';

@Component({
  selector: 'app-list-pokemon',
  templateUrl: './list-pokemon.component.html',
  styleUrls: ['./list-pokemon.component.scss'],
})
export class ListPokemonComponent implements OnInit {
  public messages: Mensajes = new Mensajes();

  tableCloumns = ['Id', 'Icono', 'nombre', 'especie', 'habilidad'];
  itemPerPage = ['10', '20', '50', '100'];
  itemsPerPageControl = '5';
  arrPokemons: Pokedex[] = [];
  responseGetPokemons!: GetPokemonsGlobal;

  constructor(public utilService: UtilsService, public router: Router) {
    this.changeItemsPerPage('5');
  }

  ngOnInit(): void {}

  changeItemsPerPage(itemsPerPageControl: string) {
    this.utilService.getPokemons(itemsPerPageControl).subscribe((res) => {
      this.responseGetPokemons = res;
      console.log(this.responseGetPokemons);
      for (
        let index = 0;
        index < this.responseGetPokemons.results.length;
        index++
      ) {
        const element = this.responseGetPokemons.results[index];
        this.utilService.pokemonOneByOne(element).subscribe((res: any) => {
          this.arrPokemons.push(res);
        });
      }
    });
  }

  redirectDetails(pokemon: string): void {
    this.router.navigate(['inicio', 'detail', pokemon]);
  }
}
