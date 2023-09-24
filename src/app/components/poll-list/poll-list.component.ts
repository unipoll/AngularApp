import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { PollComponent } from '../poll/poll.component';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogUpdateModel } from 'src/app/models/dialog.model';
import { ApiService } from 'src/app/services/api.service';
import { DialogCreateComponent } from '../dialogs/dialog-create/dialog-create.component';
import { DialogDeleteComponent } from '../dialogs/dialog-delete/dialog-delete.component';
import { DialogUpdateComponent } from '../dialogs/dialog-update/dialog-update.component';

import { PollModel } from 'src/app/models/poll.model';

@Component({
  selector: 'app-poll-list',
  templateUrl: './poll-list.component.html',
  styleUrls: ['./poll-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PollListComponent {

  @Input() workspace!: WorkspaceModel;
  @Input() pollList!: PollModel[];

  // Table data
  displayedColumns!: string[];
  displayedColumnsWithOptions!: string[];
  dataSource!: MatTableDataSource<PollModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private apiService: ApiService,
    ) { }

  ngOnInit(): void {
    if (window.innerWidth > 600) {
      this.displayedColumns = ['name', 'description'];
    } else {
      this.displayedColumns = ['name'];
    }
    this.displayedColumnsWithOptions = [...this.displayedColumns, 'options'];

    this.updatePollList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  updatePollList() {
    this.apiService.getAllPolls(this.workspace.id).pipe(
      tap((data) => (
        this.dataSource = new MatTableDataSource(data.polls),
        // this.pollList = this.dataSource.connect(),
        this.dataSource.paginator = this.paginator,
        this.dataSource.sort = this.sort
      ))
    ).subscribe();
  }

  getPoll(poll: PollModel) {
    console.log("navigate to poll: ", poll.id);
    this.router.navigate(['/poll'], {
      relativeTo: this.route,
      state: {
        poll_id: poll.id
      }
    });
  }

  createPoll() {
    // const dialogRef = this.dialog.open(DialogCreateComponent, {
    //   data: { 
    //     resource_type: 'poll',
    //   },
    // });

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.updateWorkspaceList();
    //     }
    //   },
    // });

    // this.router.navigate(['/workspace', 'new-poll']);
    this.router.navigate(['/workspace', 'new-poll'], {
      relativeTo: this.route,
      state: {
        workspace_id: this.workspace.id
      }
    });
  }

  editPoll(poll: PollModel) {
    // const data: DialogUpdateModel = {
    //   workspace_id: workspace.id,
    //   id: workspace.id,
    //   name: workspace.name,
    //   description: workspace.description,
    //   resource_type: 'workspace',
    // };
    // const dialogRef = this.dialog.open(DialogUpdateComponent, { data });
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.updateWorkspaceList();
    //     }
    //   },
    // });
  }

  deletePoll(poll: PollModel): void {
    // const dialogRef = this.dialog.open(DialogDeleteComponent, {
    //   data: {
    //     resourceType: 'poll',
    //     resourceID: poll.id,
    //     resourceName: poll.name,
        
    //   }
    // });
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.updatePollList();
    //     }
    //   },
    // });
  }

}

