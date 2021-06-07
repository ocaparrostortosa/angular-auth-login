import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';

//FIREBASE Imports.
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
////FIREBASE Services
import {FirebaseUserService} from 'src/app/services/firebase/firebase-user.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//MATERIAL-UI Imports
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    BrowserModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    //Material-ui
    MatButtonModule
  ],
  providers: [FirebaseUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
