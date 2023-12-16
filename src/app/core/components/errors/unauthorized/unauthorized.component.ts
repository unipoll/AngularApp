import { Component } from '@angular/core';

@Component({
  selector: 'app-unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrl: './unauthorized.component.scss'
})
export class UnauthorizedComponent {

    detail = "You are not authorized to access this page.";

    constructor() {
        let error = history.state.error;
        if (error.detail) {
            this.detail = error.detail;
        }
    } 
}
