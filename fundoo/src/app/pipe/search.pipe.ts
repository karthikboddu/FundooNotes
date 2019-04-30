import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../models/notes.model';

@Pipe({
  name: 'searchkey'
})
export class SearchPipe implements PipeTransform {

  transform(notes: Notes [] , search?:string):Notes [] {
debugger
    console.log('cdsfdsfu',notes);
    if(!notes||!search)
    {
    return notes;

  }


   return notes.filter(notes =>notes.title.indexOf(search) !==-1 || notes.desc.indexOf(search)!==-1);
   console.log('hhhhhhhh',notes);
  }

}
