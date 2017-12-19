import { Component } from '@angular/core';
import { TopBarService } from '../../shared/services/top-bar.service';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html'
})
export class MusicComponent {

  constructor(private topBar: TopBarService) {
    topBar.setViewNavBar(true);
    this.topBar.setTextNavBar('Music');
  }

  musics = [
    {
      'name': 'Jekk - Survive',
      'url': 'assets/music/JekK_-_Survive.mp3',
      'type': 'mpeg'
    },
    {
      'name': 'Keith Heimericks - Unite As One',
      'url': 'assets/music/Keith_Heimericks_-_Unite_As_One.mp3',
      'type': 'mpeg'
    },
    {
      'name': 'Melanie Ungar - Crazy Glue',
      'url': 'assets/music/Melanie_Ungar_-_Crazy_Glue.mp3',
      'type': 'mpeg'
    }
  ];

  currentMusic = this.musics[0];
}
