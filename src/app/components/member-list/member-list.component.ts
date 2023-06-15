import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap, timer } from 'rxjs';
import { MemberListModel } from 'src/app/models/member-list.model';
import { UserShortModel } from 'src/app/models/user-short.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  // @Input() memberList!: UserShortModel[];
  @Input() workspace_id!: string;

  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<UserShortModel>;

  private loading = true;
  private timer = timer(3000);
  userFlow!: boolean;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService) { }

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

    this.apiService.getWorkspaceMembers(this.workspace_id).pipe(
      tap((data) => (
        this.makeFullName(data.members),
        this.dataSource = new MatTableDataSource(data.members),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();
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
