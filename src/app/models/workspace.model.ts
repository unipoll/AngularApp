import { MemberListModel } from "./member.model";


export interface WorkspaceModel {
  id: string;
  name: string;
  description: string;
  members: MemberListModel;
}

export interface WorkspaceListModel {
  workspaces: WorkspaceModel[];
}

export interface createWorkspaceModel {
  name: string;
  description: string;
}