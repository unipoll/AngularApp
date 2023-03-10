import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavService } from './services/sidenav.service';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { WorkspaceService } from './services/workspace.service';
import { ApiService } from './services/api.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { CreateWorkspaceComponent } from './components/create-workspace/create-workspace.component';
import { SnackBarService } from './services/snackbar.service';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WorkspaceListComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    WorkspaceComponent,
    CreateWorkspaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    SidenavService,
    WorkspaceService,
    SnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
