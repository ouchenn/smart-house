import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  loguser: User = {
    nom: 'admin',
    email: 'admin@gmail.com',
    password: 'admin',
  };

  ngOnInit(): void {}

  formIsValid() {
    return this.loguser.email != '' && this.loguser.password != '';
  }
  loginUser() {
    this.userService.login(this.loguser).subscribe(
      (res) => {
        this.tokenService.handle(res);
        this.tokenService.changeStatus(true);
        this.router.navigate(['/home']);
      },
      (error: Response) => {
        alert('password incorect ' + error.status);
        console.log(error);
      }
    );
  }
}
