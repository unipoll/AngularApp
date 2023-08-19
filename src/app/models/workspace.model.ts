import { GroupListModel, GroupModel } from "./group.model";
import { MemberListModel, MemberModel } from "./member.model";
import { PolicyListModel, PolicyModel } from "./policy.model";


export interface WorkspaceModel {
  id: string;
  name: string;
  description: string;
  members: MemberModel[];
  groups: GroupModel[];
  policies: PolicyModel[];
}

export interface WorkspaceListModel {
  workspaces: WorkspaceModel[];
}

export interface createWorkspaceModel {
  name: string;
  description: string;
}