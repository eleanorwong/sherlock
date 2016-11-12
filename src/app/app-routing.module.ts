import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { CreateComponent } from './game/create/create.component';
import { RoleComponent }      from './game/role/role.component';
import { CycleComponent } from './game/cycle/cycle.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login',  component: LoginComponent },
    { path: 'create', component: CreateComponent },
    { path: 'role', component: RoleComponent },
    { path: 'game/:id', component: GameComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
