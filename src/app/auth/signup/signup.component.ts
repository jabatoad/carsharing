import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserForm} from "../../core/models/UserForm";
import {UserService} from "../../core/services/user.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.sass']
})
export class SignupComponent implements OnInit {
  form: FormGroup

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      phone: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required, Validators.minLength(4)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit(): void {
  }

  singUp(data: UserForm): void {
    this.userService.signUp(data)

    const sub: Subscription = this.userService.currentUser.subscribe(userData => {
      if(userData.username) {
        this.router.navigate(['/list'])
        console.log('Right')
        sub.unsubscribe()
      }
    })
  }
}
