import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { from } from 'rxjs';
import { SignupComponent } from './signup/signup.component'
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
const routes: Routes = [ 
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path : 'signup' , component : SignupComponent },
  { path : 'dashboard' , component : DashboardComponent},
  { path : 'login', component : LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
