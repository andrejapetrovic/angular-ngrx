import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'editableCell'
})
export class EditableCellPipe implements PipeTransform {

  transform(rowId: number, idList: number[]): any {
    console.log(idList);
    return true;
  }

}
