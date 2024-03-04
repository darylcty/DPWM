import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-password-list',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor, NgIf],
  templateUrl: './password-list.component.html',
  styleUrl: './password-list.component.css'
})
export class PasswordListComponent {

  siteId !: string;
  siteName !: string;
  siteURL !: string;
  imgURL !: string;

  allPasswordList !: Observable<Array<any>>

  email !: string;
  username !: string;
  password !: string;
  passwordId !: string;

  formState = "Add a New ";

  isSuccessful: boolean = false;
  successMessage !: string;
  isError: boolean = false;

  resetForm() {
    this.email = "";
    this.username = "";
    this.password = "";
    this.passwordId = "";

    this.formState = "Add a New "
  }

  showAlert(message: string) {
    this.isSuccessful = true;
    this.successMessage = message
  }


  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe(params => {
      this.siteId = params['id'];
      this.siteName = params['siteName'];
      this.siteURL = params['siteURL'];
      this.imgURL = params['imgURL'];
    });

    this.renderPasswords();
  }

  onSubmit(values: object) {
    if (this.formState == "Add a New ") {
      this.passwordManagerService.addPassword(values, this.siteId)
      .then(() => {
        this.showAlert("Password Added Successfully");
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    } else {
      this.passwordManagerService.updatePassword(this.siteId, this.passwordId, values)
      .then(() => {
        this.showAlert("Password Updated Successfully");
        this.resetForm();
      })
      .catch(err => {
        console.log(err);
      })
    }
  }

  renderPasswords() {
    this.allPasswordList = this.passwordManagerService.loadPasswords(this.siteId);
  }

  editPassword(email: string, username: string, password: string, passwordId: string) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.passwordId = passwordId;

    this.formState = "Edit"
  }

  deletePassword(passwordId: string) {
    this.passwordManagerService.deletePassword(this.siteId, passwordId)
    .then(() => {
      this.showAlert("Password Deleted Successfully");
    })
    .catch(err => {
      console.log(err);
    })
  }

}
