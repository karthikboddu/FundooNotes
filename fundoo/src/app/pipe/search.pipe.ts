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
  console.log('hhhhhhhh',notes);
  debugger
   return notes.filter(notes =>notes.title.indexOf(search.toLowerCase()) !==-1 || notes.desc.indexOf(search.toLowerCase())!==-1);
  }

}
