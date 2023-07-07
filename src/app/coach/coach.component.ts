import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent {
  seats: any[][] = [];
  selectedSeats: any[] = [];
  booking:number = 0;
  message: string = '';
  constructor() {
    this.initializeSeats();
  }

  
  initializeSeats(): void {
    const rows = 12;
    const seatsPerRow = 7;
    const lastRowSeats = 3;
    const totalSeats = (rows - 1) * seatsPerRow + lastRowSeats;
    
    let seatNumber = 1;
    for (let i = 0; i < rows - 1; i++) {
      const row = [];
      for (let j = 0; j < seatsPerRow; j++) {
        row.push({ number: seatNumber, booked: false, selected: false });
        seatNumber++;
      }
      this.seats.push(row);
    }
    
    const lastRow = [];
    for (let j = 0; j < lastRowSeats; j++) {
      lastRow.push({ number: seatNumber, booked: false, selected: false });
      seatNumber++;
    }
    this.seats.push(lastRow);
  }

  availableSeats(): number {
    return this.seats.reduce((acc, row) => {
      return acc + row.filter(s => !s.booked).length;
    }, 0);
  }

  
  reserveSeat(seat: any): void {
    if (seat.booked) {
      return;
    }
    
    seat.selected = !seat.selected;
    
    if (seat.selected) {
      this.selectedSeats.push(seat);
    } else {
      const index = this.selectedSeats.findIndex(s => s.number === seat.number);
      if (index !== -1) {
        this.selectedSeats.splice(index, 1);
      }
    }
  }
  
  reserveSeats(): void {
    let availableSeats = this.availableSeats();
    if(availableSeats < this.booking){
      this.message="Please select less than or equal to "+availableSeats+" seats";
      return;
    }
    console.log(availableSeats,"availableSeats");
    if (this.booking === 0) {
      return;
    }
    
    if (this.booking > 7) {
      this.message='You can reserve up to 7 seats at a time.';
      return;
    }
    
    let reservedSeats: any[] = [];
    
    if (this.reserveSeatsInRow(this.booking, reservedSeats)) {
      this.updateSeats(reservedSeats);
    } else {
      this.reserveSeatsNearby(this.booking, reservedSeats);
      this.updateSeats(reservedSeats);
    }
    
    this.clearSelectedSeats();
  }
  
  reserveSeatsInRow(numSeats: number, reservedSeats: any[]): boolean {
    for (const row of this.seats) {
      let startIndex = -1;
      for (let i = 0; i <= row.length - numSeats; i++) {
        let count = 0;
        for (let j = i; j < i + numSeats; j++) {
          if (!row[j].booked) {
            count++;
          }
        }
        if (count === numSeats) {
          startIndex = i;
          break;
        }
      }
      
      if (startIndex !== -1) {
        for (let i = startIndex; i < startIndex + numSeats; i++) {
          reservedSeats.push(row[i]);
        }
        return true;
      }
    }
    
    return false;
  }
  
  reserveSeatsNearby(numSeats: number, reservedSeats: any[]): void {
    const seatsToReserve = numSeats - reservedSeats.length;
    
    for (const row of this.seats) {
      for (let i = 0; i < row.length; i++) {
        if (!row[i].booked) {
          reservedSeats.push(row[i]);
          
          if (reservedSeats.length === numSeats) {
            return;
          }
        }
      }
    }
  }
  
  updateSeats(reservedSeats: any[]): void {
    for (const seat of reservedSeats) {
      seat.booked = true;
    }
  }
  
  clearSelectedSeats(): void {
    for (const seat of this.selectedSeats) {
      seat.selected = false;
    }
    
    this.selectedSeats = [];
  }

  reset(){
    this.seats = [];
    this.initializeSeats();
    this.clearSelectedSeats();
  }
 }

