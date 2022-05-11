import {Component, OnInit} from '@angular/core';
import {UserService} from "../core/services/user.service";
import {Car, Ride, User} from "../core";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) {
    this.userService.currentUser.subscribe(user => {
      this.user = user

      const compare = (a: Ride,b: Ride) => {
        if(a.rate < b.rate) {
          return 1
        }
        if(a.rate > b.rate) {
          return -1
        }
        return 0
      }

      this.rides = Object.values(user.rides).sort(compare)
    })
  }

  user: User = {} as User
  rides: Ride[] = []
  ngOnInit(): void {

  }

}
