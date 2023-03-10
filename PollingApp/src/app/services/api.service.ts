import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspaceModel } from '../models/workspace.model';
import { WorkspaceListModel } from '../models/workspace-list.model';
import { MemberListModel } from '../models/member-list.model';
import { FormGroup } from '@angular/forms';


// const API_URL = 'http://10.0.0.172:8000';
const API_URL = 'https://pollapi.mpisman.studio';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

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

  getUserWorkspaces(): Observable<WorkspaceListModel> {
    return this.http.get<WorkspaceListModel>(API_URL + '/workspaces');
  }

  getWorkspace(id: string): Observable<WorkspaceModel> {
    return this.http.get<WorkspaceModel>(API_URL + '/workspaces/' + id);
  }

  getWorkspaceMembers(id: string): Observable<MemberListModel> {
    return this.http.get<MemberListModel>(API_URL + '/workspaces/' + id + '/members');
  }

  createWorkspace(data: any) {
    // let fd = new FormData();
    // fd.append('name', name);
    // fd.append('description', description);
    return this.http.post(API_URL + '/workspaces', data);
  }

  updateWorkspace(id: string, data: any) {
    // let fd = new FormData();
    // fd.append('name', name);
    // fd.append('description', description);
    return this.http.put(API_URL + '/workspaces/' + id, data);
  }
}
