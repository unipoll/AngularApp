import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileInfoComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        MaterialModule
    ]
})
export class ProfileModule { }
