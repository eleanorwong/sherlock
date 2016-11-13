import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { CreateComponent } from './create/create.component';
import { RoleComponent } from './role/role.component';
import { CardBaseComponent } from './shared/card-base/card-base.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { VoteComponent } from './game/actions/vote/vote.component';
import { TargetComponent } from './game/actions/target/target.component';
import { JoinComponent } from './join/join.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MenuComponent } from './menu/menu.component';

import { AuthService } from './services/auth.service';
import { BadgeComponent } from './badge/badge.component';


var firebaseConfig = {
  apiKey: "AIzaSyDzV4LHW-Z177LuCopYh7Vsd65AShwU3F8",
  authDomain: "sherlock-3c9fd.firebaseapp.com",
  databaseURL: "https://sherlock-3c9fd.firebaseio.com",
  storageBucket: "sherlock-3c9fd.appspot.com",
  messagingSenderId: "578690943646"
};

const myFirebaseAuthConfig = {
  provider: AuthProviders.Facebook,
  method: AuthMethods.Popup
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    CreateComponent,
    RoleComponent,
    CardBaseComponent,
    VoteComponent,
    TargetComponent,
    JoinComponent,
    LobbyComponent,
    MenuComponent,
    BadgeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
