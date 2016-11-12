import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cycle',
  templateUrl: './cycle.component.html',
  styleUrls: ['./cycle.component.scss']
})

export class CycleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
    });
  }

}
