import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, tap, Observable } from 'rxjs';

import { GroupModel, GroupListModel } from '../../models/group.model';
import { ApiService } from '../../services/api.service';
import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
import { WorkspaceService } from '../../services/workspace.service';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { DialogCreateComponent } from '../dialogs/dialog-create/dialog-create.component';
import { DialogUpdateComponent } from '../dialogs/dialog-update/dialog-update.component';
import { WorkspaceModel } from 'src/app/models/workspace.model';


@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  // encapsulation : ViewEncapsulation.None,
})
export class GroupListComponent {
  @Input() workspace!: WorkspaceModel;
  @Input() can_create_groups: boolean = false;

  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<GroupModel>;

  groupList!: Observable<GroupModel[]>;

  private loading = true;
  private timer = timer(3000);
  userFlow!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private route: ActivatedRoute, 
    private _dialog: MatDialog, 
    private workspaceService: WorkspaceService) { }

  updateGroupList() {
    this.apiService.getWorkspaceGroups(this.workspace.id).pipe(
      tap((data) => (
        this.dataSource = new MatTableDataSource(data.groups),
        this.groupList = this.dataSource.connect(),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();
  }

  ngOnInit(): void {
    this.timer.subscribe(val => {
      if (val == 0) {
        this.loading = false;
      }
    });
    this.updateGroupList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Getter for loading
  get isLoading(): boolean {
    return this.loading;
  }


  viewGroup(group: GroupModel) {
    this.workspaceService.setGroup(group);
    this.router.navigate(['/group/'], {
      queryParams: { id: group.id },
      relativeTo: this.route,
      state: {
        workspace_id: this.workspace.id,
        group_id: group.id,
        group_name: group.name,
        group_description: group.description
      }
    });
  }


  createGroup() {
    const dialogRef = this._dialog.open(DialogCreateComponent, {
      data: { 
        resource_type: 'group',
        workspace_id: this.workspace.id 
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateGroupList();
        }
      },
    });
  }

  editGroup(data: DialogUpdateModel) {
    data.resource_type = 'group';
    const dialogRef = this._dialog.open(DialogUpdateComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateGroupList();
        }
      },
    });
  }

  deleteGroup(data: any): void {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      data: data.name,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateGroupList();
        }
      },
    });
  }
}
