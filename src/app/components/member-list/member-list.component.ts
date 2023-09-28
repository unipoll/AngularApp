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
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  @Input() workspace!: WorkspaceModel;
  @Input() group!: GroupModel;
  @Input() memberList!: MemberModel[];

  // Table data
  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<MemberModel>;

  // Table attributes
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Permissions
  public can_add_members: boolean = false;

  // Timer for loading content
  private loading = true;
  private timer = timer(3000);
  userFlow!: boolean;

  constructor(
    private apiService: ApiService, 
    private _dialog: MatDialog, 
    private authService: AuthService) { }

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

    this.memberList ? this.makeTable(this.memberList) : this.updateMemberList();

    if (this.group)
      this.can_add_members = this.authService.isAllowed('add_group_members');
    else if (this.workspace)
      this.can_add_members = this.authService.isAllowed('add_workspace_members');
  }

  updateMemberList() {
    let requst;
    if (this.group)
      requst = this.apiService.getGroupMembers(this.group.id);
    else if (this.workspace)
      requst = this.apiService.getWorkspaceMembers(this.workspace.id);
    else
      return;

    requst.pipe(
      tap((data) => (
        this.makeTable(data.members)
      ))
    ).subscribe();
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
      this.apiService.getAllAccounts().pipe(
        tap((data) => (
          dialogRef = this._dialog.open(DialogAddMemberComponent, {
            data: {
              accountList: data.accounts,
              memberList: this.memberList,
              resource: resource,
            }
          }),
          dialogRef.afterClosed().subscribe({
            next: (val: any) => {
              if (val) {
                this.updateMemberList();
              }
            },
          })
        ))
      ).subscribe();
    }
    else if (this.group) {
      resource = {
        type: 'group',
        id: this.group.id,
      };

      this.apiService.getWorkspaceMembers(this.group.workspace.id).pipe(
        tap((data) => (
          dialogRef = this._dialog.open(DialogAddMemberComponent, {
            data: {
              accountList: data.members,
              memberList: this.memberList,
              resource: resource,
            }
          }),
          dialogRef.afterClosed().subscribe({
            next: (val: any) => {
              if (val) {
                this.updateMemberList();
              }
            },
          })
        ))
      ).subscribe();
    }
    
  }

  removeMember(member: MemberModel) {
    let resource: { type: string; id: string; name: string; } | undefined;
    if (this.workspace) {
      resource = {
        type: 'workspace',
        id: this.workspace.id,
        name: this.workspace.name,
      };
    }
    if (this.group) {
      resource = {
        type: 'group',
        id: this.group.id,
        name: this.group.name,
      };
    }
    if (resource) {
      const dialogRef = this._dialog.open(DialogDeleteComponent, {
        data: {
          resourceType: 'member',
          resourceID: member.id,
          resourceName: member.first_name + ' ' + member.last_name,
          parentResourceType: resource.type,
          parentResourceID: resource.id,
          parentResourceName: resource.name,
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
