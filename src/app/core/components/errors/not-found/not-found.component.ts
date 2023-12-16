import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

    constructor(activatedRoute: ActivatedRoute) {
        let error = history.state.error;
        if (error.detail) {
            this.detail = error.detail;
        }
    }
}
