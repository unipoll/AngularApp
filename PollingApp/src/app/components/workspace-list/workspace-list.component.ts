import { Component, ViewChild } from '@angular/core';
import { expand, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { WorkspaceModel } from '../../models/workspace.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { WorkspaceListModel } from '../../models/workspace-list.model';

@Component({
  selector: 'app-workspace-list',
  templateUrl: './workspace-list.component.html',
  styleUrls: ['./workspace-list.component.scss']
})
export class WorkspaceListComponent {
  workspaceList!: WorkspaceModel[];
  displayedColumns: string[] = ['name']; // ['id', 'name', 'description'];
  displayedColumnsWithOptions = [...this.displayedColumns, 'options']; // 'owner'
  dataSource!: MatTableDataSource<WorkspaceModel>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.apiService.getUserWorkspace().pipe(
      tap((data) => (
        this.dataSource = new MatTableDataSource(data.workspaces),
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

  onRowClicked(row: any) {
    this.router.navigate(['/workspace/:id'], { queryParams: { id: row.id }, relativeTo: this.route });
  }
}
