// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { MarkdownModule } from 'ngx-markdown';
import { DialogsModule } from './modules/dialogs/dialogs.module';

// Guards
import { AuthGuard } from './auth.guard';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { GroupComponent } from './components/group/group.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';

// Services
import { SidenavService } from './services/sidenav.service';
import { AuthService } from './services/auth.service';
import { WorkspaceService } from './services/workspace.service';
import { ApiService } from './services/api.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SnackBarService } from './services/snackbar.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    WorkspaceListComponent,
    SidebarComponent,
    HeaderComponent,
    WorkspaceComponent,
    MemberListComponent,
    GroupListComponent,
    GroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    MarkdownModule.forRoot(),
    DialogsModule,
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
