import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
// import {SearchComponent} from './components/search/search.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {PanelCoordiComponent} from './components/panel-coordi/panel-coordi.component';
import {CrearPreguntaComponent} from './components/crear-pregunta/crear-pregunta.component';

export const ROUTES: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // {path: 'crear-pregunta', component: CrearPreguntaComponent},
  { path: 'panel-coordi' , component: PanelCoordiComponent, children: [
      //{path: '', redirectTo: 'crear-pregunta', pathMatch: 'full'},
      {path: 'crear-pregunta', component: CrearPreguntaComponent},
  ]},
  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  //{ path: '**', pathMatch: 'full', redirectTo: 'login'}

];


export const APP_ROUTING = RouterModule.forRoot(ROUTES);
