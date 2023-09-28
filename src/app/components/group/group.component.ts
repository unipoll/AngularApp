import { Component, Input, resolveForwardRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom, tap } from 'rxjs';
import { GroupModel } from '../../models/group.model';
import { MemberModel } from '../../models/member.model';
import { WorkspaceModel } from '../../models/workspace.model';
import { ApiService } from '../../services/api.service';
import { WorkspaceService } from '../../services/workspace.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {

  @Input() workspace!: WorkspaceModel;

  // public workspace!: WorkspaceModel | null;
  public group!: GroupModel | null;
  // public memberListData!: MemberModel[];
  public group_id!: string;
  // public permissions!: string[];

  // Markers for permissions
  // public can_get_members: boolean = false;
  // public can_add_members: boolean = false;
  // public can_get_policies: boolean = false;
  // public can_set_policies: boolean = false;
  // public can_delete_group: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private workspaceService: WorkspaceService,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.group_id = params['id'];
    });
    
    this.getGroup();
  }

  async getGroup(): Promise<void> {
    this.group = await lastValueFrom(this.apiService.getGroup(this.group_id, true, true));
    this.workspace = this.group.workspace;

    await lastValueFrom(this.apiService.getGroupPolicy(this.group.id)).then((response: any) => {
      this.authService.setPermissions(response.permissions);
    })
  }

  isAllowed(permission: string): boolean {
    return this.authService.isAllowed(permission);
  }
}
