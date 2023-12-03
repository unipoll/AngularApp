import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { MaterialModule } from '../modules/material/material.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderComponent,
        SidebarComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule
    ],
    exports: [
        HeaderComponent,
        SidebarComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptorService,
            multi: true
        },
    ]
})
export class CoreModule { }
