import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { AccountModel } from 'src/app/models/account.model';
import { ApiService } from './api.service';


@Injectable({
    providedIn: 'root'
})
export class AccountService {

    private _account$ = new BehaviorSubject<AccountModel | null>(null);
    account$ = this._account$.asObservable();

    constructor(private apiService: ApiService) {
        const account = localStorage.getItem('userAccount');
        this._account$.next(account ? JSON.parse(account) : null);
    }

    getAccount() {
        return this._account$.value;
    }

    setAccount(account: AccountModel) {
        this._account$.next(account);
    }

    loadAccount() {
        this.apiService.getUserAccount().subscribe((account: AccountModel) => {
            this._account$.next(account);
            localStorage.setItem('userAccount', JSON.stringify(account));
        });
    }

    clearAccount() {
        this._account$.next(null);
        localStorage.removeItem('userAccount');
    }
}
