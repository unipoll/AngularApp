import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { SseService } from './sse.service';
import { NotificationModel } from 'src/app/models/notification.model';


@Injectable({
    providedIn: 'root'
})
export class NotificationsService {
    constructor(private zone: NgZone, private sseService: SseService) { }

    /**
     * Method for establishing connection and subscribing to events from SSE
     * @param url - SSE server api path
     * @param options - configuration object for SSE
     * @param eventNames - all event names except error (listens by default) you want to listen to
     */
    getNotifications(url: string): Observable<NotificationModel> {
        return new Observable((subscriber: Subscriber<NotificationModel>) => {
            const eventSource = this.sseService.getEventSourceWithGet(url);
            
            // Launch query
            eventSource.stream();
            
            // on answer from message listener 
            eventSource.onmessage = (event) => {
                this.zone.run(() => {
                    if (event.data) {
                        subscriber.next(JSON.parse(event.data));
                    }
                });
            };
            eventSource.onerror = (error) => {
                this.zone.run(() => {
                    subscriber.error(error);
                });
            };
        });
    }

    /**
     * Method for closing the connection
     */
    close(): void {
        // this.sseService.closeEventSource(eventSource);
        this.sseService.closeEventSource();
    }
}
