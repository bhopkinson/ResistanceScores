import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AllTimeLeaderboardComponent } from './pages/leaderboard/all-time-leaderboard/all-time-leaderboard.component';

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
    path: 'leaderboard',
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
