import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLibraryComponent } from './modules/app-library/components/app-library/app-library.component';


const routes: Routes = [
  {
    path: '',
    component: AppLibraryComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
