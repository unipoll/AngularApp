export interface WorkspaceModel {
  id: string;
  name: string;
  description: string;
  owner: boolean;
}

export interface WorkspaceListModel {
  workspaces: WorkspaceModel[];
}
