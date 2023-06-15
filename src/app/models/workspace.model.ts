import { UserShortModel } from './user-short.model';

export interface WorkspaceModel {
  id: string;
  name: string;
  description: string;
  owner: UserShortModel;
}
