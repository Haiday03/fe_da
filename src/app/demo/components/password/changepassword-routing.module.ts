import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { changepasswordComponent } from './changepassword.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: changepasswordComponent }
    ])],
    exports: [RouterModule]
})
export class changepasswordRoutingModule { }
