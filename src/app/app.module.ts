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
import { GroupComponent } from './components/group/group.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/auth.service';
import { WorkspaceService } from './services/workspace.service';
import { ApiService } from './services/api.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { SnackBarService } from './services/snackbar.service';
import { MemberListComponent } from './components/member-list/member-list.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { DialogDeleteComponent } from './components/dialogs/dialog-delete/dialog-delete.component';
import { DialogCreateComponent } from './components/dialogs/dialog-create/dialog-create.component';
import { DialogUpdateComponent } from './components/dialogs/dialog-update/dialog-update.component';
import { DialogAddMemberComponent } from './components/dialogs/dialog-add-member/dialog-add-member.component';
import { DialogAddPolicyComponent } from './components/dialogs/dialog-add-policy/dialog-add-policy.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';

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
    MemberListComponent,
    GroupListComponent,
    AddMemberComponent,
    DialogDeleteComponent,
    GroupComponent,
    DialogCreateComponent,
    DialogUpdateComponent,
    DialogAddMemberComponent,
    DialogAddPolicyComponent,
    PolicyListComponent
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
