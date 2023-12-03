import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { guestOnly } from 'src/app/core/guards/auth.guard';

const routes: Routes = [{ 
        path: 'login', 
        component: LoginComponent,
        canActivate: [guestOnly]
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [guestOnly]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
