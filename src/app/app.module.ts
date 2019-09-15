import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatDialogModule,
  MatSelectModule
} from '@angular/material';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


//Components
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';


// Routes
import { APP_ROUTING } from './app.routes';
import { DialogComponent } from './components/dialog/dialog.component';
import { PanelCoordiComponent } from './components/panel-coordi/panel-coordi.component';
import { CrearPreguntaComponent } from './components/crear-pregunta/crear-pregunta.component';
import { ModPreguntaComponent } from './components/mod-pregunta/mod-pregunta.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { DelUserComponent } from './components/del-user/del-user.component';
import { AddAlumGroupComponent } from './components/add-alum-group/add-alum-group.component';
import { ListGroupUserComponent } from './components/list-group-user/list-group-user.component';
import { AddEstacionComponent } from './components/add-estacion/add-estacion.component';
import { AsignEstacionComponent } from './components/asign-estacion/asign-estacion.component';
import { DelEstacionComponent } from './components/del-estacion/del-estacion.component';
import { CambiarPassComponent } from './components/cambiar-pass/cambiar-pass.component';
import { AddExamenComponent } from './components/add-examen/add-examen.component';
import { VerExamenComponent } from './components/ver-examen/ver-examen.component';

// services

// import { AuthService } from './services/index.service.ts';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    DialogComponent,
    PanelCoordiComponent,
    CrearPreguntaComponent,
    ModPreguntaComponent,
    AddUserComponent,
    DelUserComponent,
    AddAlumGroupComponent,
    ListGroupUserComponent,
    AddEstacionComponent,
    AsignEstacionComponent,
    DelEstacionComponent,
    CambiarPassComponent,
    AddExamenComponent,
    VerExamenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDialogModule,
    MatSelectModule,
    BrowserAnimationsModule,
    RouterModule
    // RouterModule.forRoot( ROUTES, {useHash: true})

  ],
  entryComponents: [DialogComponent],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export class MaterialModule {}
