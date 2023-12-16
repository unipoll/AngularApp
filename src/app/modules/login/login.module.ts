import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { MaterialModule } from '../material/material.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    declarations: [
        LoginComponent,
        // RegisterComponent,
        AuthHeaderComponent
    ],
    imports: [
        CommonModule,
        MaterialModule,
        LoginRoutingModule
    ],
    exports: [
        // LoginComponent,
        // RegisterComponent
    ]

})
export class LoginModule { }
