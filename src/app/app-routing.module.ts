import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';
import { LaunchFormComponent } from '@app/launch-form/launch-form.component';
const routes: Routes = [
  {
    path: 'create-form',
    component: BuilderComponent
  },
  {
    path: 'form',
    component: LaunchFormComponent
  }
  // {
  //   path: 'form/:id/:id',
  //   component: LaunchFormComponent
  // }
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  // },
  // {
  //   path: 'event',
  //   loadChildren: () => import('./event/event.module').then(m => m.EventModule)
  // },
  // {
  //   path: 'launch-form/:id/:id',
  //   loadChildren: () => import('./launch-form/launch-form.module').then(m => m.LaunchFormModule)
  // },
  // {
  //   path: 'create-form',
  //   loadChildren: () => import('./builder/builder.module').then(m => m.BuilderModule)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
