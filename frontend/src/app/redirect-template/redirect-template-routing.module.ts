import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RedirectTemplateComponent } from '../redirect-template/redirect-template.component';

const routes: Routes = [
    { path: 'redirect/:id', component: RedirectTemplateComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class TemplateRoutingModule {

}