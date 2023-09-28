import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// Models
import { WorkspaceModel } from '../models/workspace.model';
import { GroupModel } from '../models/group.model';


// Service to pass info to workspace page without http request
@Injectable({ providedIn: 'root' })
export class WorkspaceService {

  // Stores workspace data as a WorkspaceModel
  private workspace: WorkspaceModel | null = null;
  private group: GroupModel | null = null;
  constructor() {}

  // Mutator
  // Set workspace data using WorkspaceModel
  setWorkspace(workspace: WorkspaceModel){
    this.workspace = workspace;
  }

  // Set group data
  setGroup(group: GroupModel){
    this.group = group;
  }

  // Accessor
  // Get workspace data, like name, id, description, etc.
  getWorkspace(){
    return this.workspace;
  }

  getGroup(){
    return this.group;
  }

  // Clear data from service
  clearWorkspace(){
    this.workspace = null;
  }

  clearGroup(){
    this.group = null;
  }

  clear(){
    this.clearWorkspace();
    this.clearGroup();
  } 
}
