import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {
  transform(value: string, word: string): string {
    if (!value || !word) {
      return value;
    }
    const regex = new RegExp(`(${word})`, 'gi');
    return value.replace(regex, '<strong>$1</strong>');
  }
}
