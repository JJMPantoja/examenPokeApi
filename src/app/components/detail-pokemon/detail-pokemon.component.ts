import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  GetPokemonsGlobal,
  Pokedex,
} from 'src/app/interfaces/general-interfaces';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrls: ['./detail-pokemon.component.scss'],
})
export class DetailPokemonComponent implements OnInit {
  pokemon!: Pokedex;
  name = '';
  constructor(
    public utilService: UtilsService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    this.name = activatedRoute.snapshot.params['name'];

    this.utilService.detailPokemon(this.name).subscribe((res: any) => {
      this.pokemon = res;
    });
  }

  ngOnInit(): void {}

  regresarList(): void {
    this.router.navigate(['inicio', 'list']);
  }
}
