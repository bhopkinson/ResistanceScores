import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PlayerClient, LeaderboardClient, API_BASE_URL, GameClient, GraphClient, PairingClient } from './services/web-api.service.generated';
import { PlayerEditComponent } from './pages/player/player-edit/player-edit.component';
import { PlayerDetailComponent } from './pages/player/player-detail/player-detail.component';
import { PlayerListingComponent } from './pages/player/player-listing/player-listing.component';
import { PlayerCreateComponent } from './pages/player/player-edit/player-create.component';
import { PlayerComponent } from './pages/player/player.component';
import { LeaderboardComponent } from './shared/leaderboard/leaderboard.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GameComponent } from './pages/game/game.component';
import { GameEditComponent } from './pages/game/game-edit/game-edit.component';
import { GameListingComponent } from './pages/game/game-listing/game-listing.component';
import { GameDetailComponent } from './pages/game/game-detail/game-detail.component';
import { GameCreateComponent } from './pages/game/game-edit/game-create.component';
import { ButtonMultiselectComponent } from './shared/button-multiselect/button-multiselect.component';
import { ButtonMultiselectOptionComponent } from './shared/button-multiselect-option/button-multiselect-option.component';
import { DayReviewComponent } from './shared/day-review/day-review.component';
import { ButtonSelectComponent } from './shared/button-select/button-select.component';
import { ButtonSelectOptionComponent } from './shared/button-select-option/button-select-option.component';
import { PercentageGraphComponent } from './shared/percentage-graph/percentage-graph.component';
import { ChartsModule } from 'ng2-charts';
import { GraphComponent } from './graph/graph.component';
import { GraphXGridlineComponent } from './graph/graph-x-gridline.component';
import { GraphXTickComponent } from './graph/graph-x-tick.component';
import { GraphYGridlineComponent } from './graph/graph-y-gridline.component';
import { GraphYTickComponent } from './graph/graph-y-tick.component';
import { GraphDatalineComponent } from './graph/graph-dataline.component';
import { GraphXLabelComponent } from './graph/graph-x-label.component';
import { GraphYLabelComponent } from './graph/graph-y-label.component';
import { GameOverviewComponent } from './shared/game-overview/game-overview.component';
import { HomeComponent } from './pages/home/home.component';
import { StreakTableComponent } from './shared/streak-table/streak-table.component';
import { PairingsComponent } from './shared/pairings/pairings.component';
import { CssThemeComponent } from './nav/css-theme.component';

export function getBaseUrl() {
    return environment.production
      ? document.getElementsByTagName('base')[0].href
      : 'https://localhost:5001';
}

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
    GameComponent,
    GameEditComponent,
    GameListingComponent,
    GameDetailComponent,
    GameCreateComponent,
    ButtonMultiselectComponent,
    ButtonMultiselectOptionComponent,
    DayReviewComponent,
    ButtonSelectComponent,
    ButtonSelectOptionComponent,
    PercentageGraphComponent,
    GraphComponent,
    GraphXGridlineComponent,
    GraphYGridlineComponent,
    GraphDatalineComponent,
    GraphXTickComponent,
    GraphYTickComponent,
    GraphXLabelComponent,
    GraphYLabelComponent,
    GameOverviewComponent,
    HomeComponent,
    StreakTableComponent,
    PairingsComponent,
    CssThemeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ChartsModule
  ],
  providers: [
    { provide: API_BASE_URL, useFactory: getBaseUrl },
    PlayerClient,
    LeaderboardClient,
    GameClient,
    GraphClient,
    PairingClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
