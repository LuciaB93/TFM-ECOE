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
    CrearPreguntaComponent
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
