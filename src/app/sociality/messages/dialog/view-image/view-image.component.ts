import { Component } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.less']
})
export class ViewImageComponent {
  private showWindow: boolean = false;
  private imageLink: string = '';
  private rotateDeg: number = 1;

  show(id: string) {
    this.showWindow = true;
    this.imageLink = 'http://localhost:5000/images?id=' + id;
  }

  close() {
    this.showWindow = false;
    this.imageLink = '';
    this.rotateDeg = 1;
  }

  rightRotate() {
    if(this.rotateDeg + 1 > 4)
      this.rotateDeg = 1;
    else
      this.rotateDeg++;
  }

  leftRotate() {
    if(this.rotateDeg - 1 < 1)
      this.rotateDeg = 4;
    else
      this.rotateDeg--;
  }
}
