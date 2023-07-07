export interface AccountModel{
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
}

export interface AccountListModel {
  accounts: AccountModel[];
}