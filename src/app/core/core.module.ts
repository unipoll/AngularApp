import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';

import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { MaterialModule } from '../modules/material/material.module';

import { TokenInterceptorService } from './services/token-interceptor.service';
import { AccountService } from './services/account.service';
import { AuthorizationService } from './services/authorization.service';
import { RequestErrorHandlerService } from './services/request-error-handler.service';


@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent,
        NotificationsComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent,
        NotificationsComponent
    ],
    providers: [
        AuthorizationService,
        AccountService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: RequestErrorHandlerService,
            multi: true
        }
    ]
})
export class CoreModule { }
