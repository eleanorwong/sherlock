import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams } from '@angular/http';

@Injectable()
export class GameService {
  constructor(private jsonp: Jsonp) {}

  startGame (gameID: string) {
      console.log(gameID)
      let url = 'http://localhost:5000/start/'+gameID;

    // TODO: Add error handling
    return this.jsonp
               .post(url, { })
               .map(response => <string[]> response.json()[1]);
  }
}
