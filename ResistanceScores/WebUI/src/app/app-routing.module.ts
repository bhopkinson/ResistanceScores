import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';
import { GameComponent } from './pages/game/game.component';
import { GameEditComponent } from './pages/game/game-edit/game-edit.component';
import { GameListingComponent } from './pages/game/game-listing/game-listing.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCreateComponent } from './pages/game/game-edit/game-create.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'players',
    component: PlayerComponent,
    children: [
      { path: '', component: PlayerListingComponent },
      { path: 'create', component: PlayerCreateComponent },
      { path: 'edit/:id', component: PlayerEditComponent },
      { path: 'detail/:id', component: PlayerDetailComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: 'games',
    component: GameComponent,
    children: [
      { path: '', component: GameListingComponent },
      { path: 'create', component: GameCreateComponent },
      { path: 'edit/:id', component: GameEditComponent },
      { path: 'detail/:id', component: GameDetailComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },
  {
    path: '',
    component: HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
