import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PasswordManagerService } from '../password-manager.service';
import { Observable } from 'rxjs';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TimerService } from '../timer.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-site-list',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, CommonModule, RouterLink, NavbarComponent],
  templateUrl: './site-list.component.html',
  styleUrls: ['./site-list.component.css'],
})
export class SiteListComponent {

  allSites !: Observable<Array<any>>;

  siteName !: string;
  siteURL !: string;
  imgURL !: string;
  id !: string;

  formState: string = "Add a New";

  isSuccessful: boolean = false;
  isError: boolean = false;
  successMessage !: string;


  showAlert(message: string) {
    this.isSuccessful = true;
    this.successMessage = message;
  }

  constructor(private passwordManagerService: PasswordManagerService, private timerService: TimerService) {
    this.renderSites();
  }

  onSubmit(values: object) {

    if(this.formState == "Add a New") {
    this.passwordManagerService.addSite(values)
    .then(() => {
      this.showAlert("Site Added Successfully!")
      this.timerService.removeAfterDelay(300);
    })
    .catch(err => {
      this.isError = true;
      this.timerService.removeAfterDelay(300);
      console.log(err);
    })
    } else {
      this.passwordManagerService.updateSite(this.id, values)
      .then(() => {
        this.showAlert("Site Updated Successfully!")
        this.timerService.removeAfterDelay(300);
      })
      .catch(err => {
        this.isError = true;
        this.timerService.removeAfterDelay(300);
        console.log(err);
      })
    }
  }

  clearForm () {
    this.siteName = "";
    this.siteURL = "";
    this.imgURL = "";
    this.id = "";
  }

  renderSites() {
    this.allSites = this.passwordManagerService.renderSites();
  }

    editSite(siteName: string, siteURL: string, imgURL: string, id: string) {
      this.siteName = siteName;
      this.siteURL = siteURL;
      this.imgURL = imgURL;
      this.id = id;

      this.formState = "Edit a "
    }

    addState() {
      this.siteName = "";
      this.siteURL = "";
      this.imgURL = "";
      this.id = "";

      this.formState = "Add a New";
    }

    deleteSite(id: string) {
      this.passwordManagerService.deleteSite(id)
      .then(() => {
        this.isSuccessful = true;
        this.showAlert("Site Deleted Successfully")
        this.timerService.removeAfterDelay(300);
      })
      .catch(err => {
        this.isError = true;
        this.timerService.removeAfterDelay(300);
        console.log(err);
      })
    }

}
