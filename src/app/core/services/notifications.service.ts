import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
    private eventSource: EventSource | null = null;

    /**
     * constructor
     * @param zone - we need to use zone while working with server-sent events
     * because it's an asynchronous operations which are run outside of change detection scope
     * and we need to notify Angular about changes related to SSE events
     */
    constructor(private zone: NgZone) { }

    /**
     * Method for creation of the EventSource instance
     * @param url - SSE server api path
     * @param options - configuration object for SSE
     */
    getEventSource(url: string, options: EventSourceInit): EventSource {
        
        return new EventSource(url, options);
    }

    /**
     * Method for establishing connection and subscribing to events from SSE
     * @param url - SSE server api path
     * @param options - configuration object for SSE
     * @param eventNames - all event names except error (listens by default) you want to listen to
     */
    connectToServerSentEvents(url: string, options: EventSourceInit, eventNames: string[] = []): Observable<Event> {
        this.eventSource = this.getEventSource(url, options);
        return new Observable((subscriber: Subscriber<Event>) => {
            if (this.eventSource) {
                this.eventSource.onerror = error => {
                    this.zone.run(() => subscriber.error(error));
                };
            }

            eventNames.forEach((event: string) => {
                if (this.eventSource) {
                    this.eventSource.addEventListener(event, data => {
                        this.zone.run(() => subscriber.next(data));
                    });
                }
            });
        });
    }

    /**
     * Method for closing the connection
     */
    close(): void {
        if (!this.eventSource) {
            return;
        }

        this.eventSource.close();
        this.eventSource = null;
    }
}
