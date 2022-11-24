import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './features/toolbar/toolbar.component';
import { WeatherComponent } from './features/weather/weather.component';
import { IconButtonComponent } from './components/icon-button/icon-button.component';
import { FavoritesComponent } from './features/favorites/favorites.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TemperatureConverterPipe } from './utils/temperature-converter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    WeatherComponent,
    IconButtonComponent,
    FavoritesComponent,
    TemperatureConverterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
