import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCard, MatCardModule} from "@angular/material/card";
import { ShowCharacterComponent } from './show-character/show-character.component';
import {MatListModule} from "@angular/material/list";
import { MatGridListModule} from "@angular/material/grid-list";
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { CharacterOverviewComponent } from './show-character/character-overview/character-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowCharacterComponent,
    CharacterOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
