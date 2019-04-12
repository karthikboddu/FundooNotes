import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../models/notes.model';

@Pipe({
  name: 'searchkey'
})
export class SearchPipe implements PipeTransform {

  transform(notes: Notes[], searchtext: any): any {
    console.log("----",notes);
    if(searchtext ==null){
      return notes;
    }
    console.log("----",notes);
    return notes.filter(function(searchkey){
      return searchkey.title.toLowerCase().indexOf(searchtext.toLowerCase()) >-1;
    })
  }

}
