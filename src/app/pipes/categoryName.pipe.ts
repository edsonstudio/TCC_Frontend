import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'categoryclass'
})
export class CategoryNamePipe implements PipeTransform {
    transform(name: string){
        return name.normalize('NFD').toLowerCase().replace(' ', '-');
    }
}
