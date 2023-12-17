import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/modules/material/material.module';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent {

    detail = "Page not found";

    constructor(router: Router) {
        let error = history.state.error;
        if (error && error.detail) {
            this.detail = error.detail;
        } else {
            this.detail = `Page ${router.url} not found`;
        }
    }
}
