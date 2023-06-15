import { Component, EventEmitter, Inject, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ApiService } from '../../services/api.service';
import { WorkspaceModel } from '../../models/workspace-list.model';
import { WorkspaceListModel } from '../../models/workspace-list.model';
import { WorkspaceService } from '../../services/workspace.service';
import { CreateWorkspaceComponent } from '../create-workspace/create-workspace.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

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

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router,
    private route: ActivatedRoute, private workspaceService: WorkspaceService, private _dialog: MatDialog) {
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

  ngOnInit(): void {
    if (window.innerWidth > 600) {
      this.displayedColumns = ['name', 'description', 'owner'];
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

  viewWorkspace(row: any) {
    this.workspaceService.setData(row);
    this.router.navigate(['/workspace/'], {
      queryParams: { id: row.id },
      relativeTo: this.route,
      state: {
        workspace_id: row.id,
        workspace_name: row.name,
        workspace_description: row.description,
        workspace_owner: row.owner
      }
    });
  }

  openCreateForm() {
    const dialogRef = this._dialog.open(CreateWorkspaceComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateWorkspaceList();
        }
      },
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(CreateWorkspaceComponent, { data, });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.updateWorkspaceList();
        }
      },
    });
  }

  deleteWorkspace(data: any): void {
    const dialogRef = this._dialog.open(DialogDeleteComponent, {
      data: {
        resource_type: 'workspace',
        workspace_id: data.id,
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