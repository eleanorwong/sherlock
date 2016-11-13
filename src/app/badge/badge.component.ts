import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  private users;
  private user;
  
  constructor(private af: AngularFire, private authService: AuthService) { 
    this.user = {picture: ""};
    this.users = this.af.database.object('/users/' + this.authService.getUID()).subscribe(item => {
      this.user = item;
    });
  }

  ngOnInit() {
  }

}
