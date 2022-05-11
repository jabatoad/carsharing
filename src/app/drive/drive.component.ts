import { Component, OnInit } from '@angular/core';
import {Mark} from "../core/models/Mark";
import {Car, CarsService, Ride, Timer, User} from "../core";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from "../core/services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.sass']
})
export class DriveComponent implements OnInit {

  cars: Car[] = []
  carsArray: Car[] = []
  currentCar: Car = {} as Car
  currentCarId: string = ''
  carWindow: boolean = false
  lat: number = 55.1759709
  lng: number = 30.2248781
  marks: Mark[] = []
  markObject: any = {
    url: 'assets/img/mark.svg',
    scaledSize: {
      width: 48,
      height: 53.2,
    },
  }
  countdown: Timer = {
    minutes: 0,
    seconds: 0,
  }
  isBooked: boolean = false
  rawRate: string = '0.00'
  rideInterval: any
  user: User = {} as User

  constructor(private carsService: CarsService, private http: HttpClient, private snackBar: MatSnackBar, private userService: UserService, private router: Router) {
    this.carsService.getCars()
    this.carsService.cars.subscribe(cars => {
      this.cars = cars
      this.carsArray = Object.values(cars)
      // this.currentCarId = Object.keys(this.cars)[i]
      const newCars = this.carsArray.filter(car => !car.rented)
      this.marks = []
      newCars.forEach(car => {
        this.marks.push(car.point)
      })
    })
    this.carsService.carId.subscribe(id => {
      this.currentCarId = id
      console.log('Current car ID: ', id)
    })
    this.carsService.currentCar.subscribe(car => {
      this.carWindow = false
      this.lat = car.point.lat
      this.lng = car.point.lng

      if(!this.carWindow && car.name) {
        console.log('Current car: ', car)
        this.carWindow = true
        this.currentCar = car
      }
    })
    this.userService.user.subscribe(userData => {
      this.user = userData
    })
  }

  ngOnInit(): void {
  }

  showCar(i: number): void {
    this.carWindow = false

    if(!this.carWindow) {
      this.carWindow = true
      this.currentCar = this.carsArray[i]
      this.currentCarId = Object.keys(this.cars)[i]

      this.lat = this.carsArray[i].point.lat
      this.lng = this.carsArray[i].point.lng
    }
  }

  rentCar(): boolean {
    if(!this.user.username) {
      this.router.navigate(['/signin'])
      return false
    } else {
      this.currentCar.rented = true
      this.carsService.bookCar(this.currentCarId, true)
      const displayTime = () => {
        this.rawRate = ((this.countdown.minutes * 60 + this.countdown.seconds) / 60 * this.currentCar.price).toFixed(2)

        this.countdown.seconds++
        if(this.countdown.seconds === 59) {
          this.countdown.minutes++
          this.countdown.seconds = 0
        }
      }
      this.rideInterval = setInterval(displayTime, 1000);
      return true
    }
  }
  endRide(): void {
    this.carsService.bookCar(this.currentCarId, false)
    this.currentCar.rented = false
    clearInterval(this.rideInterval)

    const ride: Ride = {
      time: `${this.countdown.minutes < 10 ? '0' + this.countdown.minutes : this.countdown.minutes}` + ':' + `${this.countdown.seconds < 10 ? '0' + this.countdown.seconds : this.countdown.seconds}`,
      rate: Number(this.rawRate),
      car: this.currentCar.name + ' ' + this.currentCar.year,
      imgName: this.currentCar.imgName
    }
    this.userService.addRide(ride)

    this.countdown = {
      minutes: 0,
      seconds: 0,
    }
    this.rawRate = ''
  }
}
