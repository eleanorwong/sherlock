import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private picture: String;
  private name: String;

  constructor(private af: AngularFire) { 
    
  }

  ngOnInit() {

  }

}
