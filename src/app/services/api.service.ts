import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

import { environment } from '../../environments/environment'
import { WorkspaceModel } from '../models/workspace.model';
import { WorkspaceListModel } from '../models/workspace.model';
import { MemberListModel } from '../models/member.model';
import { GroupListModel, GroupModel } from '../models/group.model';
import { AccountListModel } from '../models/account.model';
import { Permissions, PolicyListModel, PolicyModel } from '../models/policy.model';

// @ts-ignore
const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}


  // Authentification
  login(username: string, password: string) {
    let fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    return this.http.post(API_URL + '/auth/jwt/login', fd, { observe: 'response' });
  }

  // logout() {
  //   return this.http.post(API_URL + '/auth/jwt/logout', {});
  // }

  register(fd: FormGroup): Observable<any> {
    return this.http.post(API_URL + '/auth/register', {
      email: fd.get('email')?.value,
      password: fd.get('password')?.value,
      first_name: fd.get('first_name')?.value,
      last_name: fd.get('last_name')?.value
    }, { observe: 'response' });
  }

  // Workspaces

  // Get list of workspaces
  getUserWorkspaces(): Observable<WorkspaceListModel> {
    return this.http.get<WorkspaceListModel>(API_URL + '/workspaces');
  }

  // Get workspace by workspace_id
  getWorkspace(workspace_id: string, policies = false, groups = false, members = false): Observable<WorkspaceModel> {
    let params = new HttpParams();

    params.append("include", "none");
    
    if (policies && groups && members) {
      params = params.append("include", "all");
    }
    else {
      params = policies ? params.append("include", "policies") : params;
      params = groups ? params.append("include", "groups") : params;
      params = members ? params.append("include", "members") : params;
    }

    return this.http.get<WorkspaceModel>(API_URL + '/workspaces/' + workspace_id, { params: params });
  }

  // Create workspace
  createWorkspace(data: any) {
    return this.http.post(API_URL + '/workspaces', data);
  }

  // Update workspace
  updateWorkspace(workspace_id: string, data: any) {
    return this.http.put(API_URL + '/workspaces/' + workspace_id, data);
  }

  // Delete workspace
  deleteWorkspace(workspace_id: string) {
    return this.http.delete(API_URL + '/workspaces/' + workspace_id);
  }

  // Get list of members in workspace
  getWorkspaceMembers(workspace_id: string): Observable<MemberListModel> {
    return this.http.get<MemberListModel>(API_URL + '/workspaces/' + workspace_id + '/members');
  }

  // Add member to workspace
  addMemberToWorkspace(workspace_id: string, data: any) {
    return this.http.post(API_URL + '/workspaces/' + workspace_id + '/members', data);
  }

  // Remove member from workspace
  removeMemberFromWorkspace(workspace_id: string, member_workspace_id: string) {
    return this.http.delete(API_URL + '/workspaces/' + workspace_id + '/members/' + member_workspace_id);
  }

  // Get all policies
  getAllWorkspacesPolicies(workspace_id: string): Observable<PolicyListModel> {
    return this.http.get<PolicyListModel>(API_URL + '/workspaces/' + workspace_id + '/policies');
  }

  // Get workspace policy for specific account, or current user if account_id was not provided
  getWorkspacePolicy(workspace_id: string, account_id?: string): Observable<PolicyModel> {
    const options = account_id ? { params: { account_id: account_id } } : {}; 
    return this.http.get<PolicyModel>(API_URL + '/workspaces/' + workspace_id + '/policy', options);
  }

  // Update workspace policy
  setWorkspacePolicy(workspace_id: string, data: any) {
    return this.http.put(API_URL + '/workspaces/' + workspace_id + '/policy', data);
  }

  getWorkspacePermissions(): Observable<Permissions> {
    return this.http.get<Permissions>(API_URL + '/workspaces/permissions');
  }

  // Get list of groups in workspace
  getWorkspaceGroups(id: string): Observable<GroupListModel> {
    return this.http.get<GroupListModel>(API_URL + '/workspaces/' + id + '/groups');
  }

  // Groups

  // Create group in workspace
  createGroup(workspace_id: string, data: any) {  
    return this.http.post(API_URL + '/workspaces/' + workspace_id + '/groups', data);
  }
  
  // Get group by id
  getGroup(group_id: string): Observable<GroupModel> {
    return this.http.get<GroupModel>(API_URL + '/groups/' + group_id);
  }

  // Delete group by id
  deleteGroup(group_id: string) {
    return this.http.delete(API_URL + '/groups/' + group_id);
  }

  // Update group
  updateGroup(group_id: string, data: any) {
    return this.http.put(API_URL + '/groups/' + group_id, data);
  }

  // Get list of members in group
  getGroupMembers(group_id: string): Observable<MemberListModel> {
    return this.http.get<MemberListModel>(API_URL + '/groups/' + group_id + '/members');
  }

  // Add member to group
  addMemberToGroup(group_id: string, data: any) {
    return this.http.post(API_URL + '/groups/' + group_id + '/members', data);
  }

  // Remove member from group
  removeMemberFromGroup(group_id: string, member_id: string) {
    return this.http.delete(API_URL + '/groups/' + group_id + '/members/' + member_id);
  }

  // Get all group policies
  getAllGroupsPolicies(group_id: string): Observable<PolicyListModel> {
    return this.http.get<PolicyListModel>(API_URL + '/groups/' + group_id + '/policies');
  }

  // Get group policy for specific account, or current user if account_id was not provided
  getGroupPolicy(group_id: string, account_id?: string): Observable<PolicyModel> {
    const options = account_id ? { params: { account_id: account_id } } : {}; 
    return this.http.get<PolicyModel>(API_URL + '/groups/' + group_id + '/policy', options);
  }

  setGroupPolicy(group_id: string, data: any) {
    return this.http.put(API_URL + '/groups/' + group_id + '/policy', data);
  }

  getGroupPermissions(): Observable<Permissions> {
    return this.http.get<Permissions>(API_URL + '/groups/permissions');
  }

  // Accounts
  getAllAccounts(): Observable<AccountListModel> {
    return this.http.get<AccountListModel>(API_URL + '/accounts');
  }
}
