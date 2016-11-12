import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { CreateComponent } from './game/create/create.component';
import { RoleComponent } from './game/role/role.component';
import { CardBaseComponent } from './shared/card-base/card-base.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { CycleComponent } from './game/cycle/cycle.component';


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
    CycleComponent
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
