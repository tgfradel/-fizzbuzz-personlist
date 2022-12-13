import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './pages/addPerson/addPerson.component';
import { HomeComponent } from './pages/home/home.component';
import { SinglePersonComponent } from './pages/singlePerson/singlePerson.component';
import { UpdatePersonComponent } from './pages/updatePerson/updatePerson.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Personlist',
  },
  {
    path: 'single-person/:personId',
    component: SinglePersonComponent,
    title: 'Single person',
  },
  {
    path: 'update-person/:personId',
    component: UpdatePersonComponent,
    title: 'Edit person',
  },
  {
    path: 'add-person',
    component: AddPersonComponent,
    title: 'Add new person',
  },
  {
    path: '**',
    component: HomeComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
