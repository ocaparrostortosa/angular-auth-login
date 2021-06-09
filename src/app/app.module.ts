import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { RegisterPageComponent } from './components/register-page/register-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//FIREBASE Imports.
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from 'src/environments/environment';
////FIREBASE Services
import {FirebaseUserService} from 'src/app/services/firebase/firebase-user.service';

//MATERIAL-UI Imports
////Can use *, but i prefer this way to dont load all the imports
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';

//Reactive Forms Module
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorBottomSheetComponent } from './components/error-bottom-sheet/error-bottom-sheet.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    ErrorBottomSheetComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    //Reactive Forms
    ReactiveFormsModule,
    //Firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,    
    //Material-ui
    MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule, MatCardModule, MatBottomSheetModule
  ],
  providers: [FirebaseUserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
