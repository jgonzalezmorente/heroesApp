import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { canActivateAuth, canMatchAuth } from './auth/guards/auth.guard';
import { canActivatePublic, canMatchPublic } from './auth/guards/public.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import( './auth/auth.module' ).then( m => m.AuthModule ),
    canActivate: [ canActivatePublic ],
    canMatch: [ canMatchPublic ]
  },
  {
    path: 'heroes',
    loadChildren: () => import( './heroes/heroes.module' ).then( m => m.HeroesModule ),
    canActivate: [ canActivateAuth ],
    canMatch: [ canMatchAuth ]
  },
  {
    path: '404',
    component: Error404PageComponent
  },
  {
    path: '',
    redirectTo: 'heroes',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '404',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
