import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './user';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public uid = null;
  public password = null;
  public confirm = null;
  public admintoken;
  public adminpassword;
  public adminLogin = true;
  public newEntry = false;
  public show_alert = false;
  public alert_message;
  public fireusers : AngularFireList<User>;
  public users : any;
  constructor (private ActivatedRoute : ActivatedRoute, private Router: Router
    , private db: AngularFireDatabase) {
      this.fireusers = db.list('/users');
      
      console.log(this.fireusers);
      this.users = this.fireusers.snapshotChanges().pipe(
        map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()}))
        )
      );
      console.log(this.users);
      
      
      
  }




  ngOnInit() {
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

  Register() {
    this.show_alert = false;
    let data;
    let result = this.checkForAlerts();

    if(result === false) {
      let creds : string;
      creds = btoa(this.password + this.uid);
      data = {
        "uid" : this.uid,
        "password" : creds
      }

      //console.log(data);
      this.fireusers.push(data);
      console.log(data);
      this.Router.navigate(["/login"]);

    }
    this.Router.navigate(["/login"]);
  }

  clickAdminLogin() {
    if(this.admintoken === "btech" && this.adminpassword === "project") {
      this.adminLogin = false;
      this.newEntry = true;
    }
    else {
      this.show_alert = true;
      this.alert_message = "Unauthorized Access"
    }
  }

  toLogin() {
    this.Router.navigate(["/login"]);
  }

}
