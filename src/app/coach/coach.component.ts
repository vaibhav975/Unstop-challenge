import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  seats: number[][] = [];
  n: number = 0;
  message: string = '';


  constructor(private http: HttpClient) {
    this.getSeatStatus();
  }

  bookSeats() {
  if(this.n>7){
    this.message = 'Seats more than 7 not allowed';

    return;
  }
  for(let i=0;i<7;i++){
    for(let j=0;j<7;j++){
      if(this.seats[i][j]==0){
        this.seats[i][j]=1;
        this.n--;
        if(this.n==0){
          this.message = 'Booked';
          return;
        }
      }
      else{
        this.seats[i][j]=-1;;
      }
    }

  }
  this.message = 'Booked';
  this.seats = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0],
  ];
  }

  getSeatStatus() {
    this.seats = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0],
    ];
   }
}
