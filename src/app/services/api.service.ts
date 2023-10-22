import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { environment } from '../../environments/environment'
import { WorkspaceModel } from '../models/workspace.model';
import { WorkspaceListModel } from '../models/workspace.model';
import { MemberListModel } from '../models/member.model';
import { GroupListModel, GroupModel } from '../models/group.model';
import { AccountListModel, AccountModel } from '../models/account.model';
import { Permissions, PolicyListModel, PolicyModel } from '../models/policy.model';
import { NewPollRequestBody, PollModel, PollListModel } from '../models/poll.model';
import { SettingsService } from './settings.service';


@Injectable({ providedIn: 'root' })
export class ApiService {

  constructor(private http: HttpClient, private settings: SettingsService) {}

  // Authentification
  login(username: string, password: string) {
    let fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    return this.http.post(this.settings.apiUrl + '/auth/jwt/login', fd, { observe: 'response' });
  }

  // logout() {
  //   return this.http.post(this.settings.apiUrl + '/auth/jwt/logout', {});
  // }

  register(fd: FormGroup): Observable<any> {
    return this.http.post(this.settings.apiUrl + '/auth/register', {
      email: fd.get('email')?.value,
      password: fd.get('password')?.value,
      first_name: fd.get('first_name')?.value,
      last_name: fd.get('last_name')?.value
    }, { observe: 'response' });
  }


  // Accounts

  // Get list of accounts
  getAllAccounts(): Observable<AccountListModel> {
    return this.http.get<AccountListModel>(this.settings.apiUrl + '/accounts');
  }

  // Get user account
  getUserAccount(): Observable<AccountModel> {
    return this.http.get<AccountModel>(this.settings.apiUrl + '/accounts/me');
  }


  // Workspaces

  // Get list of workspaces
  getUserWorkspaces(): Observable<WorkspaceListModel> {
    return this.http.get<WorkspaceListModel>(this.settings.apiUrl + '/workspaces');
  }

  // Get workspace by workspace_id
  getWorkspace(workspace_id: string, policies = false, groups = false, members = false, polls = false): Observable<WorkspaceModel> {
    let params = new HttpParams();

    params.append("include", "none");
    
    if (policies && groups && members && polls) {
      params = params.append("include", "all");
    }
    else {
      params = policies ? params.append("include", "policies") : params;
      params = groups ? params.append("include", "groups") : params;
      params = members ? params.append("include", "members") : params;
      params = polls ? params.append("include", "polls") : params;
    }

    return this.http.get<WorkspaceModel>(this.settings.apiUrl + '/workspaces/' + workspace_id, { params: params });
  }

  // Create workspace
  createWorkspace(data: any) {
    return this.http.post(this.settings.apiUrl + '/workspaces', data);
  }

  // Update workspace
  updateWorkspace(workspace_id: string, data: any) {
    return this.http.patch(this.settings.apiUrl + '/workspaces/' + workspace_id, data);
  }

  // Delete workspace
  deleteWorkspace(workspace_id: string) {
    return this.http.delete(this.settings.apiUrl + '/workspaces/' + workspace_id);
  }

  // Get list of members in workspace
  getWorkspaceMembers(workspace_id: string): Observable<MemberListModel> {
    return this.http.get<MemberListModel>(this.settings.apiUrl + '/workspaces/' + workspace_id + '/members');
  }

  // Add member to workspace
  addMemberToWorkspace(workspace_id: string, data: any) {
    return this.http.post(this.settings.apiUrl + '/workspaces/' + workspace_id + '/members', data);
  }

  // Remove member from workspace
  removeMemberFromWorkspace(workspace_id: string, member_workspace_id: string) {
    return this.http.delete(this.settings.apiUrl + '/workspaces/' + workspace_id + '/members/' + member_workspace_id);
  }

  // Get all policies
  getWorkspacePolicies(workspace_id: string, account_id?: string): Observable<PolicyListModel> {
    const options = account_id ? { params: { account_id: account_id } } : {};
    return this.http.get<PolicyListModel>(this.settings.apiUrl + '/workspaces/' + workspace_id + '/policies', options);
  }

