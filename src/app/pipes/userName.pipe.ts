import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'username'
})

export class UserNamePipe implements PipeTransform {
    transform(text: string){
       return text.split('@')[0];
    }
}
