import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordManagerService } from '../password-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isError: boolean = false;

  constructor(private passwordManagerService: PasswordManagerService, private router: Router) {

  }
  onSubmit(values: any) {
    this.passwordManagerService.login(values.email, values.password)
    .then(() =>{
      console.log("login successful");
      this.router.navigate(['/site-list']);
    })
    .catch(err=> {
      console.log(err);
      this.isError = true;
    })
  }
}
