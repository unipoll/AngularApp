// Modules
import { APP_INITIALIZER, NgModule, SecurityContext, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { AppRoutingModule } from './app-routing.module';
import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from './core/core.module';
import { MaterialModule } from './modules/material/material.module';
// import { AuthModule } from './modules/login/login.module';

// Guards
// import { AuthGuard } from './core/guards/auth.guard';

// Components
import { AppComponent } from './app.component';
import { SettingsService } from './core/services/settings.service';
import { of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: () => {
                const settingsService = inject(SettingsService);
                const httpClient = inject(HttpClient);
                return () => new Promise<boolean>((resolve, reject) => {
                    if (environment.production) {
                        // Load settings for production
                        httpClient.get('./config.json').pipe(tap({
                            next: (settings: any) => {
                                settingsService.apiUrl = settings.API_URL;
                                resolve(true);
                            },
                            error: (err) => {
                                settingsService.apiUrl = "http://localhost:8000/api";
                                resolve(true);
                                return of(null);
                            }
                        })).subscribe();
                    }
                    else {
                        // Load settings for development
                        // const settings = require('../config.json');
                        // settingsService.apiUrl = settings.api_url;
                        // @ts-ignore
                        settingsService.apiUrl = environment.apiUrl;
                        resolve(true);
                    }
                });
            },
            multi: true,
        },
        HttpClient
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LayoutModule,
        MaterialModule,
        MarkdownModule.forRoot({
            loader: HttpClient
        }),
        CoreModule,
    ]
})
export class AppModule { }
