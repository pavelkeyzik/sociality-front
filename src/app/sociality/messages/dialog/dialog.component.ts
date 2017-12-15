import { Component, ViewChild } from '@angular/core';
import { ViewImageComponent } from './view-image/view-image.component';

 @Component({
   selector: 'app-dialog',
   templateUrl: './dialog.component.html',
   styleUrls: ['./dialog.component.less']
 })
 export class DialogComponent {
   @ViewChild(ViewImageComponent) viewImage;

   showImage(url: string) {
     this.viewImage.show(url);
   }
 }
