import { Pipe, PipeTransform } from '@angular/core';
import { Pokedex } from '../interfaces/general-interfaces';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(items: Pokedex[], filtro: string): any[] {
    if (!items || !filtro) {
      return items;
    }

    filtro = filtro.toLowerCase();

    if (filtro) {
      return items.filter((item) => {
        for (const key in item) {
          if (
            item.hasOwnProperty(key) &&
            item.name.toString().toLowerCase().includes(filtro)
          ) {
            return true;
          }
        }
        return false;
      });
    } else {
      return items;
    }
  }
}
