import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PasswordManagerService } from '../password-manager.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { AES, enc } from 'crypto-js';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

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

  allPasswordList !: Array<any>;

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

  onSubmit(values: any) {

    const encryptedPassword = this.encryptPassword(values.password);
    values.password = encryptedPassword;
    console.log(values)

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
    this.passwordManagerService.loadPasswords(this.siteId).subscribe(value => {
      this.allPasswordList = value;
    })
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

  encryptPassword(password: string) {
    const secretKey = "567E8F67E2FA57991945D9CAC7A61";
    const encryptedPassword = AES.encrypt(password, secretKey).toString();
    return encryptedPassword;
  }

  decryptPassword(encryptedPassword: string) {
    const secretKey = "567E8F67E2FA57991945D9CAC7A61";
    const decryptedPassword = AES.decrypt(encryptedPassword, secretKey).toString(enc.Utf8);
    return decryptedPassword;
  }

  onDecrypt(password: string, index: number) {
    const decPassword = this.decryptPassword(password);
    this.allPasswordList[index].password = decPassword;
  }

}
