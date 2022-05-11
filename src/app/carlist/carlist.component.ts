import { Component, OnInit } from '@angular/core';
import {Car} from "../core";
import {CarsService} from "../core/services/cars.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-carlist',
  templateUrl: './carlist.component.html',
  styleUrls: ['./carlist.component.sass']
})
export class CarlistComponent implements OnInit {

  constructor(private carsService: CarsService, private router: Router) {

  }

  ngOnInit(): void {
    this.carsService.getCars()
    this.carsService.cars.subscribe(cars => {
      const compare = (a: Car,b: Car) => {
        if(a.price < b.price) {
          return 1
        }
        if(a.price > b.price) {
          return -1
        }
        return 0
      }
      this.cars = cars
      this.carsArray = Object.values(cars)
      // this.carsArray = Object.values(cars)
    })
  }
  cars: Car[] = []
  carsArray: Car[] = []
  term: string = ''

  rentCar(car: Car, i: number): void {
    this.carsService.car.next(car)
    this.carsService.carId.next(Object.keys(this.cars)[i])
    console.log(car, Object.keys(this.cars)[i])
    this.router.navigate(['/drive'])
  }
}
