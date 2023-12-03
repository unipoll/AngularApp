import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';



const routes: Routes = [{
  path: '',
  component: WorkspaceListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspaceListRoutingModule { }
