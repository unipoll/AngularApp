import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountModel } from 'src/app/models/account.model';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    // private _account$ = new BehaviorSubject<AccountModel | null>(null);
    // account$ = this._account$.asObservable();

    private account!: AccountModel;

    constructor(private apiService: ApiService) {
        const stored_account = localStorage.getItem('userAccount');
        // this._account$.next(account ? JSON.parse(account) : null);
        this.account = stored_account ? JSON.parse(stored_account) : this.loadAccount();
    }

    getAccount() {
        // return this._account$.value;
        return this.account;
    }

    setAccount(account: AccountModel) {
        // this._account$.next(account);
        this.account = account;
    }

    loadAccount() {
        this.apiService.getUserAccount().subscribe((account: AccountModel) => {
            // this._account$.next(account);
            this.account = account;
            localStorage.setItem('userAccount', JSON.stringify(account));
        });
    }

    clearAccount() {
        // this._account$.next(null);
        localStorage.removeItem('userAccount');
    }
}
