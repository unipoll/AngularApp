import { Component, Input } from '@angular/core';
import { AccountModel } from 'src/app/models/account.model';

@Component({
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent {
    @Input() account!: AccountModel;

    defaultProfileImage: string = '/assets/default-profile-image.svg'
}
