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
        // const url = 'https://localhost:8000/subscribe';
        const url = this.settings.apiUrl + '/subscribe';
        const options = { withCredentials: true };
        const eventNames = ['myEventName'];

        this.eventSourceSubscription = this.notificationsService.connectToServerSentEvents(url, options, eventNames)
            .subscribe({
                    next: data => {
                        //handle event
                        console.log(data);
                    },
                    error: error => {
                        //handle error
                    }
                }
            );
    }

    ngOnDestroy() {
        this.eventSourceSubscription.unsubscribe();
        this.notificationsService.close();
    }
}
