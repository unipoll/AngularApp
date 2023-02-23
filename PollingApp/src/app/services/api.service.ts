import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkspaceModel } from '../models/workspace.model';
import { WorkspaceListModel } from '../models/workspace-list.model';

const API_URL = 'http://10.0.0.172:8000';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    let fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);
    return this.http.post(API_URL + '/auth/jwt/login', fd);
  }

  // logout() {
  //   return this.http.post(API_URL + '/auth/jwt/logout', {});
  // }

  getUserWorkspace(): Observable<WorkspaceListModel> {
    let res = this.http.get<WorkspaceListModel>(API_URL + '/workspaces',
        { headers: { "Authorization": ("Bearer " + localStorage.getItem("access_token")) }});
    return res;
  }

  getWorkspace(id: string): Observable<WorkspaceModel> {
    let res = this.http.get<WorkspaceModel>(API_URL + '/workspaces/' + id,
        { headers: { "Authorization": ("Bearer " + localStorage.getItem("access_token")) }});
    return res;
  }
}
