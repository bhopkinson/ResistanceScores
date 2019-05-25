import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListingComponent } from './pages/player-listing/player-listing.component';

const routes: Routes = [
  { path: 'player', component: PlayerListingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
