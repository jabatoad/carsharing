import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {getDatabase, ref, child, get, set, remove} from "firebase/database";
import {Car} from "../models/Car";
import {UserForm} from "../models/UserForm";
import { v4 as uuid } from 'uuid'
import {BehaviorSubject, Observable} from "rxjs";
import firebase from "firebase/compat";
import {User} from "../models/User";
import {Ride} from "../models/Ride";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  firebaseConfig = {
    apiKey: "AIzaSyBG3CYZsswUuZec6H6dGPYg4CWqsZ2pQmE",
    authDomain: "carsharing-19136.firebaseapp.com",
    databaseURL: "https://carsharing-19136-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "carsharing-19136",
    storageBucket: "carsharing-19136.appspot.com",
    messagingSenderId: "210566615666",
    appId: "1:210566615666:web:bff0f1939cc1dab8d828eb"
  }
  user = new BehaviorSubject<User>({} as User)
  currentUser = this.user.asObservable()
  currentUsername: string = ''

  app = initializeApp(this.firebaseConfig)
  dbRef = ref(getDatabase())
  db = getDatabase()

  signUp(data: UserForm): void {
    const user: User = {
      username: data.username,
      password: data.password,
      phone: data.phone,
      rides: [],
      admin: false
    }
    this.user.next(user)
    console.log(this.usersArray)
    this.usersArray.push(user)
    this.currentUsername = user.username
    set(ref(this.db, `users/${uuid()}`), user)
  }
  usersArray: User[] = []
  users: User[] = []
  signIn(username: string, password: string)  {
    get(child(this.dbRef, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        this.users = snapshot.val()
        this.usersArray = Object.values(snapshot.val())
      }
    }).then(() => {
      Object.values(this.users).forEach((user) => {
        if(user.username === username && user.password === password) {
          this.currentUsername = user.username
          this.user.next(user)
        }
      })
    })

  }
  currentUserID: string = ''
  getUserID(): void {
    get(child(this.dbRef, 'users')).then((snapshot) => {
      if (snapshot.exists()) {
        this.users = snapshot.val()
        this.usersArray = Object.values(snapshot.val())
      }
    }).then(() => {
      const usersArray: User[] = this.usersArray
      const usersKeysArray: string[] = Object.keys(this.users)

      for (let i = 0; i < usersArray.length; i++) {
        if(usersArray[i].username === this.currentUsername) {
          this.currentUserID = usersKeysArray[i]
        }
      }
    })
  }
  addRide(ride: Ride): void {
    this.getUserID()
    setTimeout(() => {
      set(ref(this.db, `users/${this.currentUserID}/rides/${uuid()}`), ride)
    }, 2000)
  }

  getUsers(): User[] {
    return this.users
  }
  deleteUser(id: string): void {
    remove(ref(this.db, `users/${id}`))
  }
}
