import { Component } from '@angular/core';

@Component({
  selector: 'app-view-image',
  templateUrl: './view-image.component.html',
  styleUrls: ['./view-image.component.less']
})
export class ViewImageComponent {
  private showWindow: boolean = false;
  private imageLink: string = '';

  show(id: string) {
    this.showWindow = true;
    this.imageLink = 'http://localhost:5000/images?id=' + id;
  }

  close() {
    this.showWindow = false;
    this.imageLink = '';
  }
}
