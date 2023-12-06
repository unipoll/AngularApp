import { Component, Input, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { MaterialModule } from 'src/app/modules/material/material.module';


@Component({
    selector: 'app-page-loading-spinner',
    standalone: true,
    imports: [MaterialModule],
    templateUrl: './page-loading-spinner.component.html',
    styleUrl: './page-loading-spinner.component.scss'
})
export class PageLoadingSpinnerComponent implements OnInit {
    
    // Inputs 
    @Input() private delay = 3000;
    @Input() public loading_message = 'Loading...';
    @Input() public error_message = 'Could not load content. Please try again later.';

    // Timer for loading content
    private loading = true;
    private timer = timer(this.delay);

    // Subscribe to timer
    ngOnInit(): void {
        this.timer.subscribe(val => {
            if (val == 0) {
                this.loading = false;
            }
        });
    }

    // Getter for loading
    get isLoading(): boolean {
        return this.loading;
    }
}
