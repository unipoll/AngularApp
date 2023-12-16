import { Component, Input } from '@angular/core';
import { ThemeService } from 'src/app/core/services/theme.service';


@Component({
    selector: 'auth-header',
    templateUrl: './auth-header.component.html',
    styleUrl: './auth-header.component.scss'
})
export class AuthHeaderComponent {
    @Input() public subtitle!: string;

    constructor(public themeService: ThemeService) {
    }
}