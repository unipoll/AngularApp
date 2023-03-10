import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceListModel } from 'src/app/models/workspace-list.model';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ApiService } from 'src/app/services/api.service';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { MemberListModel } from 'src/app/models/member-list.model';
import { tap, timer } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { UserShortModel } from 'src/app/models/user-short.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {

  public workspace!: WorkspaceModel | null;
  public groups!: [];
  public members!: MemberListModel;

  private workspace_id!: string;
  private loading = true;
  private timer = timer(3000);
  userFlow!: boolean;

  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<UserShortModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
    private workspaceService: WorkspaceService ) {}


  ngOnInit(): void {
    if (window.innerWidth > 600) {
      this.displayedColumns = ['full name', 'email'];
    } else {
      this.displayedColumns = ['full name'];
    }
    this.displayedColumnsWithOptions = [...this.displayedColumns, 'options'];

    this.timer.subscribe(val => {
      if (val == 0) {
        this.loading = false;
      }
    });

    this.route.queryParams.subscribe(params => {
      this.workspace_id = params['id'];
    });

    this.workspace = this.workspaceService.getData();
    if (this.workspace === null) {
      this.apiService.getWorkspace(this.workspace_id).pipe(
          tap((data) => (
            this.workspace = data
          ))
        ).subscribe();
    }

    // Load Members
    this.apiService.getWorkspaceMembers(this.workspace_id).pipe(
      tap((data) => (
        this.makeFullName(data.members),
        this.dataSource = new MatTableDataSource(data.members),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();

    // Load Groups
    // this.apiService.getWorkspaceGroups(this.workspace_id).pipe(
    //   tap((data) => (
    //     this.makeFullName(data.groups),
    //     this.dataSource = new MatTableDataSource(data.members),
    //     this.dataSource.paginator = this.paginator,
    //     this.dataSource.sort = this.sort
    //   ))
    // ).subscribe();
  }

  makeFullName(members: Array<UserShortModel>) {
    members.forEach(member => {
      member.full_name = member.first_name + ' ' + member.last_name;
    });
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
}
