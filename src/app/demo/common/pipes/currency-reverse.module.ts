import { NgModule } from "@angular/core";
import { CurrencyReversePipe } from "./CurrencyReversePipe";


@NgModule({
 declarations: [ CurrencyReversePipe ],
 exports: [ CurrencyReversePipe ]
})
export class CurrencyReverseModule { }