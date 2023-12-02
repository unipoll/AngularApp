import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';

import { MaterialModule } from '../material/material.module';

import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        AuthHeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        AuthRoutingModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent
    ]

})
export class AuthModule { }
