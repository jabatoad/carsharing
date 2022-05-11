import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";
import {UserForm} from "../../core/models/UserForm";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  form: FormGroup

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  signIn(data: UserForm): void {
    this.userService.signIn(data.username, data.password)

    const sub: Subscription = this.userService.currentUser.subscribe(userData => {
      if(userData.username) {
        this.router.navigate(['/list'])
        console.log('Right')
        sub.unsubscribe()
      }
    })
  }
}