  // Get workspace policy for specific account, or current user if account_id was not provided
  // getWorkspacePolicy(workspace_id: string, account_id?: string): Observable<PolicyModel> {
  //   const options = account_id ? { params: { account_id: account_id } } : {}; 
  //   this.http.get<PolicyListModel>(this.settings.apiUrl + '/workspaces/' + workspace_id + '/policies', options);
  // }

  // Update workspace policy
  setWorkspacePolicy(workspace_id: string, data: any) {
    return this.http.put(this.settings.apiUrl + '/workspaces/' + workspace_id + '/policy', data);
  }

  getWorkspacePermissions(): Observable<Permissions> {
    return this.http.get<Permissions>(this.settings.apiUrl + '/workspaces/permissions');
  }

  // Get list of groups in workspace
  getWorkspaceGroups(id: string): Observable<GroupListModel> {
    return this.http.get<GroupListModel>(this.settings.apiUrl + '/workspaces/' + id + '/groups');
  }

  // Groups

  // Create group in workspace
  createGroup(workspace_id: string, data: any) {  
    return this.http.post(this.settings.apiUrl + '/workspaces/' + workspace_id + '/groups', data);
  }
  
  // Get group by id
  getGroup(group_id: string, policies = false, members = false): Observable<GroupModel> {
    let params = new HttpParams();

    params.append("include", "none");
    
    if (policies && members) {
      params = params.append("include", "all");
    }
    else {
      params = policies ? params.append("include", "policies") : params;
      params = members ? params.append("include", "members") : params;
    }

    return this.http.get<GroupModel>(this.settings.apiUrl + '/groups/' + group_id, { params: params });
  }

  // Delete group by id
  deleteGroup(group_id: string) {
    return this.http.delete(this.settings.apiUrl + '/groups/' + group_id);
  }

  // Update group
  updateGroup(group_id: string, data: any) {
    return this.http.patch(this.settings.apiUrl + '/groups/' + group_id, data);
  }

  // Get list of members in group
  getGroupMembers(group_id: string): Observable<MemberListModel> {
    return this.http.get<MemberListModel>(this.settings.apiUrl + '/groups/' + group_id + '/members');
  }

  // Add member to group
  addMemberToGroup(group_id: string, data: any) {
    return this.http.post(this.settings.apiUrl + '/groups/' + group_id + '/members', data);
  }

  // Remove member from group
  removeMemberFromGroup(group_id: string, member_id: string) {
    return this.http.delete(this.settings.apiUrl + '/groups/' + group_id + '/members/' + member_id);
  }

  // Get all group policies
  getAllGroupsPolicies(group_id: string): Observable<PolicyListModel> {
    return this.http.get<PolicyListModel>(this.settings.apiUrl + '/groups/' + group_id + '/policies');
  }

  // Get group policy for specific account, or current user if account_id was not provided
  getGroupPolicy(group_id: string, account_id?: string): Observable<PolicyModel> {
    const options = account_id ? { params: { account_id: account_id } } : {}; 
    return this.http.get<PolicyModel>(this.settings.apiUrl + '/groups/' + group_id + '/policies', options);
  }

  setGroupPolicy(group_id: string, data: any) {
    return this.http.put(this.settings.apiUrl + '/groups/' + group_id + '/policies', data);
  }

  getGroupPermissions(): Observable<Permissions> {
    return this.http.get<Permissions>(this.settings.apiUrl + '/groups/permissions');
  }


  // Polls

  // Get list of polls in workspace
  getAllPolls(workspace_id: string): Observable<PollListModel> {
    return this.http.get<PollListModel>(this.settings.apiUrl + '/workspaces/' + workspace_id + '/polls');
  }

  // Create poll in workspace
  createPoll(workspace_id: string, data: NewPollRequestBody): Observable<PollModel> {
    return this.http.post<PollModel>(this.settings.apiUrl + '/workspaces/' + workspace_id + '/polls', data);
  }

  // Get poll by id
  getPoll(poll_id: string, questions = false, policies = false): Observable<PollModel> {
    let params = new HttpParams();

    params.append("include", "none");
    
    if (policies && questions) {
      params = params.append("include", "all");
    }
    else {
      params = questions ? params.append("include", "members") : params;
      params = policies ? params.append("include", "policies") : params;
    }
    return this.http.get<PollModel>(this.settings.apiUrl + '/polls/' + poll_id, { params: params });
  }

}
