import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireDatabase } from 'angularfire2/database';
// for AngularFireAuth
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuth } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


export const firebaseConfig = {
   apiKey: "AIzaSyBp5au36IPqfgaWSkHICpiw-WMUdewYlKU",
   authDomain: "police-report-classification.firebaseapp.com",
   databaseURL: "https://police-report-classification.firebaseio.com",
   projectId: "police-report-classification",
   storageBucket: "police-report-classification.appspot.com",
   messagingSenderId: "526411888891",
   appId: "1:526411888891:web:06e7612756c224bbca585e",
   measurementId: "G-3QNY55NSX1"
 }

@NgModule({
   declarations: [
      AppComponent,
      SignupComponent,
      DashboardComponent,
      LoginComponent
      
     
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      HttpClientModule,
      AngularFireDatabaseModule,
      AngularFireModule.initializeApp(firebaseConfig)
     
      
      

   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
