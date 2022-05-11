import { Component, OnInit } from '@angular/core';
import {UserService} from "../../core/services/user.service";
import {User} from "../../core";

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.sass']
})
export class UserlistComponent implements OnInit {

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers()
    this.usersArray = Object.values(this.userService.getUsers())
  }

  ngOnInit(): void {
  }
  users: User[] = []
  usersArray: User[] = []

  deleteUser(i: number): void {
    this.userService.deleteUser(Object.keys(this.users)[i])
    this.usersArray.splice(i, 1)
  }
}
