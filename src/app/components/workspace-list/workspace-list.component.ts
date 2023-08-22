import { Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { WorkspaceModel, WorkspaceListModel } from '../../models/workspace.model';
import { WorkspaceService } from '../../services/workspace.service';
import { DialogCreateComponent } from '../dialogs/dialog-create/dialog-create.component'
import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
import { DialogUpdateModel } from '../../models/dialog.model';
import { DialogUpdateComponent } from '../dialogs/dialog-update/dialog-update.component';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent implements OnInit {
  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<WorkspaceModel>;
  workspaceList!: Observable<WorkspaceModel[]>;
  permissions!: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private route: ActivatedRoute, 
    private workspaceService: WorkspaceService, 
    private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (window.innerWidth > 600) {
      this.displayedColumns = ['name', 'description'];
    } else {
      this.displayedColumns = ['name'];
    }
    this.displayedColumnsWithOptions = [...this.displayedColumns, 'options']; // 'owner'

    this.updateWorkspaceList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  updateWorkspaceList() {
    this.apiService.getUserWorkspaces().pipe(
      tap((data) => (
        this.dataSource = new MatTableDataSource(data.workspaces),
        this.workspaceList = this.dataSource.connect(),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();
  }

  getWorkspace(workspace: WorkspaceModel) {
    this.workspaceService.setWorkspace(workspace);
    this.router.navigate(['/workspace/'], {
      queryParams: { id: workspace.id },
      relativeTo: this.route,
      state: {
        workspace_id: workspace.id,
        workspace_name: workspace.name,
        workspace_description: workspace.description,
      }
    });
  }

  createWorkspace() {
    const dialogRef = this._dialog.open(DialogCreateComponent, {
      data: { 
        resource_type: 'workspace',
      },
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateWorkspaceList();
        }
      },
    });
  }

  editWorkspace(workspace: WorkspaceModel) {
    const data: DialogUpdateModel = {
      workspace_id: workspace.id,
      id: workspace.id,
      name: workspace.name,
      description: workspace.description,
      resource_type: 'workspace',
    };
    const dialogRef = this._dialog.open(DialogUpdateComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateWorkspaceList();
        }
      },
    });
  }

  deleteWorkspace(workspace: WorkspaceModel): void {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      data: {
        resourceType: 'workspace',
        resourceID: workspace.id,
        resourceName: workspace.name,
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateWorkspaceList();
        }
      },
    });
  }

}