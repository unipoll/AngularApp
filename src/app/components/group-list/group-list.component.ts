import { Component, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { timer, tap, Observable } from 'rxjs';
import { GroupModel, GroupListModel } from 'src/app/models/group-list.model';
import { ApiService } from 'src/app/services/api.service';
import { CreateGroupComponent } from '../create-group/create-group.component';
import { DialogDeleteComponent } from '../dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent {
  @Input() workspace_id!: string;

  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<GroupModel>;

  groupList!: Observable<GroupModel[]>;

  private loading = true;
  private timer = timer(3000);
  userFlow!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router,
    private route: ActivatedRoute, private _dialog: MatDialog) { }

  updateGroupList() {
    this.apiService.getWorkspaceGroups(this.workspace_id).pipe(
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

    this.apiService.getWorkspaceGroups(this.workspace_id).pipe(
      tap((data) => (
        this.dataSource = new MatTableDataSource(data.groups),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();
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

  createGroup() {
    const dialogRef = this._dialog.open(CreateGroupComponent, {
      data: { 
        workspace_id: this.workspace_id 
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

  editGroup(data: any) {
    const dialogRef = this._dialog.open(CreateGroupComponent, { data, });
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
