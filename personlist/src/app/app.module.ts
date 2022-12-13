import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SinglePersonComponent } from './pages/singlePerson/singlePerson.component';
import { UpdatePersonComponent } from './pages/updatePerson/updatePerson.component';
import { AddPersonComponent } from './pages/addPerson/addPerson.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PersonComponent } from './components/personComponent/person.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SinglePersonComponent,
    UpdatePersonComponent,
    AddPersonComponent,
    NavigationComponent,
    PersonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
