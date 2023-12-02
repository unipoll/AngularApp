import { Component, Input } from '@angular/core';


@Component({
    selector: 'auth-header',
    templateUrl: './auth-header.component.html',
    styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent {
    @Input() public subtitle!: string;
}