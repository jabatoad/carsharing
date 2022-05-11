import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from "../services/user.service";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
    this.userService.user.subscribe(userData => {
      this.user = userData
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if(this.user) {
      return true
    } else {
      this.router.navigate(['/signin'])
      return false
    }
  }
  user: User = {} as User
}
