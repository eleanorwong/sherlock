import { Injectable } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private showNav: boolean;
  private auth;

  constructor(private af: AngularFire, private router: Router) {
    this.af.auth.subscribe(auth => {
      this.auth = auth;
      this.showNav = (auth != null);
      if(auth == null) {
        this.router.navigate(['login']);
      } else if(this.router.url === '/login' && auth != null) {
          this.af.database.object("users/"+this.getUID()+"/activeGame/").subscribe((game) => {
              if(game.$value !== "" && game.$value !== undefined && game.$value !== null) {
                  this.router.navigate([game.$value+'/lobby']);
              } else {
                  this.router.navigate(['menu']);
              }
          })
      }
    });
  }

  public shouldShowNav() {
    return this.showNav;
  }

  public getUID() {
    return this.auth != null ? this.auth.uid : " ";
  }

  public getName() {
    return this.auth != null ? this.auth.name : "";
  }
}
