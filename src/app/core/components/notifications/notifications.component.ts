import { Component, OnDestroy } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { SubscriptionLike } from 'rxjs';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss'
})
export class NotificationsComponent {
    private readonly eventSourceSubscription: SubscriptionLike;

    constructor(
        private notificationsService: NotificationsService,
        private settings: SettingsService
    ) {
        const url = this.settings.apiUrl + '/subscribe';

        this.eventSourceSubscription = this.notificationsService.getNotifications(url).subscribe({
            next: data => {
                //handle event
                console.log(data);
            },
            error: error => {
                //handle error
            }
        });
    }

    ngOnDestroy() {
        this.eventSourceSubscription.unsubscribe();
        this.notificationsService.close();
    }
}
