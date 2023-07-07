import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { GroupModel } from '../../models/group.model';
import { MemberModel } from '../../models/member.model';
import { WorkspaceModel } from '../../models/workspace.model';
import { ApiService } from '../../services/api.service';
import { WorkspaceService } from '../../services/workspace.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent {
  public workspace!: WorkspaceModel | null;
  public group!: GroupModel | null;

  memberListData!: MemberModel[];

  public workspace_id!: string;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
    private workspaceService: WorkspaceService) { }


  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   this.group_id = params['id'];
    // });
    this.group = this.workspaceService.getGroup();
    this.workspace = this.workspaceService.getWorkspace();

    if (this.group == null) {
      this.router.navigate
    }
    else {
        this.apiService.getGroup(this.group.id).pipe(tap((data: GroupModel | null) => (
          this.group = data
        ))).subscribe();
    }
  }
}
