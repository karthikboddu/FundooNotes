import { Pipe, PipeTransform } from '@angular/core';
import { Notes } from '../models/notes.model';

@Pipe({
  name: 'searchkey'
})
export class SearchPipe implements PipeTransform {

  num;
  transform(notes: Notes[], serchingTerm?: string): Notes[] {
  debugger;
  console.log("hiiiii",notes);
  if (!notes || !serchingTerm) {
  return notes;
  }
  console.log("hiiiiisea",notes);
  return notes.filter(notes =>
  notes.title.indexOf(serchingTerm)!==-1 || notes.description.indexOf(serchingTerm)!==-1 );
  
  }
  
}