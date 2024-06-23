import { Component } from '@angular/core';
import { Appointment } from '../models/appointment';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrl: './appointment-list.component.css'
})
export class AppointmentListComponent implements OnInit {



  ngOnInit(): void {
    if(typeof localStorage !== 'undefined') {
      let savedAppointments = localStorage.getItem("appointments");
    this.appointments = savedAppointments ? JSON.parse(savedAppointments) : [];
    }
  }

  newAppointmentName: string = "";
  newAppointmentDate: Date = new Date();

  appointments: Appointment[] = [];

  addAppointment() {

    if(this.newAppointmentName.trim().length && this.newAppointmentDate) {

      let appoitment: Appointment = {
        id: Date.now(),
        title: this.newAppointmentName,
        date: this.newAppointmentDate
      }

      this.appointments.push(appoitment);
      if(typeof localStorage !== 'undefined') {
        localStorage.setItem("appointments", JSON.stringify(this.appointments));
      }
      this.newAppointmentName = "";
      this.newAppointmentDate = new Date();
    }

  }

  deleteAppointment(index: number){
    this.appointments.splice(index, 1);
    if(typeof localStorage !== 'undefined'){
      localStorage.setItem("appointments", JSON.stringify(this.appointments));
    }
  }

}
