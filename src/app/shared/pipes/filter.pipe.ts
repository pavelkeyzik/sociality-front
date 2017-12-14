import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(value, filter, by) {
    if(!filter)
      return value;

    filter = filter.toLocaleLowerCase();
    return filter ? value.filter(data => {
      if(data[by] && data[by].toLocaleLowerCase().indexOf(filter) != -1) return 1;
    }) : value;
  }
}
