import { AuthService } from './shared/services/auth.service';
import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, NavigationEnd } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      type: 'link',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Vendors',
      type: 'link',
      url: '/my-vendors',
      icon: 'briefcase'
    },
    {
      title: 'New Purchase',
      type: 'link',
      url: '/purchase-vendor-list',
      icon: 'briefcase'
    },
    {
      title: 'Purchase History',
      type: 'link',
      url: '/purchase-list',
      icon: 'briefcase'
    },
    {
      title: 'Logout',
      type: 'func',
      function:'logout',
      icon: 'log-in'
    }
  ];
  userState=false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private auth: AuthService,
    private router: Router, 
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.auth.authenticationState.subscribe(state => {
        this.userState= state;
        if (state) {
          this.menuCtrl.enable(true);
        } else {
          this.menuCtrl.enable(false);
        }
          this.tokenCheck();
      });

      
    this.router.events.subscribe(response => {
      if(response instanceof NavigationEnd) {
        this.tokenCheck();
      }
    });
    });
  }

  tokenCheck() {
      let token = localStorage.getItem('sha_token');
      if(token == null){     
          this.router.navigate(['/login'])
      }else {
        const helper = new JwtHelperService();          
        const isExpired = helper.isTokenExpired(token);
        if(isExpired){
          localStorage.removeItem('sha_token')
          this.router.navigate(['/login'])
        }else {
          if(this.router.url == "/" || this.router.url == "/login") {
            this.router.navigate(['/home'])
          }
        }
      }
}

  functionHandler(val) {
    if(val == 'logout'){
      this.logout();
    }
  }

  logout() {
    this.auth.logout();
  }
}
