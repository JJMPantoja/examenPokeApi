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
  limit = '';
  searchPoke = '';

  constructor(public utilService: UtilsService, public router: Router) {
    this.changeItemsPerPage('5');
  }

  ngOnInit(): void {}

  changeItemsPerPage(itemsPerPageControl: string) {
    this.arrPokemons = [];
    this.utilService.getPokemons(itemsPerPageControl).subscribe((res) => {
      this.responseGetPokemons = res;
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

  public redirectDetails(pokemon: string): void {
    this.router.navigate(['inicio', 'detail', pokemon]);
  }

  public searchRange(): void {
    this.arrPokemons = [];
    if (Number(this.limit) <= 200) {
      setTimeout(() => {
        this.changeItemsPerPage(this.limit);
      }, 3000);
    } else {
      this.utilService.showMessages(
        this.messages.invalidRange,
        this.messages.rangeInvalidMessage,
        false,
        true,
        'error'
      );
    }
  }
  public searchPokemonByName(): void {
    console.log(this.searchPoke);
    this.arrPokemons = [];
    this.utilService.searchPokemon(this.searchPoke).subscribe((res: any) => {
      this.arrPokemons.push(res);
    });
  }
}
