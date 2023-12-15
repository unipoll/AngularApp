import { Injectable, OnInit, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    private _darkTheme = false;
    private renderer: Renderer2;

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.loadTheme();
        this.setTheme(this._darkTheme);
    }

    get activeTheme(): string {
        return this._darkTheme ? 'dark' : 'light';
    }

    loadTheme() {
                if (localStorage.getItem('activeTheme') == 'dark' || localStorage.getItem('activeTheme') == 'light') {
                        this._darkTheme = localStorage.getItem('activeTheme') == 'dark';
        }
    }

    toggleTheme() {
        this._darkTheme = !this._darkTheme;
        localStorage.setItem('activeTheme', this._darkTheme ? 'dark' : 'light');
                this.setTheme(this._darkTheme);
      }

    setTheme(darkTheme: boolean) {
        if (darkTheme) {
            this.renderer.removeClass(document.body, 'light-theme');
            this.renderer.addClass(document.body, 'dark-theme');
        } else {
            this.renderer.removeClass(document.body, 'dark-theme');
            this.renderer.addClass(document.body, 'light-theme');
        }
    }
}
