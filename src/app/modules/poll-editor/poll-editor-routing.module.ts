import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollEditorComponent } from './components/poll-editor/poll-editor.component'; 



const routes: Routes = [{
  path: '',
  component: PollEditorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollEditorRoutingModule { }
