import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './components/group/group.component';


const routes: Routes = [
    {
        path: 'policies',
        component: GroupComponent,
        data: {
            tab: 'policies',
        },
    },
    {
        path: 'members',
        component: GroupComponent,
        data: {
            tab: 'members'
        }
    },
    {
        path: '',
        component: GroupComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupRoutingModule { }
