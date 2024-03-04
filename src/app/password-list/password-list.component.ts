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

  id !: string;
  siteName !: string;
  siteURL !: string;
  imgURL !: string;

  allPasswordList !: Observable<Array<any>>

  constructor(private route: ActivatedRoute, private passwordManagerService: PasswordManagerService) {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.siteName = params['siteName'];
      this.siteURL = params['siteURL'];
      this.imgURL = params['imgURL'];
    });

    this.renderPasswords();
  }

  onSubmit(values: object) {
    this.passwordManagerService.addPassword(values, this.id)
    .then(() => {
      console.log("Password Added Successfully");
    })
    .catch(err => {
      console.log(err);
    })
  }

  renderPasswords() {
    this.allPasswordList = this.passwordManagerService.loadPasswords(this.id);
  }

  
}
