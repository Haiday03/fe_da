import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorComponent } from './author.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AuthorComponent }
	])],
	exports: [RouterModule]
})
export class AuthorRoutingModule { }
