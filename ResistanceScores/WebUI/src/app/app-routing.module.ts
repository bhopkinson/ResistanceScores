import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AllTimeLeaderboardComponent } from './pages/leaderboard/all-time-leaderboard/all-time-leaderboard.component';
import { GameComponent } from './pages/game/game.component';
import { GameEditComponent } from './pages/game/game-edit/game-edit.component';
import { GameListingComponent } from './pages/game/game-listing/game-listing.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCreateComponent } from './pages/game/game-edit/game-create.component';

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
    component: LeaderboardComponent,
    children: [
      { path: '', component: AllTimeLeaderboardComponent },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
