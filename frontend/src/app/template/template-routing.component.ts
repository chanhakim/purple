import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateComponent } from '../template/template.component';

const routes: Routes = [
    { path: 'template/:id', component: TemplateComponent }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ], 
    exports: [ RouterModule ]
})
export class TemplateRoutingModule {

}