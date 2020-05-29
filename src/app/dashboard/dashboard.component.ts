import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ActivatedRoute, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {Note} from './note';
import {map} from 'rxjs/operators';
import {List} from './list';
import {HttpClient, HttpHeaders} from '@angular/common/http';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public caseid;
  public reporter;
  public case_description;
  public data;
  public show_alert = false;
  public alert_message;
  public crime_predicted;
  public is_predicted = false;
  public accuracy;
  public second_prediction;
  public second_accuracy = 0;
  public second_crime = false;
  constructor (private ActivatedRoute : ActivatedRoute, private Router: Router, private http : HttpClient) {
    
   }

  ngOnInit() {
  }

  Check_for_Alerts() {
    if(this.caseid === null || this.reporter === null || this.case_description === null) {
      return "All fields not filled";
    }
    else 
      return "OK";
  }

  SubmitReport() {
    this.alert_message = this.Check_for_Alerts();
    if(this.alert_message === "OK")  {
      this.data = {
        caseid : this.caseid,
        reporter : this.reporter,
        description : this.case_description
      } 

      console.log(this.data);
      
      this.show_alert = false;
    }
    else {
      this.show_alert = true;
      
    }
    this.GetResult();
  }


  GetResult() {
    let Url = "http://localhost:5002/";
    this.http.post<any>(Url, { "caseid" : this.caseid, 
            "reporter" : this.reporter, "desc" : this.case_description }).subscribe(c => {
      console.log(c.occur);
      if(c.occur === null) {
        this.is_predicted = false;
        alert("Something Went Wrong. Try Again");
      }
      
      this.crime_predicted = c.occur;
      this.second_prediction = null;
      this.accuracy = c[this.crime_predicted];
      console.log(this.crime_predicted + this.accuracy);
      this.is_predicted = true;
      this.accuracy  = this.accuracy * 25;
      this.second_accuracy = 100 - this.accuracy
      if(this.second_accuracy > 0) {
        this.second_crime = true;
      }
      else {
        this.second_crime = false;
      }
      if(this.accuracy === 50 || this.accuracy === 75) {
          if(c.naivebayes != this.crime_predicted) {
            this.second_prediction = c.naivebayes;
          }
          else if(c.svm != this.crime_predicted) {
            this.second_prediction = c.svm;
          }
          else if(c.sgd != this.crime_predicted) {
            this.second_prediction = c.sgd;
          }
          else if(c.logistic != this.crime_predicted) {
            this.second_prediction = c.logistic;
          }
      }
    });
  }

  ResetDetails() {
    this.show_alert = false;
    this.alert_message = null;
  }

  Logout() {
    this.Router.navigate(["/login"]);
  }

}
