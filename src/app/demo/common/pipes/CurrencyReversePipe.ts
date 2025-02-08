import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyReverse'
})
export class CurrencyReversePipe implements PipeTransform {
  transform(value: number, currencySymbol: string = '₫'): string {
    if (typeof value !== 'number') {
      return value;
    }

    const formattedValue = value.toLocaleString();
    return `${formattedValue} ${currencySymbol}`;
  }
}