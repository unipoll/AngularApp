import { MemberModel } from "./member.model";
import { PolicyModel } from "./policy.model";
import { WorkspaceModel } from "./workspace.model";

export interface GroupModel {
    id: string;
    name: string;
    description: string;
    workspace: WorkspaceModel;
    members: MemberModel[];
    policies: PolicyModel[]; 
}

export interface GroupListModel {
    groups: GroupModel[];
}