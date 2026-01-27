import { CanActivate, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

export class IntroGuard implements CanActivate{
  constructor(private storage:StorageService, private router:Router){}

  async canActivate(){
    if (await this.storage.getData('introView')){
      return true
    }
    this.router.navigateByUrl('/intro');
    return false;
  }
}
