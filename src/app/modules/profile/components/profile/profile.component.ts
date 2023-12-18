import { Component } from '@angular/core';
import { AccountService } from 'src/app/core/services/account.service';
import { AccountModel } from 'src/app/models/account.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    account!: AccountModel;

    constructor(private accountService: AccountService) {
        this.account = accountService.getAccount();
    }
}
