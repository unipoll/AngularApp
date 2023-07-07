import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap, timer } from 'rxjs';
import { MemberModel, MemberListModel } from '../../models/member.model';
import { ApiService } from '../../services/api.service';
import { WorkspaceModel } from '../../models/workspace.model';
import { GroupModel } from '../../models/group.model';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceService } from 'src/app/services/workspace.service';
import { DialogAddMemberComponent } from '../dialogs/dialog-add-member/dialog-add-member.component';
import { AccountListModel, AccountModel } from '../../models/account.model'
import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  // @Input() memberList!: UserShortModel[];
  @Input() workspace!: WorkspaceModel;
  @Input() group!: GroupModel;
  @Input() can_add_members: boolean = false;

  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<MemberModel>;

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
    this.updateMemberList();
  }

  updateMemberList() {
    if (this.group) {
      this.apiService.getGroupMembers(this.group.id).pipe(
        tap((data) => (
          this.makeTable(data.members)
        ))
      ).subscribe();
    } else if (this.workspace) {
      this.apiService.getWorkspaceMembers(this.workspace.id).pipe(
        tap((data) => (
          this.makeTable(data.members)
        ))
      ).subscribe();
    }
  }

  makeFullName(members: Array<MemberModel>) {
    members.forEach(member => {
      member.full_name = member.first_name + ' ' + member.last_name;
    });
  }

  makeTable(members: Array<MemberModel>) {
    this.makeFullName(members),
    this.dataSource = new MatTableDataSource(members),
    this.dataSource.paginator = this.paginator,
    this.dataSource.sort = this.sort
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

  // Add member
  addMember() {
    let dialogRef;
    let resource: { type: string; id: string; };
    if (this.workspace) {
      resource = {
        type: 'workspace',
        id: this.workspace.id,
      };
    }
    this.apiService.getAllAccounts().pipe(
        tap((data) => (
          dialogRef = this._dialog.open(DialogAddMemberComponent, {
            data: {
              accountList: data.accounts,
              resource: resource,
            },
          }),
          dialogRef.afterClosed().subscribe({
            next: (val) => {
              if (val) {
                this.updateMemberList();
              }
            },
          })
        ))
      ).subscribe();
  }

  removeMember(member: MemberModel) {
    let resource: { type: string; id: string; name: string; } | undefined;
    if (this.workspace) {
      resource = {
        type: 'workspace',
        id: this.workspace.id,
        name: `workspace ${this.workspace.name}`,
      };
    }
    if (resource) {
      const dialogRef = this._dialog.open(DialogDeleteComponent, {
        data: {
          resourceType: 'member',
          resourceID: resource.id,
          resourceName: resource.name,
          memberName: member.first_name + ' ' + member.last_name,
          memberID: member.id,
        }
      });

      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.updateMemberList();
          }
        },
      });
    }
  }
}
