import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BorrowReturnComponent } from './borrow-return.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BorrowReturnComponent }
    ])],
    exports: [RouterModule]
})
export class BorrowReturnRoutingModule { }
