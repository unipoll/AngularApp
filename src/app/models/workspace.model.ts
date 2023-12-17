import { GroupModel } from "./group.model";
import { MemberModel } from "./member.model";
import { PolicyModel } from "./policy.model";
import { PollModel } from "./poll.model";

export interface WorkspaceModel {
    id: string;
    name: string;
    description: string;
    members: MemberModel[];
    groups: GroupModel[];
    policies: PolicyModel[];
    polls: PollModel[];
}

export interface WorkspaceListModel {
    workspaces: WorkspaceModel[];
}

export interface createWorkspaceModel {
    name: string;
    description: string;
}