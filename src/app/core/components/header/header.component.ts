import { Component, ChangeDetectorRef } from '@angular/core';
import { SidenavService } from '../../services/sidenav.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { ThemeService } from '../../services/theme.service';

@Component({
    selector: 'app-auth-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    toggleActive = false;

    activeTheme: string;

    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;

    constructor(private sidenav: SidenavService,
                private themeService: ThemeService,
                changeDetectorRef: ChangeDetectorRef,
                media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
        this.activeTheme = this.themeService.activeTheme;
    }

    toggleSidenav() {
        this.toggleActive = !this.toggleActive;
        this.sidenav.toggle();
    }

    toggleTheme() {
        this.themeService.toggleTheme();
        this.activeTheme = this.themeService.activeTheme;
    }
} 