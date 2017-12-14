import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  transform(value, filter) {
    if(!filter)
      return value;
    
    filter = filter.toLocaleLowerCase();
    return filter ? value.filter(data => data.name.toLocaleLowerCase().indexOf(filter) != -1) : value;
  }
}
