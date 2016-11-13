import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class GameService {
    constructor (private http: Http) {}


  startGame (gameID: string) {
      console.log(gameID)
      let url = 'http://localhost:5000/start/'+gameID;
      this.http.get(url).subscribe((res) => {
          console.log(res);
          return res;
      });
  }
}
