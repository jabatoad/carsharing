import { Component, OnInit } from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.user.subscribe(user => {
      if(user.username) {
        this.user = user
        this.isLogged = true
      }
    })
    this.userService.getUserID()
    this.currentUserID = this.userService.currentUserID
  }

  ngOnInit(): void {
  }

  user: User = {} as User
  isLogged: boolean = false
  currentUserID: string = ''

  logOut() {
    this.userService.user.next({} as User)
    this.user = {} as User
    this.isLogged = false
  }
}
