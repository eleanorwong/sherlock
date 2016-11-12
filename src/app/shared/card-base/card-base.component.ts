import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.scss']
})
export class CardBaseComponent implements OnInit {
  isRoleCard = true;

  constructor() { }

  ngOnInit() {
  }

}
