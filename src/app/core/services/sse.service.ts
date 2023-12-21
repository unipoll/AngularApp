import { Injectable } from '@angular/core';
import { SSE, SSEOptions } from 'sse.js';
import { TokenInterceptorService } from './token-interceptor.service';


@Injectable({
    providedIn: 'root'
})
export class SseService {
    eventSource!: SSE;
    /**
     * Constructor of SSE service
     * @param kcService injection to get the authorization token
     */
    constructor(private tokenService: TokenInterceptorService) { }

    /**
     * Create an event source of POST request
     * @param API url 
     * @formData data (file, ...etc.)
     */
    public getEventSourceWithPost(url: string, formData: FormData): SSE {
        return this.buildEventSource(url, 'POST', formData);
    }

    /**
    * Create an event source of GET request
    * @param API url 
    * @formData data (file, ...etc.)
    */
    public getEventSourceWithGet(url: string): SSE {
        return this.buildEventSource(url, 'GET');
    }

    /**
     * Building the event source
     * @param url  API URL
     * @param method  (POST, GET, ...etc.)
     * @param formData data
     */
    private buildEventSource(url: string, method: string, formData?: FormData): SSE {
        const options = this.buildOptions(method, formData);
        this.eventSource = new SSE(url, options);

        // add listener
        this.eventSource.addEventListener('notification', (e: { data: any; }) => {
            return e.data.data;
        });

        return this.eventSource;
    }

    /**
     * close connection
     */
    public closeEventSource() {
        if (!!this.eventSource) {
            this.eventSource.close();
        }
    }

    /**
     * Build query options
     * @param method POST or GET
     * @param formData data
     */
    private buildOptions(
        method: string,
        formData?: FormData,
    ): SSEOptions {
        const auth = this.tokenService.token;
        if (formData) {
            return {
                payload: formData.toString(),
                method: method,
                headers: { Authorization: `Bearer ${auth}` }
            };
        } else {
            return {
                method: method,
                headers: { Authorization: `Bearer ${auth}` }
            };
        }
    }
}
