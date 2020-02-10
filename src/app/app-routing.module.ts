import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppHome }        from './app.home';
import { AppAbout }        from './app.about';
import { AppComponent }           from './app.component';



const routes: Routes = [
  { path: 'home', component: AppHome },
  { path: 'about', component: AppAbout},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
