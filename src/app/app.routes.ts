import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
// import {SearchComponent} from './components/search/search.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', pathMatch: 'full', redirectTo: 'login'}

];

export const APP_ROUTING = RouterModule.forRoot(ROUTES);
