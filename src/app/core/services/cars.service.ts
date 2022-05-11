import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get, set, remove } from "firebase/database";
import {Car} from "../models/Car";
import {BehaviorSubject, Observable} from "rxjs";
import {Mark} from "../models/Mark";
import { v4 as uuid } from 'uuid'

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor() {
  }

  firebaseConfig = {
    apiKey: "AIzaSyBG3CYZsswUuZec6H6dGPYg4CWqsZ2pQmE",
    authDomain: "carsharing-19136.firebaseapp.com",
    databaseURL: "https://carsharing-19136-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carsharing-19136",
    storageBucket: "carsharing-19136.appspot.com",
    messagingSenderId: "210566615666",
    appId: "1:210566615666:web:bff0f1939cc1dab8d828eb"
  };

  app = initializeApp(this.firebaseConfig);

  dbRef = ref(getDatabase());

  cars = new BehaviorSubject<Car[]>([]);
  carsArray: Car[] = []
  marksDB = new BehaviorSubject<Mark[]>([]);
  marks = this.marksDB.asObservable()
  car = new BehaviorSubject<Car>({} as Car)
  currentCar = this.car.asObservable()
  carId = new BehaviorSubject<string>('')
  currentCarId = this.carId.asObservable()

  getCars(): void {
    get(child(this.dbRef, 'cars')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val())
        this.cars.next(snapshot.val())
        this.carsArray.push(snapshot.val())
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  db = getDatabase()
  addCar(car: Car) {
    set(ref(this.db, `cars/${uuid()}`), car)
  }
  bookCar(id: string, flag: boolean) {
    console.log(id)
    set(ref(this.db, `cars/${id}/rented`), flag)
  }
}
