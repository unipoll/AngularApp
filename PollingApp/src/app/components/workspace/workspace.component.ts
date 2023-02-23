import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorkspaceListModel } from 'src/app/models/workspace-list.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {

  private workspace_id!: string;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.workspace_id = params['id'];
      console.log(this.workspace_id);
    });
    this.apiService.getWorkspace(this.workspace_id).subscribe((data: WorkspaceModel) => {
      console.log(data);
    });
  }

}
