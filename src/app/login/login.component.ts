import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {User} from './user';
import {map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  public uid = null;
  public password = null;
  public confirm = null;
  public showlogin = true;
  public fireusers : AngularFireList<User>;
  public users : any;
  public navigate_to_dashboard = false;
  public show_alert = false;
  public alert_message;
  ngOnInit() {
  }

  constructor (private ActivatedRoute : ActivatedRoute, private Router: Router
    , private db: AngularFireDatabase, private httpClient : HttpClient
    ) {//private db : AngularFireDatabase) {
    //this.db.list('/').snapshotChanges().subscribe(actions => {
    //  console.log(actions);
    //});
    this.fireusers = db.list('/users');
    this.fireusers.snapshotChanges().pipe(
      map( changes =>
        changes.map( c =>
          ({key : c.payload.key, ...c.payload.val() })  
        )
      )
    ).subscribe(u => {
      this.users = u;
      console.log(this.users);
    });  
  }

  checkForAlerts() {
    if(this.uid === null || this.password === null || this.confirm === null) {
      this.show_alert = true;
      this.alert_message = "Enter all Fields"
      return true;
    }
    if(this.password !== this.confirm) {
      this.show_alert = true;
      this.alert_message = "Passwords do not match"
      return true;
    }
    else {
      return false;
    }
  }

  clickonLogin() {
    //this.Router.navigate(["/dashboard"]);

    this.show_alert = false;
    var result = this.checkForAlerts();
    if(result === false) {
      
      this.password = btoa(this.password + this.uid);
      this.users.forEach(c => {
          
          if(c.uid === this.uid && this.password === c.password) {
            this.Router.navigate(["/dashboard"]);
          }
      });
      this.show_alert = true;
      this.alert_message = "Invalid Credentials"      
    }

  }
  clickonSignup() {
    this.showlogin = false;
    this.Router.navigate(["/signup"]);
  }
 
  ResetDetails() {
    this.uid = null;
    this.password = null;
    this.confirm = null;
    this.show_alert = false;
    this.alert_message = null;
  }

}
