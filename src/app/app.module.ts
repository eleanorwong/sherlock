import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { CreateComponent } from './create/create.component';
import { RoleComponent } from './role/role.component';
import { CardBaseComponent } from './shared/card-base/card-base.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
<<<<<<< HEAD
import { CycleComponent } from './game/cycle/cycle.component';
import { JoinComponent } from './game/join/join.component';
=======
import { LobbyComponent } from './lobby/lobby.component';
import { MenuComponent } from './menu/menu.component';
>>>>>>> 37558297433571dfa34cff1c42582b419e758799


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
<<<<<<< HEAD
    CycleComponent,
    JoinComponent
=======
    LobbyComponent,
    MenuComponent
>>>>>>> 37558297433571dfa34cff1c42582b419e758799
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
