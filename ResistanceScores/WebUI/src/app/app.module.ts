import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PlayerClient, LeaderboardClient } from './services/web-api.service.generated';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';
import { LeaderboardComponent } from './pages/leaderboard/leaderboard.component';
import { AllTimeLeaderboardComponent } from './pages/leaderboard/all-time-leaderboard/all-time-leaderboard.component';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    PlayerListingComponent,
    PlayerEditComponent,
    PlayerDetailComponent,
    PlayerCreateComponent,
    PlayerComponent,
    LeaderboardComponent,
    AllTimeLeaderboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PlayerClient, LeaderboardClient],
  bootstrap: [AppComponent]
})
export class AppModule { }