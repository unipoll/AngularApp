import { BehaviorSubject, Observable, lastValueFrom, tap } from 'rxjs';
import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkspaceModel } from 'src/app/models/workspace.model';
import { MemberModel } from 'src/app/models/member.model';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthorizationService } from 'src/app/core/services/authorization.service';
import { WorkspaceService } from '../../services/workspace.service';
import { AccountService } from 'src/app/core/services/account.service';

@Component({
    selector: 'app-workspace',
    templateUrl: './workspace.component.html',
    styleUrls: ['./workspace.component.scss']
})
export class WorkspaceComponent {
    // Workspace data
    public workspace!: WorkspaceModel;
    public workspace_id!: string;
    // public memberListData!: MemberModel[];
    // public permissions!: string[];

    // TODO: Make permissions an observable
    /* Update page on permission change
      i.e. On Load
      private _can_get_groups$ = new BehaviorSubject<boolean>(false);
      public can_get_groups$ = this._can_get_groups$.asObservable();
      ...
      On change:
      this._can_get_groups$.next(this.permissions.includes('get_groups'));
    */

    @Input() id!: string;

    // Constructor
    constructor(
        private route: ActivatedRoute,
        private apiService: ApiService,
        private authService: AuthorizationService,
        private accountService: AccountService) {
        
        // this.workspace_id = this.route.snapshot.paramMap.get('id') || '';
    }

    // Get workspace data on init
    ngOnInit(): void {
        this.getWorkspace();
    }

    // Get workspace data
    async getWorkspace(): Promise<void> {
        this.workspace = await lastValueFrom(this.apiService.getWorkspace(this.id, true, true, true, true));

        await lastValueFrom(this.apiService.getWorkspacePolicies(this.workspace.id, this.accountService.getAccount()?.id)).then((response: any) => {
            this.authService.setPermissions(response.policies[0].permissions);
        });
    }

    isAllowed(permission: string): boolean {
        return this.authService.isAllowed(permission);
    }
}
