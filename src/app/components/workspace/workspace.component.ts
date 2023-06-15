import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/services/api.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { UserShortModel } from 'src/app/models/user-short.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {

  public workspace!: WorkspaceModel | null;

  memberListData!: UserShortModel[];

  public workspace_id!: string;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
    private workspaceService: WorkspaceService) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.workspace_id = params['id'];
    });

    // TODO: extract id from service instead of route
    this.workspace = this.workspaceService.getData();

    this.apiService.getWorkspace(this.workspace_id).pipe(tap((data: WorkspaceModel | null) => (
      this.workspace = data
    ))).subscribe();
  }
}
