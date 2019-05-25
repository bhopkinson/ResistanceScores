import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PlayerListingComponent } from './pages/player-listing/player-listing.component';
import { PlayerClient } from './services/web-api.service.generated';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    PlayerListingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PlayerClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
