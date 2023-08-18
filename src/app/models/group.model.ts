import { MemberListModel } from "./member.model";
import { WorkspaceModel } from "./workspace.model";

export interface GroupModel {
    id: string;
    name: string;
    description: string;
    workspace: WorkspaceModel;
    members: MemberListModel
}

export interface GroupListModel {
    groups: GroupModel[];
}