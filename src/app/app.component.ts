import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {register} from 'swiper/element/bundle';
import { StorageService } from './services/storage.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private storage: StorageService, private router: Router, private themeService: ThemeService) {
    document.addEventListener('ionPause', async () => {
      await this.handleAppPause();
    });
  }
  async ngOnInit() {
    await this.themeService.initializeTheme();

    console.log('App is going to background, logging out user.');
    await this.handleAppPause();
    
  }
  private async handleAppPause() {
    await this.storage.setData('login', false);
    this.router.navigateByUrl('/login');
  }
}
