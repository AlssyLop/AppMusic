import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonContent } from '@ionic/angular/standalone';
import { NgFor } from '@angular/common';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { ThemeService } from '../services/theme.service';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { NavController } from '@ionic/angular';
import { User } from '../models/user.model';
import { Music } from '../services/music';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonContent, NgFor, ScrollingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit {
  colorTitle:string = '';
  colorCard:string = '';
  colorText:string = '';
  backgroundColor:string = '';
  user:User | null = null;
  tracks:any[] = [];
  albums:any[] = [];

  constructor(
    private musicService:Music,
    private themeService:ThemeService,
    private navCtrl: NavController,
  ) { }

  async ngOnInit() {
    await this.themeService.initializeTheme();

    this.themeService.theme$.subscribe((theme) => {
      if (theme) {
        this.colorTitle = theme.colorTitle;
        this.colorCard = theme.colorCard;
        this.colorText = theme.colorText;
        this.backgroundColor = theme.backgroundColor;
      }
    });

    const theme = await this.themeService.LoadTheme();
    this.colorTitle = theme.colorTitle;
    this.colorCard = theme.colorCard;
    this.colorText = theme.colorText;
    this.backgroundColor = theme.backgroundColor;

    await this.loadTracksAndAlbums();
  }

  private async loadTracksAndAlbums(){
    this.tracks = await this.musicService.getTracks();
    this.albums = await this.musicService.getAlbums();
  }

  async loadSongsByAlbum(albumId: string){
    const songs = await this.musicService.getSongsByAlbum(albumId);
    console.log(songs);
    return songs;
  }

  goToIntro(){
    this.navCtrl.navigateRoot('menu/intro');
  }
}



