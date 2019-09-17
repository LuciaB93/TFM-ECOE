import { Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
// import {SearchComponent} from './components/search/search.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {PanelCoordiComponent} from './components/panel-coordi/panel-coordi.component';
import {CrearPreguntaComponent} from './components/crear-pregunta/crear-pregunta.component';
import {PanelProfeComponent} from './components/panel-profe/panel-profe.component';
import {PanelAlumnoComponent} from './components/panel-alumno/panel-alumno.component';
import {PanelActorComponent} from './components/panel-actor/panel-actor.component';
import {EvaluarExamenComponent} from './components/evaluar-examen/evaluar-examen.component';
import {EvaluacionAlumnoComponent} from './components/evaluacion-alumno/evaluacion-alumno.component';

export const ROUTES: Routes = [
  { path: 'addExamen', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  // {path: 'crear-pregunta', component: CrearPreguntaComponent},
  { path: 'panel-coordi' , component: PanelCoordiComponent, children: [
      {path: 'crear-pregunta', component: CrearPreguntaComponent},
  ]},
  { path: 'panel-profe' , component: PanelProfeComponent},
  { path: 'panel-actor' , component: PanelActorComponent},
  { path: 'panel-alumno' , component: PanelAlumnoComponent},
  { path: 'evaluar-examen' , component: EvaluarExamenComponent},
  { path: 'evaluacion-alumno' , component: EvaluacionAlumnoComponent},

  // { path: '', pathMatch: 'full', redirectTo: 'home'},
  //{ path: '**', pathMatch: 'full', redirectTo: 'login'}

];


export const APP_ROUTING = RouterModule.forRoot(ROUTES);
