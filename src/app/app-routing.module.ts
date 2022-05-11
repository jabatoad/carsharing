import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {CarlistComponent} from "./carlist/carlist.component";
import {SigninComponent, SignupComponent} from "./auth";
import {DriveComponent} from "./drive/drive.component";
import {UserComponent} from "./user/user.component";
import {UserlistComponent} from "./user/userlist/userlist.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list', component: CarlistComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'drive', component: DriveComponent},
  {path: 'profile', component: UserComponent},
  {path: 'users', component: UserlistComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
