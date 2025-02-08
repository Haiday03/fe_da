import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WishComponent } from './wish.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: WishComponent }
	])],
	exports: [RouterModule]
})
export class WishRoutingModule { }
