import { Component } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Police-Report-Classifier';
  constructor (private ActivatedRoute : ActivatedRoute, private Router: Router, private httpClient: HttpClient) {//private db : AngularFireDatabase) {
    //this.db.list('/').snapshotChanges().subscribe(actions => {
    //  console.log(actions);
    //});
    this.Router.navigate(["/dashboard"]);
  }
  
  
}
