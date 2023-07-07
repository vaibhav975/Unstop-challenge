import { Component, ViewChild } from '@angular/core';
import { CoachComponent } from './coach/coach.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'unstop-challenge';


  @ViewChild(CoachComponent)
  CoachComponent!: { seats: any; message: string};

  constructor(private http: HttpClient) {   
  }

}

