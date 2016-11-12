import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { JoinComponent } from './join/join.component';
import { CreateComponent } from './create/create.component';
import { RoleComponent } from './role/role.component';
import { LobbyComponent } from './lobby/lobby.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: ':id/lobby',  component: LobbyComponent },
    { path: 'create', component: CreateComponent },
    { path: 'join', component: JoinComponent },
    { path: 'role', component: RoleComponent },
    { path: 'menu', component: MenuComponent},
    { path: ':id/game', component: GameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
