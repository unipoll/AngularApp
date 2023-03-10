import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceModel } from '../models/workspace.model';

// Service to pass info to workspace page without http request

@Injectable()
export class WorkspaceService {

  // Stores workspace data as a WorkspaceModel
  private workspace: WorkspaceModel | null = null;
  constructor() {}

  // Mutator
  // Set workspace data using WorkspaceModel
  setData(workspace: WorkspaceModel){
    this.workspace = workspace;
  }

  // Accessor
  // Get workspace data, like name, id, description, etc.
  getData(){
    return this.workspace;
  }

  // Clear data from service
  clearData(){
    this.workspace = null;
  }
}
