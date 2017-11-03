import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flatternTag'
})
export class FlatternTagPipe implements PipeTransform {

  transform(value: string[], args?: any): any {
    return value.join(', ');
  }

}
