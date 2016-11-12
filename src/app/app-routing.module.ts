import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './login/login.component';
import { GameComponent }      from './game/game.component';
import { RoleComponent }      from './game/role/role.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'game', component: GameComponent,
    children: [
        { path: '' },
        { path: 'role', component: RoleComponent }
    ]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
