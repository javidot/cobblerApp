import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLibraryComponent } from './modules/app-library/components/app-library/app-library.component';
import { AppBuilderComponent } from './modules/app-builder/components/app-builder/app-builder.component';

const routes: Routes = [
  {
    path: '',
    component: AppLibraryComponent,
    children: []
  },
  {
    path: 'appbuilder',
    component: AppBuilderComponent,
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
