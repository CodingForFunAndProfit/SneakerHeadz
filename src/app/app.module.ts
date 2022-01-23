import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './services/in-memory-data.service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SneakersComponent } from './components/sneakers/sneakers.component';
import { SneakerDetailComponent } from './components/sneaker-detail/sneaker-detail.component';
import { SneakerSearchComponent } from './components/sneaker-search/sneaker-search.component';
import { MessagesComponent } from './components/messages/messages.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    SneakersComponent,
    SneakerDetailComponent,
    MessagesComponent,
    SneakerSearchComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
