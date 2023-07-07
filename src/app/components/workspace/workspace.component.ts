import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceModel } from '../../models/workspace.model';
import { ApiService } from '../../services/api.service';
import { WorkspaceService } from '../../services/workspace.service';
import { MemberModel } from '../../models/member.model';
import { tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {

  public workspace!: WorkspaceModel | null;
  memberListData!: MemberModel[];
  public workspace_id!: string;
  public permissions!: string[];
  
  // Markers for permissions
  public can_get_policies: boolean = false;
  public can_get_members: boolean = false;
  public can_get_groups: boolean = false;
  public can_add_members: boolean = false;
  public can_create_groups: boolean = false;
  public can_set_policies: boolean = false;
  public can_delete_workspace: boolean = false;

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private workspaceService: WorkspaceService,
    private authService: AuthService) { 

      // Get user permissions in this workspace
      if (this.workspace) {
        this.authService.setPermissions(this.workspace.id).pipe(
          tap((data) => (
            this.permissions = data.permissions,
            this.can_get_policies = this.permissions.includes('get_workspace_policies'),
            this.can_get_members = this.permissions.includes('get_workspace_members'),
            this.can_get_groups = this.permissions.includes('get_groups'),
            this.can_add_members = this.permissions.includes('add_workspace_members'),
            this.can_create_groups = this.permissions.includes('create_group'),
            this.can_set_policies = this.permissions.includes('set_workspace_policies')
          ))
        ).subscribe();
      }
    }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.workspace_id = params['id'];
    });

    // Get workspace 
    // TODO: extract id from service instead of route
    this.workspace = this.workspaceService.getWorkspace();
    if (!this.workspace) {
      this.apiService.getWorkspace(this.workspace_id).pipe(tap((data: WorkspaceModel | null) => (
        console.log(data),
        this.workspace = data
      ))).subscribe();
      this.authService.setPermissions(this.workspace_id).pipe(
        tap((data) => (
          this.permissions = data.permissions,
          this.can_get_policies = this.permissions.includes('get_workspace_policies'),
          this.can_get_members = this.permissions.includes('get_workspace_members'),
          this.can_get_groups = this.permissions.includes('get_groups'),
          this.can_add_members = this.permissions.includes('add_workspace_members'),
          this.can_create_groups = this.permissions.includes('create_group'),
          this.can_set_policies = this.permissions.includes('set_workspace_policies')
        ))
      ).subscribe();
    }

    // Get user permissions in this workspace
    if (this.workspace) {
      this.authService.setPermissions(this.workspace_id).pipe(
        tap((data) => (
          this.permissions = data.permissions,
          this.can_get_policies = this.permissions.includes('get_workspace_policies'),
          this.can_get_members = this.permissions.includes('get_workspace_members'),
          this.can_get_groups = this.permissions.includes('get_groups'),
          this.can_add_members = this.permissions.includes('add_workspace_members'),
          this.can_create_groups = this.permissions.includes('create_group'),
          this.can_set_policies = this.permissions.includes('set_workspace_policies')
        ))
      ).subscribe();
    }
  }
}
