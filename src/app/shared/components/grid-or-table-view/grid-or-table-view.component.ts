import { AfterContentInit, AfterViewInit, Component, ContentChild, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/modules/material/material.module';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


interface MenuItem {
    label: string;
    action: Function;
}


@Component({
    selector: 'app-grid-or-table-view',
    standalone: true,
    imports: [CommonModule, MaterialModule, AsyncPipe],
    templateUrl: './grid-or-table-view.component.html',
    styleUrl: './grid-or-table-view.component.scss'
})
export class GridOrTableViewComponent implements OnInit, AfterViewInit {

    @Input() viewMode: 'grid' | 'table' = 'grid';
    @Input() filterPlaceholder: string = 'Filter';
    @Input() list: any[] = [];
    @Input() cardClickAction: Function = () => { };
    @Input() rowClickAction: Function = () => { };
    @Input() optionsMenu: MenuItem[] = [];
    @Input() displayedColumns!: string[];

    public displayedColumnsWithOptions: string[] = [];
    public dataSource!: MatTableDataSource<any>;
    // public cardList!: Observable<any[]>
    public cardList!: BehaviorSubject<any[]>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
	@ViewChild(MatSort) sort!: MatSort;

    @ContentChild('cardTitle') cardTitleTemplate!: TemplateRef<any>;
    @ContentChild('cardContent') cardContentTemplate!: TemplateRef<any>;
    @ContentChild('tableColumns') tableColumnsTemplate!: TemplateRef<any>;

    constructor() {}

    applyFilter(event: Event) {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();

		if (this.dataSource.paginator) {
			this.dataSource.paginator.firstPage();
		}
	}

    ngOnInit(): void {
        this.dataSource = new MatTableDataSource(this.list);
        this.cardList = this.dataSource.connect();
        this.displayedColumnsWithOptions = this.displayedColumns.concat('options');
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    onPaginateChange(event: any) {
        this.cardList = this.dataSource.connect();
    }

    updateList(list: any[]) {
        this.list = list;
        this.dataSource.data = list;
        this.dataSource._updateChangeSubscription();
    }

    addItem(item: any) {
        console.log("Add Item Data", item);
        this.dataSource.data.push(item);
        this.dataSource._updateChangeSubscription();
    }

    deleteItem(item: any) {
        console.log("Delete Item Data", item);
        this.dataSource.data = this.dataSource.data.filter((i: any) => i !== item);

    }

}
