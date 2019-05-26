import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';

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

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
