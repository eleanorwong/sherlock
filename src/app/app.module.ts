import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { RoleComponent } from './game/role/role.component';
import { CardBaseComponent } from './shared/card-base/card-base.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    RoleComponent,
    CardBaseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
