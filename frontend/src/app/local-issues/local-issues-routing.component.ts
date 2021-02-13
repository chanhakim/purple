import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocalIssuesComponent } from '../local-issues/local-issues.component';

const routes: Routes = [
    { path: 'local-issues', component: LocalIssuesComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class LocalIssuesRoutingModule {

}