import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BorrowedHistoryComponent } from './borrowed-history.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: BorrowedHistoryComponent }
    ])],
    exports: [RouterModule]
})
export class BorrowedHistoryRoutingModule { }
