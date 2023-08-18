import { Component, Input } from '@angular/core';
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
  public memberListData!: MemberModel[];
  public group_id!: string;
  public permissions!: string[];

  // Markers for permissions
  public can_get_members: boolean = false;
  public can_add_members: boolean = false;
  public can_get_policies: boolean = false;
  public can_set_policies: boolean = false;
  public can_delete_group: boolean = false;

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
    let group = this.workspaceService.getGroup();
    console.log("Group from service", this.group);

    if (!group)
      group = await lastValueFrom(this.apiService.getGroup(this.group_id));

    this.group = group;
    this.workspace = group.workspace;

    await lastValueFrom(this.apiService.getGroupPolicy(group.id)).then((response: any) => {
      console.log("Group policy", response);
      this.permissions = response.permissions;
      this.can_get_members = this.permissions.includes('get_group_members');
      this.can_add_members = this.permissions.includes('add_group_members');
      this.can_get_policies = this.permissions.includes('get_group_policies');
      this.can_set_policies = this.permissions.includes('set_group_policies');
      this.authService.setPermissions(this.permissions);
    })
  }
}
