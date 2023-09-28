import { MemberModel } from './member.model';
import { GroupModel } from './group.model';

export interface PolicyModel {
    id: string;
    name: string;
    policy_holder_type: string;
    policy_holder: MemberModel | GroupModel;
    permissions: string[];
}

export interface PolicyListModel {
    policies: PolicyModel[];
}

export interface SetPolicyRequest{
    account_id: string;
    group_id: string;
    policy_id: string;
    permissions: string[];
}

export interface Permissions {
    permissions: string[];
}