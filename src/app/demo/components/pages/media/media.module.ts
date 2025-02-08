import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './media.component';
import { MediaRoutingModule } from './media-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';


@NgModule({
    imports: [
        CommonModule,
        MediaRoutingModule,
        ButtonModule,
        ImageModule,
        GalleriaModule,
        CarouselModule
    ],
    declarations: [MediaComponent]
})
export class MediaModule { }
