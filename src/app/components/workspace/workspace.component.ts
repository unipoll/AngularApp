import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceModel } from '../../models/workspace.model';
import { ApiService } from '../../services/api.service';
import { WorkspaceService } from '../../services/workspace.service';
import { MemberModel } from '../../models/member.model';
import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
  // Workspace data
  public workspace!: WorkspaceModel | null;
  public workspace_id!: string;
  // public memberListData!: MemberModel[];
  // public permissions!: string[];
  
  // TODO: Make permissions an observable
  /* Update page on permission change
    i.e. On Load
    private _can_get_groups$ = new BehaviorSubject<boolean>(false);
    public can_get_groups$ = this._can_get_groups$.asObservable();
    ...
    On change:
    this._can_get_groups$.next(this.permissions.includes('get_groups'));
  */

  // Constructor
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private workspaceService: WorkspaceService,
    private authService: AuthService) {
  }

  // Get workspace data on init
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.workspace_id = params['id'];
    });

    this.getWorkspace();
  }

  // Get workspace data
  async getWorkspace(): Promise<void> {
    // let workspace = this.workspaceService.getWorkspace();

    // if (!workspace)
    // workspace = await lastValueFrom(this.apiService.getWorkspace(this.workspace_id, true, true, true));

    this.workspace = await lastValueFrom(this.apiService.getWorkspace(this.workspace_id, true, true, true));

    await lastValueFrom(this.apiService.getWorkspacePolicy(this.workspace.id)).then((response: any) => {
      this.authService.setPermissions(response.permissions);
    });
  }

  isAllowed(permission: string): boolean {
    return this.authService.isAllowed(permission);
  }
}
