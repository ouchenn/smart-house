import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}
  newuser: User = {
    nom: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  };
  ngOnInit(): void {}

  formIsValid() {
    return this.newuser.email != '' && this.newuser.password != '';
  }
  registerUser() {
    this.userService.register(this.newuser).subscribe(
      (user) => {},
      (error: Response) => {
        alert('not added ' + error.status);
        console.log(error);
      }
    );
  }
}
